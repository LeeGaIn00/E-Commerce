import React, { useState, useEffect } from 'react';
import { InputGroup, Input, Button, NavLink, CloseButton } from 'reactstrap';
import { Outlet, useOutletContext, useNavigate, createSearchParams } from 'react-router-dom';


// components
import TopMenu from "../components/TopMenu";
import MainMenu from "../components/MainMenu";

// styles
import '../assets/scss/header.scss';

// service
import ShopService from '../service/ShopService';

function Header(props) {
    const [category, setCategory] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        ShopService.getCateList().then(res => {
            setCategory(res.data);
        })
    }, []);

    const onChangeSearch = (e) => {
        setSearchInput(e.target.value);
    }

    const onReset = () => {
        setSearchInput('');
    }

    const onSearch = () => {
        if(searchInput.length > 0) {
            navigate({
                pathname: '/shop/search',
                search: `?${createSearchParams({keyword: searchInput})}`,
                replace: true
            });
        } else {
            alert("검색어를 입력하세요!");
        }
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            onSearch();
        }
    }

    return (
        <>
        <div className="hdr-wrap">
            <TopMenu />
            <div className="mid-wrap">
                <NavLink href="/">
                    <div className="title">LOGO</div>
                </NavLink>
                <InputGroup>
                    <Input placeholder="검색어를 입력하세요" value={searchInput} onChange={onChangeSearch} onKeyDown={handleKeyDown} />
                    {searchInput? <div><CloseButton onClick={onReset}/></div> : null}
                    <Button onClick={onSearch}/>
                </InputGroup>
            </div>
            <MainMenu category={category}/>
        </div>
        <Outlet context={{ category }}/>
        </>
    );
}

export default Header;

export function useCate() {
    return useOutletContext();
}