import React from 'react';
import { InputGroup, Input, Button, NavLink } from 'reactstrap';

// components
import TopMenu from "../components/TopMenu";
import MainMenu from "../components/MainMenu";

// styles
import '../assets/scss/header.scss';

function Header(props) {
    return (
        <div className="hdr-wrap">
            <TopMenu />
            <div className="mid-wrap">
                <NavLink href="/">
                    <div className="title">LOGO</div>
                </NavLink>
                <InputGroup>
                    <Input />
                    <Button />
                </InputGroup>
            </div>
            <MainMenu />
        </div>
    );
}

export default Header;