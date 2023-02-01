import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// components
import Slide from "../components/Slide";
import SortButton from "../components/SortButton";
import ItemListTable from "../components/ItemListTable";

// styels
import '../assets/scss/listpage.scss';

// service
import ShopService from '../service/ShopService';
import AuthContext from '../service/AuthContext';

import { useCate } from "../components/Header";

const CategoryPage = (props) => {
    const { category } = useCate();
    const { categoryId } = useParams(); 
    const [sortSelected, setSortSelected] = useState('신상품순');
    const [products, setProducts] = useState([]);
    const [testSlideData, setTestSlideData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    const isLogin = authCtx.isLoggedIn;
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        ShopService.getProducts(categoryId).then(res => {
            setProducts(res.data);
            setTestSlideData(res.data.slice(0, 10));
        });  
    }, [])
    
    // id 자리 수정 전 !
    useEffect(() => {
        if(isLogin) {
            ShopService.getLikeId(categoryId, "gain").then(res => {
                setLikes(res.data); 
                console.log(res.data);
            }) 
        }
    }, [isLogin]);

    useEffect(() => {
        category.length > 0 ? setIsLoading(true) : setIsLoading(false);
    }, [category]);

    useEffect(() => {
        console.log("sort 변경 => ", sortSelected);
    }, [sortSelected]);

    return (
        isLoading &&
        <div className="ctpg-main">
            <div className="ctpg-title">
                {categoryId === '0' ?
                "전체"
                : category.find(c => c.id === Number(categoryId))['title']}
            </div>
            <Slide products={testSlideData} likes={likes}/>
            <div className="prod-cnt">{products.length}개의 상품</div>
            <SortButton setSortSelected={setSortSelected}/>
            <ItemListTable products={products} likes={likes}/>
        </div>
    );
};

export default CategoryPage;