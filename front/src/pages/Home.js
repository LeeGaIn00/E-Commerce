import React, { useEffect, useState } from 'react';

// components
import Header from "../components/Header";
import Slide from "../components/Slide";
import SortButton from "../components/SortButton";
import ItemListTable from "../components/ItemListTable";

// styels
import '../assets/scss/home.scss';

// test data
import product_list from '../assets/ProductData';

const Home = () => {
    const [sortSelected, setSortSelected] = useState('신상품순');

    useEffect(() => {
        console.log("sort 변경 => ", sortSelected);
      }, [sortSelected]);

    return (
        <div className="home-main">
            <Header />
            <div className="home-title">전체</div>
            <Slide products={product_list} />
            <div className="prod-cnt">10개의 상품</div>
            <SortButton setSortSelected={setSortSelected}/>
            <ItemListTable products={product_list} />
        </div>
    );
};

export default Home;