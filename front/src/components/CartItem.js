import React, { useState } from 'react';
import { Table, Row, Col, Button, NavLink, Input, InputGroup } from 'reactstrap';


// service
import ShopService from '../service/ShopService';

function CartItem(props) {
    const [cart, setCart] = useState(props.cart);
    const [quantity, setQuantity] = useState(props.cart.quantity);
    const [total, setTotal] = useState(props.cart.quantity * props.cart.price);

    /* 선택한 옵션의 수량 변경 시 수량 및 가격 반영 */
    const plusQuantity = (id) => {
        let data = {
            quantity : quantity + 1
        }
        ShopService.updateCart(props.cart.id, data).then(res => {
            if(res.status === 200) {
                window.location.reload();
            }
            // setQuantity(res.data.quantity);
            // setTotal(res.data.quantity * props.cart.price);
        })
    };
    const minusQuantity = (id) => {
        let data = {
            quantity : quantity - 1
        }
        ShopService.updateCart(props.cart.id, data).then(res => {
            if(res.status === 200) {
                window.location.reload();
            }
            // setQuantity(res.data.quantity);
            // setTotal(res.data.quantity * props.cart.price);
        })
    };

    /* 장바구니에서 삭제 */
    const deleteItem = (id) => {
        if (window.confirm("상품을 삭제하시겠습니까?")) {
            ShopService.deleteItem(id).then(res => {
                if(res.status === 200) {
                    window.location.reload();
                }
            }).catch(error => alert("상품 삭제가 실패했습니다."));
        }
    }

    return (
        <>
            <tr style={{ textAlign: "center" }}>
                <td scope="row" className="checkbox">
                    <input
                        type="checkbox"
                        onChange={(e) => props.handleSingleCheck(e.target.checked, cart.id)}
                        // checkItems에 id가 있으면 체크 아니면 체크 해제
                        checked={props.checkItems.includes(cart.id) ? true : false}
                    />
                </td>
                <td className="list-item">
                    <NavLink 
                        //href={`/shop/detail/${review.id}`}
                    >
                        <div className="product">
                            <Col> <img  src={cart.p_image} alt="item-img" /> </Col>
                            <Col className="product-info" style={{ textAlign: "left" }}>
                                <div> {cart.productName} </div>
                                {!props.cart.op2 ? 
                                    <div> {cart.op1} </div> :
                                    <div> {cart.op1}, {cart.op2} </div>}
                            </Col>
                        </div>
                    </NavLink>
                </td> 
                <td> 
                    {cart.price}
                </td>
                <td> 
                    <div className="quantity-wrapper">
                        <Row>
                            <Col className="quantity">
                                <InputGroup className="">
                                    <Button outline 
                                        onClick={() => minusQuantity(cart.id)} disabled={quantity === 1 ? true : false}
                                    >
                                        -
                                    </Button>
                                    <Input value={quantity} readOnly />
                                    <Button outline 
                                        onClick={() => plusQuantity(cart.id)}
                                    >
                                        +
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>
                </td>
                <td className="total"> 
                    {total}
                </td>
                <td> 
                    <button className="item-dlt" 
                        onClick={() => deleteItem(cart.id)}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="ico_delete--3ASzyXvISn">
                        <path d="M14.278 1.12l.722.72-6.278 6.28L15 14.397l-.722.722L8 8.841 1.722 15.12 1 14.397l6.278-6.278L1 1.841l.722-.722L8 7.397l6.278-6.278z" fill="#BDC0C6">
                        </path>
                        </svg>
                    </button>
                </td>
            </tr>
        </>
    );
}

export default CartItem;