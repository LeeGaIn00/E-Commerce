import React, { useState, useEffect, useContext } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

// styles
import '../assets/scss/header.scss';

// service
import AuthContext from "../service/AuthContext";

function TopMenu(props) {
    const authCtx = useContext(AuthContext);
    const [id, setId] = useState('');
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;

    useEffect(() => {
        if (isLogin) {
            authCtx.getUser();
        }
    }, [isLogin]);

    useEffect(() => {
        if (isGet) {
            setId(authCtx.user.id);
        }
    }, [isGet]);

    const toggleLogoutHandler = () => {
        authCtx.logout();
        alert("로그아웃 되었습니다");
    };

    return (
        <div className="topmenu">
            <Nav className="justify-content-end">
                { !isLogin &&
                    <NavItem>
                        <NavLink href="/register">
                            회원가입
                        </NavLink>
                    </NavItem> }
                { !isLogin &&
                    <NavItem>
                        <NavLink href="/login">
                            로그인
                        </NavLink>
                    </NavItem> }
                { isLogin &&
                    <NavItem>
                        <NavLink onClick={toggleLogoutHandler}>
                            로그아웃
                        </NavLink>
                    </NavItem> }
                { isLogin && 
                    <NavItem>
                        <NavLink href={`/mypage/${authCtx.user.id}/0`}>
                            마이페이지
                        </NavLink>
                    </NavItem> }
                { isLogin && 
                    <NavItem>
                        <NavLink>
                            주문배송조회
                        </NavLink>
                    </NavItem> }
            </Nav>
        </div>
    );
}

export default TopMenu;