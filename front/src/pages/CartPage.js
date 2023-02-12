import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, NavLink } from 'reactstrap';
import { useParams } from 'react-router-dom';

// styles
import '../assets/scss/cartpage.scss'

// components
import CartItem from '../components/CartItem';
import ShopService from '../service/ShopService';

function CartPage(props) {
    const { id } = useParams();
    const [carts, setCarts] = useState([]);
    const [checkItems, setCheckItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        ShopService.getCartItem(id).then(res => {
            setCarts(res.data);
            console.log(res.data)
        });
    }, [])

    /* 체크박스 단일 개체 선택 */
    const handleSingleCheck = (checked, id) => {
        console.log("single");
        if (checked) {
            setCheckItems([...checkItems, id]);
            calcTotalPrice(id, true);
        } else {
            setCheckItems(checkItems.filter((check) => check !== id));
            calcTotalPrice(id, false);
        }
    };

    /* 체크박스 전체 선택 */
    const handleAllCheck = (checked) => {
        console.log("all");
        if (checked) {
            const idArray = [];
            // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어서,
            // 전체 체크
            let sum = 0;
            carts.forEach((cart) => {
                idArray.push(cart.id);
                sum += cart.price * cart.quantity;
            });
            setCheckItems(idArray);
            setTotalPrice(sum);
        }
        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckItems([]);
            setTotalPrice(0);
        }
    };

    /* total 값 계산 */
    const calcTotalPrice = (id, isTrue) => {
        const curPrice = carts.reduce((sum, cur, i) => {
            if (cur.id == id)
                sum = cur.price * cur.quantity;
            return sum;
        }, 0);
        if (isTrue) {
            setTotalPrice(totalPrice + curPrice);
        }
        else if(!isTrue && totalPrice != 0){
            setTotalPrice(totalPrice - curPrice);
        }
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
                                onChange={(e) => handleAllCheck(e.target.checked)}
                                checked={
                                    checkItems.length != 0 && checkItems.length === carts.length
                                        ? true
                                        : false
                                }
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
                    {carts.map(cart =>
                        <CartItem 
                            id={id}
                            cart={cart}
                            handleSingleCheck={handleSingleCheck}
                            checkItems={checkItems}
                            setCheckItems={setCheckItems}
                            setCarts={setCarts}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                        />
                    )}
                    
                </tbody>
            </Table>
            <div className='totalPrice'> 금액 : {totalPrice} </div>
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