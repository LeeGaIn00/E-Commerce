import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

// styels
import '../assets/scss/sortbutton.scss';

function SortButton(props) {
    const [sortSelected, setSortSelected] = useState('신상품순');

    const handleButtonClick = (sort) => {
        props.setSortSelected(sort);
        setSortSelected(sort);
    }

    return (
        <div className="sort-btn-wrap">
            <ButtonGroup>
                <Button
                    color="primary"
                    outline
                    onClick={() => handleButtonClick('신상품순')}
                    active={sortSelected === '신상품순'}
                >
                신상품순
                </Button>
                <Button
                    color="primary"
                    outline
                    onClick={() => handleButtonClick('낮은가격순')}
                    active={sortSelected === '낮은가격순'}
                >
                낮은가격순
                </Button>
                <Button
                    color="primary"
                    outline
                    onClick={() => handleButtonClick('높은가격순')}
                    active={sortSelected === '높은가격순'}
                >
                높은가격순
                </Button>
                <Button
                    color="primary"
                    outline
                    onClick={() => handleButtonClick('판매순')}
                    active={sortSelected === '판매순'}
                >
                판매순
                </Button>
                <Button
                    color="primary"
                    outline
                    onClick={() => handleButtonClick('후기순')}
                    active={sortSelected === '후기순'}
                >
                후기순
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default SortButton;