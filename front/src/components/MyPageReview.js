import React, { useEffect, useState, useContext } from "react";
import { Table, Row, Col, Button, NavLink } from 'reactstrap';
import { useParams } from "react-router-dom";

// components
import { ReactComponent as StarSvg } from "../assets/img/star.svg";

// service
import ReviewService from '../service/ReviewService';
import AuthContext from "../service/AuthContext";
import ShopService from '../service/ShopService';

// styles
import '../assets/scss/mypagecomp.scss';

const MyPageReview = (props) => {
    const authCtx = useContext(AuthContext);
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        ReviewService.getMyReview(id).then(res => {
            setReviews(res.data);
        });
    }, []);

    return (
        <>
            <Table hover className="review-tb">
                <thead>
                    <tr>
                        <th> 상품정보</th>
                        <th> 내용 </th>
                    </tr>
                </thead>
                <tbody>
                { reviews.map((review) => 
                    <tr>
                        <td className="list-item">
                            {/* 상품정보 들어갈 자리 */}
                            <NavLink href={`/shop/detail/${review.id}`}>
                                <div className="product">
                                    <Col> <img src={encodeURI(review.p_image)} alt="item-img" /> </Col>
                                    <Col className="product-info">
                                        <div> {review.name} </div>
                                        {/* <div> 상품 옵션  </div> */}
                                    </Col>
                                </div>
                            </NavLink>
                        </td> 
                        <td>
                            <div className="user">
                                <Col xs="auto">
                                    {review.createdTime.substr(0, 10)}
                                </Col>
                            </div>
                            <div className="star">
                                {Array.from(Array(review.star), (_, index) => <Col xs="auto" key={index}><StarSvg fill="#ffc107"/></Col>)}
                                {Array.from(Array(5 - review.star), (_, index) => <Col xs="auto" key={index}><StarSvg fill="#eeeeee"/></Col>)}
                                {/* {Array.from(Array(3), (_, index) => <Col xs="auto" key={index}><StarSvg fill="#ffc107"/></Col>)}
                                {Array.from(Array(5 - 3), (_, index) => <Col xs="auto" key={index}><StarSvg fill="#eeeeee"/></Col>)} */}
                            </div>
                            <div className="content">
                                {review.content}
                            </div>
                            <div className="buy-info">
                                <Col xs="auto">  
                                {review.r_image.map((img) => 
                                    <img src={`http://localhost:8080/image?name=${encodeURI(img)}`} alt="review-img" /> )} 
                                </Col>
                
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
}

export default MyPageReview;