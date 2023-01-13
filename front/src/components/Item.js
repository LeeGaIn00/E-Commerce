import React, { useState } from 'react';
import { NavLink } from 'reactstrap';

// components
import LikeButton from "../components/LikeButton";

// styles
import '../assets/scss/item.scss';

function Item(props) {
    const [like, setLike] = useState();

    const toggleLike = () => {
        setLike(!like);
    }

    return (
        <div className="item-wrap">
            <NavLink href={`/shop/detail/${props.product.id}`}>
                <div className="item-image">
                    <img src={require(`../assets/img/${props.product.image}`)} alt="item-img"/>
                    <LikeButton like={like} onClick={(e) => {
                        e.preventDefault();
                        toggleLike();
                    }} />
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
                        </>
                        : null
                    }
                    <span className="price">
                        {props.product.price}원
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Item;