import React from 'react';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import "../sass/UpdateProduct/UpdateProductCard.css";

const UpdateProductCard = ({ product }) => {
    return (
        <div className="update_card_item">
            <div className="update_card_item_img">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="update_card_item_desc">
                <div className="header_and_update">
                    <div className="update_card_desc_header">{product.name}</div>
                    <HiOutlinePencilSquare className="update_btn_icon" />
                </div>
                <div className="update_card_price">{product.price}$</div>
            </div>
        </div>
    );
};

export default UpdateProductCard;
