import React, { useEffect, useState, useContext } from "react";

// components
import ItemListTable from "../components/ItemListTable";

// service
import AuthContext from '../service/AuthContext';
import MyPageService from "../service/MyPageService";


const MyPageLike = () => {
    const authCtx = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        authCtx.getUser();
        MyPageService.getWishlist("gain").then(res => {
            setProducts(res.data);
        });
    }, []);

    return (
        <>
            <div className="item-box">
                <ItemListTable products={products} />
            </div>
        </>
    );
}

export default MyPageLike;