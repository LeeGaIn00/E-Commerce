import React from 'react';
import { Row, Col } from 'reactstrap';

// components
import StarRating from "../components/StarRating";

// styles
import '../assets/scss/shopdetail.scss';

function ReviewTab(props) {
    const product = props.product;

    return (
        <div className="review-tab">
            <div className="write-star">
                <div className="star-title">
                별점을 매겨주세요
                </div>
                <StarRating />
            </div>
            <div className="write-content">
                <textarea defaultValue='' placeholder='내용'/>
            </div>
            <hr />
            <ul>
                <li>
                    <Row className="star">
                        <Col xs="auto">
                            ⭐⭐⭐⭐⭐
                        </Col>
                        <Col xs="auto">
                            5
                        </Col>
                    </Row>
                    <Row className="user">
                        <Col xs="auto">
                            아이디
                        </Col>
                        <Col xs="auto">
                            2023.01.01
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
                        딸기우유색에 부드럽고 따수운 바지예요 ! 
                        색감이 너무 예쁜 연핑크에다가 기장감도 딱 제 키에 예쁘게 발목까지 내려오는 길이여서 제 최애 겨울바지가 되었습니다!!! 
                        또 융털이라서 너무 보드랍고 겉은 코듀로이 재질로 편하게 걸쳐도 대충 입은 느낌이 아닌 꾸안꾸같은 느낌을 줘서 간편하게 입고 나가기 좋아요 !
                    </Row>
                    <Row className="image">
                        <img src={product.image} alt="item-img" />
                    </Row>
                </li>
                <li>
                    <Row className="star">
                        <Col xs="auto">
                            ⭐⭐⭐⭐⭐
                        </Col>
                        <Col xs="auto">
                            5
                        </Col>
                    </Row>
                    <Row className="user">
                        <Col xs="auto">
                            아이디
                        </Col>
                        <Col xs="auto">
                            2023.01.01
                        </Col>
                    </Row>
                    <Row className="buy-info">
                        <Col xs="auto">
                            <img src={product.image} alt="item-img" />
                        </Col>
                        <Col xs="auto">
                            {product.name}
                            <br />
                            M 구매
                        </Col>
                    </Row>
                    <Row className="content">
                        딸기우유색에 부드럽고 따수운 바지예요 ! 
                        색감이 너무 예쁜 연핑크에다가 기장감도 딱 제 키에 예쁘게 발목까지 내려오는 길이여서 제 최애 겨울바지가 되었습니다!!! 
                        또 융털이라서 너무 보드랍고 겉은 코듀로이 재질로 편하게 걸쳐도 대충 입은 느낌이 아닌 꾸안꾸같은 느낌을 줘서 간편하게 입고 나가기 좋아요 !
                    </Row>
                    <Row className="image">
                        <img src={product.image} alt="item-img" />
                    </Row>
                </li>
            </ul>
        </div>
    );
}

export default ReviewTab;