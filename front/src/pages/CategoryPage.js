import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import Slide from "../components/Slide";
import SortButton from "../components/SortButton";
import ItemListTable from "../components/ItemListTable";

// styels
import '../assets/scss/listpage.scss';

// service
import ShopService from '../service/ShopService';

import { useCate } from "../components/Header";

const CategoryPage = (props) => {
    const { category } = useCate();
    const { categoryId } = useParams(); 
    const [sortSelected, setSortSelected] = useState('신상품순');
    const [products, setProducts] = useState([]);
    const [testSlideData, setTestSlideData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        ShopService.getProducts(categoryId).then(res => {
            setProducts(res.data);
            setTestSlideData(res.data.slice(0, 10));
        });
    }, [])

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
            <Slide products={testSlideData} />
            <div className="prod-cnt">{products.length}개의 상품</div>
            <SortButton setSortSelected={setSortSelected}/>
            <ItemListTable products={products} />
        </div>
    );
};

export default CategoryPage;