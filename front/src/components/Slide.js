import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// components
import Item from "./Item";

// styles
import '../assets/scss/slide.scss';

function Slide(props) {
    return (
        <div className="slider-wrap">
            <div className="slider-title"> 인기 상품 </div>
            <Slider {...settings}>
                {props.products.map(product => 
                    <Item key={product.id} product={product} />
                )}
            </Slider>
        </div>
    );
}

const settings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 5,
};

export default Slide;