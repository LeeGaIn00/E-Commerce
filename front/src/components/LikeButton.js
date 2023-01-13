import React from "react";
import styled from "styled-components";
import HeartImg from "../assets/img/like.png";
import EmptyHeartImg from "../assets/img/unlike.png";

const Heart = styled.img`
    // css
    width: 30px;
    position: relative;
    left: 160px;
    bottom: 35px;
    cursor: pointer;
    z-index: 100;
    }
`;

const HeartButton = ({ like, onClick }) => {
    return (
        <Heart src={like?HeartImg:EmptyHeartImg} onClick={onClick} />
    );
};

export default HeartButton;