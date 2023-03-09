import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, NavLink } from 'reactstrap';
import { useLocation } from 'react-router-dom';

// styles
import '../assets/scss/cartpage.scss'

// components
import Headers from '../components/Header';
import CartItem from '../components/CartItem';
import ShopService from '../service/ShopService';

function OrderPage(props) {
    const location = useLocation();
    const products = location.state.orderList;

    useEffect(() => {
       console.log(products);
    }, [])
    
    return (
        <>
        <Headers/>
            <div className='order-user'>
                <h5 className='order-title'>
                    배송 정보
                </h5>
                <Table className="order-tb">
                    <tbody>
                        <tr>
                           <th> 이름 </th>
                           <td> 이가인 </td>
                        </tr>
                        <tr>
                           <th> 연락처 </th>
                           <td> 010-0000-0000 </td>
                        </tr>
                        <tr>
                           <th> 주소 </th>
                           <td> <input type='text'/> </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className='order-product'>
                <h5 className='order-title'>
                    상품 정보
                </h5>
                <Table hover className="cart-tb">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "40%" }}> 상품 </th>
                            <th scope="col" style={{ width: "10%" }}> 가격 </th>
                            <th scope="col" style={{ width: "25%" }}> 수량 </th>
                            <th scope="col" style={{ width: "10%" }}> 합계 </th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map(product => {
                        <td className="list-item">
                            <NavLink 
                                //href={`/shop/detail/${review.id}`}
                            >
                                <div className="product">
                                    <Col> <img  src={product.image} alt="item-img" /> </Col>
                                    <Col className="product-info" style={{ textAlign: "left" }}>
                                        <div> {product.name} </div>
                                        {!product.op2 ? 
                                            <div> {product.op1} </div> :
                                            <div> {product.op1}, {product.op2} </div>}
                                    </Col>
                                </div>
                            </NavLink>
                        </td> 
                    })}
                    </tbody>
                </Table>
            </div>
            <div className='totalPrice'> </div>
                <div className="ct-buy">
                        <button 
                        type="button" 
                        >
                            주문하기
                        </button>
                </div>

            
        </>
    );
}

export default OrderPage;