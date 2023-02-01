import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

// components
import ItemListTable from "../components/ItemListTable";

// service
import AuthContext from '../service/AuthContext';
import MyPageService from "../service/MyPageService";


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
    }, []);

    return (
        <>
            <div className="item-box">
                <ItemListTable products={products} likes={likes}/>
            </div>
        </>
    );
}

export default MyPageLike;