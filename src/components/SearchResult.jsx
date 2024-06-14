import React from 'react';
import { Link } from 'react-router-dom';
import "../sass/SearchResult/SearchResult.css";

const SearchResult = ({ result }) => {

    return (
        <div className='search_result'>
            {result.map(product => (
                <Link to={`/product/${product.id}`} className="product_link_text">
                <div className='search_item' key={product.id}>
                    <div className="search_item_img">
                        <img src={product.imageUrl} alt={product.name} />
                    </div>

                    <div className="search_item_desc">
                        <div className="search_item_name">
                            {product.name}
                        </div>
                        <div className="search_item_price">
                            {product.price}$
                        </div>
                    </div>
                </div>
                </Link>
            ))}
            {result.length === 0 && <div>Нічого не знайдено</div>}
        </div>
    );
};

export default SearchResult;