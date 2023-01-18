import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button, InputGroup, Row, Col } from 'reactstrap';

// components
import DetailTabMenu from "../components/DetailTabMenu";

// styles
import '../assets/scss/shopdetail.scss';

// service
import ShopService from '../service/ShopService';

const ShoptDetail = memo((props) => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [op1, setOp1] = useState([]);
    const [op2, setOp2] = useState([]);
    const [selectedOp1, setSelectedOp1] = useState(0);
    const [selectedOp2, setSelectedOp2] = useState(0);
    const [selectedList, setSelectedList] = useState([]);

    useEffect(() => {
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
                        <Button>
                            장바구니
                        </Button>
                        <Button>
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

export default ShoptDetail;