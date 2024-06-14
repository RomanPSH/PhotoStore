import React from 'react';
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import "../sass/Cart/CartProductItem.css";

const CartProductItem = ({ item, onDelete, onUpdateQuantity }) => {
    
    const handleDecrement = () => {
        if (item.qty > 1) {
            onUpdateQuantity(item.id, item.qty - 1);
        }
    };

    const handleIncrement = () => {
        onUpdateQuantity(item.id, item.qty + 1);
    };

    return (
        <div className="cart_item">
            <div className="cart_item_img">
                <img src={item.imageUrl} alt="" />
            </div>
            <div className="cart_item_desc">
                <div className="header_and_delete">
                    <div className="cart_item_desc_header">{item.name}</div>
                    <HiOutlineArchiveBoxXMark className="delete_btn" onClick={onDelete} />
                </div>
                <div className="cart_item_desc_price">
                    <div className="amount_btns">
                        <div className="amount_btn" onClick={handleDecrement}>-</div>
                        <input type="text" value={item.qty} readOnly className="cart_input" />
                        <div className="amount_btn" onClick={handleIncrement}>+</div>
                    </div>
                    <div className="item_total_price">{item.TotalProductPrice.toFixed(2)}$</div>
                </div>
            </div>
        </div>
    );
};

export default CartProductItem;
