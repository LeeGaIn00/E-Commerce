import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// service
import ShopService from '../service/ShopService';

// components
import SortButton from "../components/SortButton";
import ItemListTable from "../components/ItemListTable";

// styels
import '../assets/scss/listpage.scss';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const [products, setProducts] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [sortSelected, setSortSelected] = useState('신상품순');

    useEffect(() => {
        let encodedKeyword = encodeURIComponent(keyword);
        ShopService.search(encodedKeyword).then(res => {
            setProducts(res.data);
            res.data.length ? setIsEmpty(false) : setIsEmpty(true);
        });
    }, [keyword]);

    useEffect(() => {
        console.log("sort 변경 => ", sortSelected);
    }, [sortSelected]);

    return (
        isEmpty ? 
        <div>
            <div className="search-title"><em>'{keyword}'</em>에 대한 검색결과</div>
            <div className="no-res">검색 결과가 없습니다. 검색어를 변경해 보세요.</div>
        </div>
        :
        <div>
            <div className="search-title"><em>'{keyword}'</em>에 대한 검색결과</div>
            <div className="prod-cnt">{products.length}개의 상품</div>
            <SortButton setSortSelected={setSortSelected}/>
            <ItemListTable products={products} />
        </div>
    );
};

export default SearchPage;