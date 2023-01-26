import React, { useEffect, useContext } from 'react';

// styles
import '../assets/scss/mypagehdr.scss'

// components
import MyPageNav from "../components/MyPageNav";

import AuthContext from '../service/AuthContext';

const MyPageHeader = () => {
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        authCtx.getUser();
    }, []);

    return (
        <div className="mypagehdr-body">
            <div className='mypagehdr-header'>
                <h3 className='mypagehdr-title'>
                    마이페이지
                </h3>
                <div className="info-text">
                    <div className="info-group"> {authCtx.user.id} </div>
                    <br />
                    <div className="info-group"> 가입일 : 2023.01.01 </div>
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default MyPageHeader;