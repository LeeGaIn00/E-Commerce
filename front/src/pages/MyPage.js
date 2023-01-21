import React, { useState, useEffect, useContext } from 'react';
//import { Nav, NavItem, NavLink } from 'reactstrap';

// styles
import '../assets/scss/mypage.scss'

import AuthContext from '../service/AuthContext';

const MyPage = () => {
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        authCtx.getUser();
    }, []);
}

export default MyPage;