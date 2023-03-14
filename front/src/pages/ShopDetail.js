import React, { memo, useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, InputGroup, Row, Col } from 'reactstrap';

// components
import DetailTabMenu from "../components/DetailTabMenu";

// styles
import '../assets/scss/shopdetail.scss';

// service
import ShopService from '../service/ShopService';
import AuthContext from '../service/AuthContext';

const ShopDetail = memo((props) => {
    const { id } = useParams(); // 상품 id
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const isLoggin = authCtx.isLoggedIn;
    const [product, setProduct] = useState([]);
    const [op1, setOp1] = useState([]);
    const [op2, setOp2] = useState([]);
    const [selectedOp1, setSelectedOp1] = useState(0);
    const [selectedOp2, setSelectedOp2] = useState(0);
    const [selectedList, setSelectedList] = useState([]);

    useEffect(() => {
        if(isLoggin) authCtx.getUser();
        ShopService.getProductById(id).then(res => {
            setProduct(res.data);
            setOp1(res.data.option1?.split('/'));
            setOp2(res.data.option2?.split('/'));
        });
    }, [])

    const onChangeSelection = (num, e) => {
        num === 1 ?
        setSelectedOp1(e.target.value)
        : setSelectedOp2(e.target.value);
    }

    const removeList = (indexToRemove) => {
        setSelectedList([...selectedList.filter((_, index) => index !== indexToRemove)]);
    }

    const plusQty = (indexToPlus, data) => {
        const newData = {...data, quantity: ++data.quantity };
        setSelectedList(selectedList.map((list, index) => 
        index === indexToPlus ? { ...list, ...newData } : list))
    }

    const minusQty = (indexToMinus, data) => {
        const newData = {...data, quantity: --data.quantity };
        setSelectedList(selectedList.map((list, index) => 
        index === indexToMinus ? { ...list, ...newData } : list))
    }

    const addCart = () => {
        if(!isLoggin) {
            alert("로그인을 해주세요.");
        }
        else {
            if(selectedList.length == 0) 
                alert("옵션을 선택하세요.");
            else { 
                let data = {
                    productId: id,
                    memberId: authCtx.user.id,
                    op1: null,
                    op2: null,
                    quantity: 0
                }

                if(!op2) {
                    for(let i = 0; i < selectedList.length; i++) {
                        data.op1 = op1[selectedList[i]["op1"]-1];
                        data.quantity = selectedList[i]["quantity"];
                        ShopService.addCart(data).then(res => {
                            console.log(res.data);
                        })
                    }    
                }
                else {
                    for(let i = 0; i < selectedList.length; i++) {
                        data.op1 = op1[selectedList[i]["op1"]-1];
                        data.op2 = op2[selectedList[i]["op2"]-1];
                        data.quantity = selectedList[i]["quantity"];
                        ShopService.addCart(data).then(res => {
                            console.log(res.data);
                        })
                    }
                }
                alert("상품을 장바구니에 담았습니다.");
            }
        }
    }
     const getData = () => {
       let list = [];
            return new Promise( (resolve, reject) => {
                selectedList.map(select => {
                    let data = {
                        image: product.image,
                        name: product.name,
                        op1: op1[Number(select.op1) - 1],
                        op2: select.op2 != null && op2[Number(select.op2) - 1],
                        quantity: select.quantity,
                        price: product.discount * select.quantity
                    }
                    list = [...list, data];
                })
                resolve(list);
            })
          }

    const order = () => {
        getData().then((res) => 
            navigate(`/order/gain`, { state : { orderList: res } })
        );
    }

    useEffect(
        () => {
            if( !op2 && selectedOp1) {
                console.log("option 선택 완료 => ", selectedOp1);
                let list = selectedList.find(list => list.op1 === selectedOp1);
                if(list) {
                    plusQty(selectedList.indexOf(list), list);
                } else {
                    setSelectedList([...selectedList, {"op1": selectedOp1, "quantity": 1}]);
                }
                setSelectedOp1(0);
            }
            else if( selectedOp2 ) {
                console.log("option 선택 완료 => ", selectedOp1, " / ", selectedOp2);
                let list = selectedList.find(list => list.op1 === selectedOp1 && list.op2 === selectedOp2);
                if(list) {
                    plusQty(selectedList.indexOf(list), list);
                } else {
                    setSelectedList([...selectedList, {"op1": selectedOp1, "op2": selectedOp2, "quantity": 1}]);
                }
                setSelectedOp1(0);
                setSelectedOp2(0);
            }
        },
        [selectedOp1, selectedOp2, op2, selectedList]
    );

    return (
        <div>
            <div className="detail-top">
                <div className="left">
                    <img src={product.image} alt="item-img" />
                </div>
                <div className="right">
                    <div className="name">
                        {product.name}
                    </div>
                    <div className="price-info">
                        {(product.discount && product.discount !== product.price) ?
                            <>
                                <span className="rate">
                                    {Math.floor(((product.price - product.discount) / product.price) * 100)}%
                                </span>
                                <span className="discount">
                                    {product.discount}원
                                </span>
                            </>
                            : null
                        }
                        <span className="price">
                            {product.price}원
                        </span>
                    </div>
                    <hr />
                    <div className="option">
                        <div className="option1">
                            {op1 &&
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    value={selectedOp1}
                                    onChange={(e) => onChangeSelection(1, e)}
                                >
                                    <option value="0">
                                        --옵션 선택--
                                    </option>
                                    {op1.map((op, index) =>
                                    <option key={index} value={index+1}>
                                        {op}
                                    </option>
                                    )}
                                </Input>
                            }
                        </div>
                        <div className="option2">
                            {op2 &&
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    value={selectedOp2}
                                    onChange={(e) => onChangeSelection(2, e)}
                                >
                                    <option value="0">
                                        --옵션 선택--
                                    </option>
                                    {selectedOp1 !==0 &&
                                    op2.map((op, index) =>
                                    <option key={index} value={index+1}>
                                        {op}
                                    </option>
                                    )}
                                </Input>
                            }
                        </div>
                    </div>
                    <hr />
                    { selectedList &&
                        <div className="add-list">
                                {selectedList.map((list, index) =>
                                <Row xs="4" className="align-items-center" key={index}>
                                    <Col className="option">
                                        {op2 ?
                                        op1[list.op1-1] + "," + op2[list.op2-1]
                                        : op1[list.op1-1]
                                        }
                                    </Col>
                                    <Col className="quantity">
                                        <InputGroup className="float-end">
                                            <Button outline onClick={() => minusQty(index, list)} disabled={list.quantity === 1 ? true : false}>
                                                -
                                            </Button>
                                            <Input value={list.quantity} readOnly />
                                            <Button outline onClick={() => plusQty(index, list)}>
                                                +
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                    <Col className="price text-end">
                                        {product.discount * list.quantity}원
                                    </Col>
                                    <Col className="cancel float-end">
                                        <Button close onClick={() => removeList(index)}/>
                                    </Col>
                                </Row>
                                )}
                        </div>
                    }
                    <hr />
                    <div className="btn-box">
                        <Button onClick={addCart}>
                            장바구니
                        </Button>
                        <Button onClick={order}>
                            바로구매
                        </Button>
                    </div>
                </div>
            </div>
            {/* detail-bottom */}
            <DetailTabMenu product={product}/>
        </div>
    );
});

export default ShopDetail;