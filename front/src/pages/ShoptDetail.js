import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button, InputGroup, Row, Col } from 'reactstrap';

// components
import Header from "../components/Header";
import DetailTabMenu from "../components/DetailTabMenu";

// test data
import product_list from '../assets/ProductData';

// styles
import '../assets/scss/shopdetail.scss';

const ShoptDetail = memo((props) => {
    const {id} = useParams();
    const product = product_list[Number(id)-1];
    const option1 = product.option1?.split('/');
    const option2 = product.option2?.split('/');
    const [selectedOp1, setSelectedOp1] = useState(0);
    const [selectedOp2, setSelectedOp2] = useState(0);
    const [selectedList, setSelectedList] = useState([]);

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
            if( !option2 && selectedOp1) {
                console.log("option 선택 완료 => ", selectedOp1);
                let list = selectedList.find(list => list.option1 === selectedOp1);
                if(list) {
                    plusQty(selectedList.indexOf(list), list);
                } else {
                    setSelectedList([...selectedList, {"option1": selectedOp1, "quantity": 1}]);
                }
                setSelectedOp1(0);
            }
            else if( selectedOp2 ) {
                console.log("option 선택 완료 => ", selectedOp1, " / ", selectedOp2);
                let list = selectedList.find(list => list.option1 === selectedOp1 && list.option2 === selectedOp2);
                if(list) {
                    plusQty(selectedList.indexOf(list), list);
                } else {
                    setSelectedList([...selectedList, {"option1": selectedOp1, "option2": selectedOp2, "quantity": 1}]);
                }
                setSelectedOp1(0);
                setSelectedOp2(0);
            }
        },
        [selectedOp1, selectedOp2, option2, selectedList]
    );

    return (
        <div>
            <Header />
            <div className="detail-top">
                <div className="left">
                    <img src={require(`../assets/img/${product.image}`)} alt="item-img"/>
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
                            {option1 &&
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
                                    {option1.map((op, index) =>
                                    <option key={index} value={index+1}>
                                        {op}
                                    </option>
                                    )}
                                </Input>
                            }
                        </div>
                        <div className="option2">
                            {option2 &&
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
                                    option2.map((op, index) =>
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
                                        {option2 ?
                                        option1[list.option1-1] + "," + option2[list.option2-1]
                                        : option1[list.option1-1]
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