import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons'

// styles
import '../assets/scss/mypage.scss'

// components
import MyPageHeader from "../components/MyPageHeader";
import MyPageNav from "../components/MyPageNav";
import MyPageEditInfo from "../components/MyPageEditInfo";
import MyPageOrder from "../components/MyPageOrder";
import MyPageCart from "../components/MyPageCart";
import MyPageReview from "../components/MyPageReview";
import MyPageInquiry from "../components/MyPageInquiry";
import MyPageLike from "../components/MyPageLike";

// service
import AuthContext from '../service/AuthContext';

const MyPage = (props) => {
    const authCtx = useContext(AuthContext);
    const id = authCtx.user.id;
    const { category }= useParams();

    useEffect(() => {
        authCtx.getUser();
    }, []);

    return (
        <div className="mypage-body">
            <MyPageHeader/>
            <div className='mypage-main'>
                <div className='mp-nav'> <MyPageNav /> </div>
                <div className='nav-content'> 
                { category === '0' && 
                    <MyPageEditInfo /> } 
                { category === '1' && 
                    <MyPageOrder/> }
                { category === '2' && 
                    <MyPageCart/> }
                { category === '3' && 
                    <MyPageReview id={id}/> }
                { category === '4' && 
                    <MyPageInquiry/> }
                { category === '5' && 
                    <MyPageLike /> } 
                </div>
                
                
            </div>
        </div>
    );
}

export default MyPage;