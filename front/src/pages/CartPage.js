import { faEquals, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { checkboxClasses } from '@mui/material';
import React, { useState } from 'react';
import { Table, Row, Col, Button, NavLink } from 'reactstrap';

// styles
import '../assets/scss/cartpage.scss'

// components
import CartItem from '../components/CartItem';

function CartPage(props) {
    /* 체크박스 전체 선택 */
    const handleAllCheck = (checked) => {
        
    };

    /* total 값 계산 */
    const calcTotalPrice = (id, isTrue) => {
       
    }

    /* 체크된 상품 수량 변화 있을 때 가격 계산 */
    const changeTotalPrice = (id) => {
       
    }

    return (
        <>
            <div className='cart-header'>
                <h3 className='cart-title'>
                    장바구니
                </h3>
            </div>
            <Table hover className="cart-tb">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: "5%" }} className="checkbox">
                            <input
                                type="checkbox"
                                // onChange={(e) => handleAllCheck(e.target.checked)}
                                // checked={
                                //     checkItems.length != 0 && checkItems.length === items.length
                                //         ? true
                                //         : false
                                // }
                            />
                        </th>
                        <th scope="col" style={{ width: "40%" }}> 상품 </th>
                        <th scope="col" style={{ width: "10%" }}> 가격 </th>
                        <th scope="col" style={{ width: "25%" }}> 수량 </th>
                        <th scope="col" style={{ width: "10%" }}> 합계 </th>
                        <th scope="col" style={{ width: "10%" }}> 삭제 </th>
                    </tr>
                </thead>
                <tbody>
                    <CartItem/>
                </tbody>
            </Table>

                {/* <div className="ct-buy">
                        <button 
                        type="button" 
                        className="btn-round btn"
                        >
                            주문하기
                        </button>
                </div> */}

            
        </>
    );
}

export default CartPage;