import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

// styles
import '../assets/scss/header.scss';

function MainMenu(props) {
    return (
        <div className="mainmenu">
            <Nav>
                <NavItem>
                    <NavLink
                        href="/"
                        active={window.location.pathname === '/'}
                    >
                    전체
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/test"
                        active={window.location.pathname === '/test'}
                    >
                    상의
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/"
                    >
                    아우터
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/"
                    >
                    바지
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/"
                    >
                    원피스
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/"
                    >
                    스커트
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/"
                    >
                    신발
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/"
                    >
                    여성가방
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/"
                    >
                    모자
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/"
                    >
                    양말/레그웨어
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        href="/"
                    >
                    액세서리
                    </NavLink>
                </NavItem>
            </Nav>
            <hr />
        </div>
    );
}

export default MainMenu;