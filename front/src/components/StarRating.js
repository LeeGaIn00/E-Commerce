import React, { useState, useEffect } from 'react';

// components
import EachStar from './EachStar';

// styles
import '../assets/scss/starrating.scss';

function StarRating(props) {
    const [rateValue, setRateValue] = useState([false, false, false, false, false]);
    const [hoverRateValue, setHoverRateValue] = useState([false, false, false, false, false]);
    const [isHover, setIsHover] = useState(false);
    const starArray = [0, 1, 2, 3, 4];

    useEffect(() => {
        if(props.curStar) {
            console.log("curStar in StarRating => ", props.curStar);
            const prevRateValue = [false, false, false, false, false];
            prevRateValue.fill(true, 0, props.curStar);
            setRateValue(prevRateValue);
        }
    }, [props.curStar])

    /* 마우스 클릭 이벤트 */
    const handleStarClick = clickedIndex => {
        const prevRateValue = [...rateValue];
        const isClickedStarActive = prevRateValue[clickedIndex];
        const isNextStarActive = prevRateValue[clickedIndex + 1];

        /* 현재 채워진 별보다 작은 index 클릭시 (4개 채워져있는데 3번째 별 클릭) */
        if (isClickedStarActive && isNextStarActive) {
            prevRateValue.fill(false, clickedIndex + 1);

            setIsHover(false);
            setHoverRateValue([false, false, false, false, false]);
            setRateValue(prevRateValue);

            props.setStarHandler(clickedIndex + 1);

            return;
        }

        /* 현재 채워져 있는 별들 중 마지막 별 다시 클릭 (4개 채워져있는데 다시 4번째 별 클릭) */
        if (isClickedStarActive) {
            prevRateValue.fill(false, 0, clickedIndex + 1);

            setIsHover(false);
            setHoverRateValue([false, false, false, false, false]);
            setRateValue(prevRateValue);

            props.setStarHandler(0);

            return;
        }

        /* 비워져 있는 별 클릭, 다음 별도 비워져 있음 */
        if (!isClickedStarActive) {
            prevRateValue.fill(true, 0, clickedIndex + 1);

            setIsHover(false);
            setHoverRateValue([false, false, false, false, false]);
            setRateValue(prevRateValue);

            props.setStarHandler(clickedIndex + 1);

            return;
        }
    };

    /* 마우스 오버 이벤트 */
    const handleStarMousehover = hoveredIndex => {
        const prevRateValue = [...hoverRateValue];
        const isClickedStarActive = prevRateValue[hoveredIndex];
        const isNextStarActive = prevRateValue[hoveredIndex + 1];

        if (isClickedStarActive && isNextStarActive) {
            prevRateValue.fill(false, hoveredIndex + 1);

            setIsHover(true);
            setHoverRateValue(prevRateValue);

            return;
        }

        if (isClickedStarActive) {
            prevRateValue.fill(false, 0, hoveredIndex + 1);

            setIsHover(true);
            setHoverRateValue(prevRateValue);

            return;
        }

        if (!isClickedStarActive) {
            prevRateValue.fill(true, 0, hoveredIndex + 1);

            setIsHover(true);
            setHoverRateValue(prevRateValue);

            return;
        }
    };

    /* 마우스 아웃 이벤트 */
    const handleStarMouseout = () => {
        setIsHover(false);
        setHoverRateValue( [false, false, false, false, false]);
    };

    /* active 상태 check */
    const checkIsActive = star => {
        if(isHover) {
            if(hoverRateValue[star]) {
                return 'activeStar';
            }

            return 'inactiveStar';
        }

        if(rateValue[star]) {
            return 'activeStar';
        }

        return 'inactiveStar';
    };

    return (
        <div className="starList">
            {starArray.map((star, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => handleStarMousehover(star)}
                        onMouseLeave={() => handleStarMouseout()}
                    >
                        <EachStar name={checkIsActive(star)} />
                    </button>
                );
            })}
        </div>
    );
}

export default StarRating;