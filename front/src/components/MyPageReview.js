import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button } from 'reactstrap';

// components
import { ReactComponent as StarSvg } from "../assets/img/star.svg";

// service
import ReviewService from '../service/ReviewService';
import ShopService from '../service/ShopService';

// styles
import '../assets/scss/mypagecomp.scss';

const MyPageReview = () => {
    //const product = [];
    const [reviews, setReviews] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        ReviewService.getMyReview("gain").then(res => {
            //setReviews(res.data);
            console.log(res.data);
        });
    });

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
                            <div className="product">
                                <Col> <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="item-img" /> </Col>
                                <Col className="product-info">
                                    <div> 상품명 </div>
                                    <div> 상품 옵션  </div>
                                </Col>
                            </div>
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
                                {review.image.map((img) => 
                                    <img src={`http://localhost:8080/image?name=${encodeURI(img)}`} alt="review-img" /> )}
                                </Col>
                
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
{/*       
        <ul className="review-list">
            <Row className="review-list-header">
                <Col className="header-content"> 상품정보 </Col>
                <Col className="header-content"> 내용 </Col>
            </Row>
            {reviews.map((review) => 
            <li key={review.id} className="list-item">
                    <Row className="star">
                        {Array.from(Array(review.star), (_, index) => <Col xs="auto" key={index}><StarSvg fill="#ffc107"/></Col>)}
                        {Array.from(Array(5 - review.star), (_, index) => <Col xs="auto" key={index}><StarSvg fill="#eeeeee"/></Col>)}
                        <Col xs="auto">
                            별점
                        </Col>
                    </Row>
                    <Row className="user">
                        <Col xs="auto">
                            {review.memberId}
                        </Col>
                        <Col xs="auto">
                            {review.createdTime.substr(0, 10)}
                        </Col>
                    </Row>
                    <Row className="buy-info">
                        <Col xs="auto">
                            <img src={product.image} alt="item-img" />
                        </Col>
                        <Col xs="auto">
                            {product.name}
                            <br />
                            L 구매
                        </Col>
                    </Row>
                    <Row className="content">
                        {review.content}
                    </Row>
                   
                    <Row className="flex-row-reverse">
                        <Col xs="auto"><Button onClick={() => {deleteReview(review.id)}}>삭제</Button></Col>
                        <Col xs="auto"><Button onClick={() => {setIsUpdating({now: true, id: review.id})}}>수정</Button></Col>
                    </Row>
                </li>
            )}
            </ul> */}
        </>
    );
}

export default MyPageReview;