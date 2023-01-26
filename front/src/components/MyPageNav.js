import React, { useState, useEffect, useContext } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons'

// styles
import '../assets/scss/mypagenav.scss'

// service
import AuthContext from '../service/AuthContext';

const MyPageNav = () => {
    const authCtx = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("1");
    const id = authCtx.user.id;
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    useEffect(() => {
        authCtx.getUser();
    }, []);

    return (
        <div className='section mypagenav'>
            <h5 className='title'> 나의 쇼핑 활동 </h5>
            <NavLink href={`/mypage/${id}/0`}> 회원 정보 수정 </NavLink> 
            <NavLink href={`/mypage/${id}/1`}>  주문 내역 조회 </NavLink>
            <NavLink href={`/mypage/${id}/2`}>  장바구니 </NavLink>
            <NavLink href={`/mypage/${id}/3`}>  구매후기 </NavLink>
            <NavLink href={`/mypage/${id}/4`}>  상품후기 </NavLink>
            <NavLink href={`/mypage/${id}/5`}>  좋아요 </NavLink>
        </div>
        
    );
}

export default MyPageNav;