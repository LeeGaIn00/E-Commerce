import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

// styles
import '../assets/scss/header.scss';

function MainMenu(props) {
    const category = props.category;
    return (
        <div className="mainmenu">
            <Nav>
                <NavItem>
                    <NavLink
                        href="/"
                        active={window.location.pathname === encodeURI('/shop/0')}
                    >
                    전체
                    </NavLink>
                </NavItem>
                {category.map(cate => 
                    <NavItem key={cate.id}>
                        <NavLink 
                            href={`/shop/${cate.id}`}
                            active={window.location.pathname === encodeURI(`/shop/${cate.id}`)}
                        >
                        {cate.title}
                        </NavLink>
                    </NavItem>
                )}
            </Nav>
            <hr />
        </div>
    );
}

export default MainMenu;