import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import "../sass/Cart/Cart.css";
import CartProductItem from '../components/CartProductItem';

const Cart = () => {
    const { auth, db } = useContext(Context);
    const [user] = useAuthState(auth);
    const [CartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            if (user) {
                const querySnapshot = await getDocs(collection(db, `Cart ${user.uid}`));
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCartItems(items);
            }
        };

        fetchCartItems();
    }, [user, db]);

    const handleDeleteItem = async (itemId) => {
        await deleteDoc(doc(db, `Cart ${user.uid}`, itemId));
        setCartItems(CartItems.filter(item => item.id !== itemId));
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        const itemRef = doc(db, `Cart ${user.uid}`, itemId);
        const item = CartItems.find(item => item.id === itemId);
        const updatedItem = { ...item, qty: newQuantity, TotalProductPrice: newQuantity * item.price };
        await updateDoc(itemRef, updatedItem);
        setCartItems(CartItems.map(item => item.id === itemId ? updatedItem : item));
    };

    const totalPrice = CartItems.reduce((total, item) => total + item.TotalProductPrice, 0);

    const handleContinueShopping = () => {
        navigate('/store');
    };

    return (
        <div className="container">
            <div className="cart_page">
                <div className="cart_page_wrapper">
                    <div className="cart_body">
                        <div className="cart_list_side_wrapper">
                            <div className="cart_list_side">
                                {CartItems.map(item => (
                                    <CartProductItem 
                                        key={item.id} 
                                        item={item} 
                                        onDelete={() => handleDeleteItem(item.id)}
                                        onUpdateQuantity={handleUpdateQuantity}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="price_side">
                            <div className="price">
                                <div className="total_price_header">TOTAL PRICE:</div>
                                <div className="total_price">{totalPrice.toFixed(2)}$</div>
                            </div>
                            <button className="toOrder_btn">To order</button>
                        </div>
                    </div>
                    <button className="shopping_btn" onClick={handleContinueShopping}>continue shopping</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
