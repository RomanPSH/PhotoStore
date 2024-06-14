import React from 'react';
import "../sass/shopPage/shopPage.css"
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';

const ShopPage = () => {

    return (
        
            <div className="shop_page">
                <div className="shop_page_header">HAPPY SHOPPING!</div>
                <ProductList/>
            </div>
        
    );
};

export default ShopPage;