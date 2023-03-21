import React, { useEffect, useState, useContext } from 'react';
import { Table, Row, Col, Button, NavLink } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';

// styles
import '../assets/scss/cartpage.scss'

// components
import Headers from '../components/Header';
import CartItem from '../components/CartItem';

// service
import AuthContext from '../service/AuthContext';
import MemberService from "../service/MemberService";
import ShopService from '../service/ShopService';

function OrderPage(props) {
    const authCtx = useContext(AuthContext);
    const location = useLocation();
    const navigation = useNavigate();
    const [products, setProducts] = useState(location.state.orderList);
    const [address, setAddress] = useState('');
    const total = products.reduce((prev, current) => prev + current.price, 0);
    
    useEffect(() => {
        authCtx.getUser();
    }, [])

    const saveAddress = (e) => {
        setAddress(e.target.value)
    }

    const goToPayment = () => {
        if(address.length == 0) alert("주소를 입력하세요.");
        else navigation("/payment", {state : { productName: products[0].name, total: total, address: address }})
    }
    
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
                           <td> {authCtx.user.name} </td>
                        </tr>
                        <tr>
                           <th> 연락처 </th>
                           <td> {authCtx.user.phone} </td>
                        </tr>
                        <tr>
                           <th> 주소 </th>
                           <td> <input className='address' 
                                        type='text'
                                        placeholder='주소'
                                        value={address}
                                        onChange={saveAddress}/> </td>
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
                        {products.map(product =>
                            <tr>
                                <td className="list-item"  style={{ textAlign:'left'}}>
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
                                <td className='list-item' style={{ textAlign:'center'}}> {product.price} </td>
                                <td className='list-item' style={{ textAlign:'center'}}> {product.quantity} </td>
                                <td className='list-item' style={{ textAlign:'center'}}> {product.price} </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className='totalPrice'> </div>
                <div className="ct-buy">
                    <div className='price'> {total} </div>
                    <button type="button" onClick={() => goToPayment()}>
                        결제하기
                    </button>
            </div>

            
        </>
    );
}

export default OrderPage;