import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';

// components
import { ReactComponent as StarSvg } from "../assets/img/star.svg";
import ReviewForm from "../components/ReviewForm";

// styles
import '../assets/scss/shopdetail.scss';
import '../assets/scss/starrating.scss';

// service
import ReviewService from '../service/ReviewService';
import ImageService from '../service/ImageService';

function ReviewTab(props) {
    const product = props.product;
    const [reviews, setReviews] = useState([]);
    const [isUpdating, setIsUpdating] = useState({now: false, id: null});

    useEffect(() => {
        product.id &&
        ReviewService.getReviewList(product.id).then(res => {
            setReviews(res.data);
        });
    }, [product]);

    const updateCancel = () => {
        setIsUpdating({now: false, id: null});
    }

    const createReview = (star, content, files) => {
        if(content === '') {
            alert("내용을 입력해주세요!");
        } else if(star === 0) {
            alert("별점을 매겨주세요!");
        } else {
            let data = {
                content: content,
                image: null,
                star: star,
                productId: product.id,
                memberId: "alice"
            }
            if(files.length > 0) {
                const formData = new FormData();
                files.forEach((file) => {
                    formData.append('file', file);
                });
                ImageService.upload(formData).then(res => {
                    data.image = res.data;
                }).then(res => {
                    ReviewService.createReview(data).then(res => {
                        console.log(res.data);
                        window.location.reload();
                    })
                })
            } else {
                ReviewService.createReview(data).then(res => {
                    console.log(res.data);
                    window.location.reload();
                })
            }
        }
    };

    const updateReview = async (id, star, content, files, exImgFile, deletedFile) => {
        if(content === '') {
            alert("내용을 입력해주세요!");
        } else if(star === 0) {
            alert("별점을 매겨주세요!");
        } else {
            let data = {
                content: content,
                image: '',
                star: star,
                productId: product.id,
                memberId: "alice"
            };

            /* 이미지 삭제 */
            if(deletedFile.length > 0) {
                const formData = new FormData();
                formData.append('exImgFile', exImgFile);
                formData.append('deletedFile', deletedFile);
                await ImageService.delete(formData).then(res => {
                    res.data !== null ? data.image = res.data : data.image = '';
                });
            }

            /* 이미지 업로드 */
            if(files.length > 0) {
                const formData = new FormData();
                files.forEach((file) => {
                    formData.append('file', file);
                });
                await ImageService.upload(formData).then(res => {
                    data.image = data.image + res.data;
                    console.log(data.image);
                });
            }

            /* 리뷰 데이터 업데이트 */
            ReviewService.updateReview(id, data).then(res => {
                console.log(res.data);
                window.location.reload();
            });
        }
    }

    const deleteReview = (idToDel) => {
        if (window.confirm("리뷰를 삭제하시겠습니까?")) {
            ReviewService.deleteReview(idToDel).then(res => {
                if(res.status === 200) {
                    window.location.reload();
                }
            }).catch(error => alert("리뷰 삭제가 실패했습니다."));
        }
    }

    return (
        <div className="review-tab">
            <div className="write-form">
                <ReviewForm mode="create" createReview={createReview}/>
            </div>
            <hr />
            <ul className="review-list">
                {reviews.map((review) => 
                    (isUpdating.now && isUpdating.id === review.id) ? 
                    <li className="updt-form" key={review.id} >
                        <ReviewForm mode="update" review={review} updateCancel={updateCancel} updateReview={updateReview}/>
                    </li>
                    :
                    <li key={review.id} className="list-item">
                        <Row className="star">
                            {Array.from(Array(review.star), (_, index) => <Col xs="auto" key={index}><StarSvg fill="#ffc107"/></Col>)}
                            {Array.from(Array(5 - review.star), (_, index) => <Col xs="auto" key={index}><StarSvg fill="#eeeeee"/></Col>)}
                            <Col xs="auto">
                                {review.star}
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
                        {/* order 기능 추가하면 아래에 구매했던 정보로 띄워야함 */}
                        <Row className="buy-info">
                            <Col xs="auto">
                                <img src={product.image} alt="prd-img" />
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
                        {review.image.length > 0 &&
                            <Row className="image">
                                {review.image.map((img, index) => 
                                    <Col xs="auto" key={index}>
                                        <img src={`http://localhost:8080/image?name=${encodeURI(img)}`} alt="review-img" />
                                    </Col>
                                )}
                            </Row>
                        }
                        <Row className="flex-row-reverse">
                            <Col xs="auto"><Button onClick={() => {deleteReview(review.id)}}>삭제</Button></Col>
                            <Col xs="auto"><Button onClick={() => {setIsUpdating({now: true, id: review.id})}}>수정</Button></Col>
                        </Row>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ReviewTab;