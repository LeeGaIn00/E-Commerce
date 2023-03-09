import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

// components
import ItemListTable from "../components/ItemListTable";

// service
import AuthContext from '../service/AuthContext';
import MyPageService from "../service/MyPageService";
import ShopService from "../service/ShopService";


const MyPageLike = () => {
    const authCtx = useContext(AuthContext);
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [likes, setLikes] = useState([]);
    
    useEffect(() => {
        authCtx.getUser();
        MyPageService.getWishlist(id).then(res => {
            setProducts(res.data);
        });
        ShopService.getLikeId(0, id).then(res => {
            setLikes(res.data); 
        }) 
    }, []);

    /* 취소 시 목록 업데이트(취소한 아이템 제외) */
    const onUpdate = (id) => {
        var newProducts = products;
        newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
        console.log("cancel");
    }

    return (
        <>
            <div className="item-box">
                <ItemListTable products={products} likes={likes} onUpdate={onUpdate}/>
            </div>
        </>
    );
}

export default MyPageLike;