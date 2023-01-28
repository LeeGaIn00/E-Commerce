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

import AuthContext from '../service/AuthContext';

const MyPage = (props) => {
    const authCtx = useContext(AuthContext);
    const { category }= useParams();
    const [cateId, setCateId] = useState('0');


    useEffect(() => {
        authCtx.getUser();
    }, []);

   console.log(category)

    return (
        <div className="mypage-body">
            <MyPageHeader/>
            <div className='mypage-main'>
                <div className='mp-nav'> <MyPageNav /> </div>
                <div className='edit-info'> 
                { category === '0' && 
                    <MyPageEditInfo/> } 
                { category === '1' && 
                    <MyPageOrder/> }
                { category === '2' && 
                    <MyPageCart/> }
                { category === '3' && 
                    <MyPageReview/> }
                { category === '4' && 
                    <MyPageInquiry/> }
                { category === '5' && 
                    <MyPageLike/> } 
                </div>
                
                
            </div>
        </div>
    );
}

export default MyPage;