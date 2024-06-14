import React from 'react';
import "../sass/DeleteProduct/DeleteProductCard.css";

const DeleteProductCard = ({ product }) => {
    return (
        <div className="delete_card_item">
            <div className="delete_card_item_img">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="delete_card_item_desc">
                <div className="delete_card_header">{product.name}</div>
                <div className="delete_card_price">{product.price}$</div>
            </div>
        </div>
    );
};

export default DeleteProductCard;
