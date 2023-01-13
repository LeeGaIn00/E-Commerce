import React from 'react';
// import { Container, Row, Col } from 'reactstrap';

// components
import Item from "../components/Item";

// styles
import '../assets/scss/itemlisttable.scss';

function ItemListTable(props) {
    return (
        <div>
            <ul className="item-list-tb">
                {props.products.map(product =>
                    <li key={product.id}>
                        <Item product={product} />
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ItemListTable;