import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

// styles
import '../assets/scss/header.scss';

function TopMenu(props) {
    return (
        <div className="topmenu">
            <Nav className="justify-content-end">
                <NavItem>
                    <NavLink
                        href="/register"
                    >
                    회원가입
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/login"
                        >
                    로그인
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    );
}

export default TopMenu;