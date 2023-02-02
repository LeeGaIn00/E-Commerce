import React, { useState } from 'react';
import { Table, Row, Col, Button, NavLink, Input, InputGroup } from 'reactstrap';

function CartItem(props) {

    // const [optionNum, setNum] = useState(props.option.num);
    // const [optionSum, setSum] = useState(props.option.sum);
    // const [items, setItems] = useState(props.items);

    /* 선택한 옵션의 수량 변경 시 수량 및 가격 반영 */
    const plusQuantity = (option) => {
    };
    const minusQuantity = (option) => {
    };

    return (
        <>
        <tr style={{ textAlign: "center" }}>
            <td scope="row" className="checkbox">
                <input
                    type="checkbox"
                    // onChange={(e) => props.handleSingleCheck(e.target.checked, props.option.id)}
                    // // checkItems에 data.id가 있으면 체크 아니면 체크 해제
                    // checked={props.checkItems.includes(props.option.id) ? true : false}
                />
            </td>
            <td className="list-item">
                <NavLink 
                    //href={`/shop/detail/${review.id}`}
                >
                    <div className="product">
                        <Col> <img  src={`${process.env.PUBLIC_URL}/logo512.png`} alt="item-img" /> </Col>
                        <Col className="product-info" style={{ textAlign: "left" }}>
                            <div> 상품명 </div>
                            <div> 상품 옵션  </div>
                        </Col>
                    </div>
                </NavLink>
            </td> 
            <td> 
                가격
                {/* {props.option.price}  */}
            </td>
            <td> 
                <div className="quantity-wrapper">
                    <Row>
                        <Col className="quantity">
                            <InputGroup className="">
                                <Button outline 
                                    //onClick={() => minusQty(index, list)} disabled={list.quantity === 1 ? true : false}
                                >
                                    -
                                </Button>
                                <Input value={1} readOnly />
                                <Button outline 
                                //</InputGroup>onClick={() => plusQty(index, list)}
                                >
                                    +
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </div>
            </td>
            <td className="total"> 
                합계
                {/* {props.option.price * optionNum}  */}
            </td>
            <td> 
                <button className="item-dlt" 
                    // onClick={() => props.onRemove(props.option.id)}
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