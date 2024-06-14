import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../sass/ProductCard/ProductCard.css";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { HiOutlineStar } from "react-icons/hi2";

const ProductCard = ({ product, addToCart, isAdded }) => {
    const [added, setAdded] = useState(isAdded);

    useEffect(() => {
        setAdded(isAdded);
    }, [isAdded]);

    const handleAddToCart = () => {
        addToCart(product);
    }

    return (
        <div className="product_item">
            <Link to={`/product/${product.id}`} className="product_link_photo">
                <div className="product_item_img">
                    <img src={product.imageUrl || 'default_image_url.png'} alt={product.name} />
                </div>
            </Link>

            <div className="product_item_desc">
                <Link to={`/product/${product.id}`} className="product_link_text">
                    <div className="product_item_name">
                        {product.name}
                    </div>
                </Link>

                <div className="product_item_rating">
                    {Array.from({ length: 5 }, (_, index) => (
                        <HiOutlineStar className="star" key={index} style={{ color: index < product.rating ? 'gold' : 'gray' }} />
                    ))}
                </div>

                <div className="product_item_availability">
                    Available
                </div>

                <div className="product_item_cost_and_buy">
                    <div className="product_item_cost">
                        ${product.price.toFixed(2)}
                    </div>

                    <div 
                        className={`product_basket_icon ${added ? 'added' : ''}`} 
                        onClick={handleAddToCart}
                        disabled={added}
                    >
                        <HiMiniShoppingBag />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
