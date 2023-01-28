import React, { useEffect, useState } from "react";
import { Row, Col, Button } from 'reactstrap';

// components
import { ReactComponent as StarSvg } from "../assets/img/star.svg";

// service
import ReviewService from '../service/ReviewService';

// styles
import '../assets/scss/mypagecomp.scss';

const MyPageReview = () => {
    const product = [];
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        ReviewService.getMyReview("gain").then(res => {
            setReviews(res.data);
        });
    });

    return (
        <>
        <ul className="review-list">
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
                    {/* {review.image.length > 0 &&
                        <Row className="image">
                            {review.image.map((img, index) => 
                                <Col xs="auto" key={index}>
                                    <img src={`http://localhost:8080/image?name=${encodeURI(img)}`} alt="review-img" />
                                </Col>
                            )}
                        </Row>
                    } */}
                    <Row className="flex-row-reverse">
                        {/* <Col xs="auto"><Button onClick={() => {deleteReview(review.id)}}>삭제</Button></Col>
                        <Col xs="auto"><Button onClick={() => {setIsUpdating({now: true, id: review.id})}}>수정</Button></Col> */}
                    </Row>
                </li>
            )}
            </ul>
        </>
    );
}

export default MyPageReview;