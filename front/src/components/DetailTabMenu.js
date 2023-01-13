import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

// components
import ReviewTab from "../components/ReviewTab";
import InquiryTab from "../components/InquiryTab";

// styles
import '../assets/scss/shopdetail.scss';

function DetailTabMenu(props) {
    const product = props.product;
    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <div className="detail-bottom">
            <Nav tabs className="justify-content-center">
                <NavItem>
                    <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {toggle("1")}}
                    >
                        상품정보
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {toggle("2")}}
                    >
                        상품리뷰
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => {toggle("3")}}
                    >
                        상품문의
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className="text-center">
                <TabPane tabId="1">
                    <div> <img src={require(`../assets/img/${product.detail}`)} alt="detail-img"/> </div>
                </TabPane>
                <TabPane tabId="2">
                    <ReviewTab product={product}/>
                </TabPane>
                <TabPane tabId="3">
                    <InquiryTab />
                </TabPane>
            </TabContent>
        </div>
    );
}

export default DetailTabMenu;