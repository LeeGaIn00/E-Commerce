import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';

// components
import LikeButton from "../components/LikeButton";

// styles
import '../assets/scss/item.scss';

// service
import ShopService from '../service/ShopService';
import AuthContext from "../service/AuthContext";

function Item(props) {
    const authCtx = useContext(AuthContext)
    const [like, setLike] = useState(props.like);

    const toggleLike = () => {
        setLike(!like);
    }

    useEffect(() => {
        //authCtx.getUser();
        setLike(props.like);
    }, [props.like]);

    return (
        <div className="item-wrap">
            <NavLink href={`/shop/detail/${props.product.id}`}>
                <div className="item-image">
                    <img src={props.product.image} alt="item-img" />
                        { authCtx.isLoggedIn && 
                        <LikeButton like={like} onClick={(e) => {
                            {like ? ShopService.setUnlike(authCtx.user.id, props.product.id)
                                : ShopService.setLike(authCtx.user.id, props.product.id)};
                            e.preventDefault();
                            {props.isList ? props.onUpdate(props.product.id) : toggleLike()};
                        }} />
                        }
                </div>
            </NavLink>
            <div className="item-content">
                <div className="name">
                    {props.product.name}
                </div>
                <div className="price-info">
                    {(props.product.discount && props.product.discount !== props.product.price) ?
                        <>
                            <span className="rate">
                                {Math.floor(((props.product.price - props.product.discount) / props.product.price) * 100)}%
                            </span>
                            <span className="discount">
                                {props.product.discount}원
                            </span>
                            <span className="price">
                                {props.product.price}원
                            </span>
                        </>
                        :
                        <span className="price-only">
                            {props.product.price}원
                        </span>
                    }
                </div>
            </div>
        </div>
    );
}

export default Item;