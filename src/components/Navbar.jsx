import React, { useState, useContext, useRef } from 'react';
import "../sass/Navbar/navbar.css";
import whiteLogo from "../img/logo_white.png";
import { HiShoppingBag, HiUser } from "react-icons/hi2";
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileMenu from './ProfileMenu';
import { useNavigate, useLocation } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, STORE_ROUTE, CART_ROUTE } from "../utils/consts";
import Search from './Search';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const toggleProfileMenu = () => {
        if (user) {
            setShowProfileMenu(!showProfileMenu);
        } else {
            navigate(LOGIN_ROUTE);
        }
    };

    const closeMenu = () => {
        setShowProfileMenu(false);
    };

    const goToCart = () => {
        navigate(CART_ROUTE);
        closeMenu();
    };

    const isStorePage = location.pathname === STORE_ROUTE;

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar_content">
                    <ul className="menu">
                        <li><a href={HOME_ROUTE}>Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href={STORE_ROUTE}>Shop</a></li>
                    </ul>

                    <div className="white_logo">
                        <img src={whiteLogo} alt="Logo" />
                    </div>

                    <div className="right_bar">
                        {isStorePage && (
                            <>
                                <HiShoppingBag className="cart" onClick={goToCart} />
                                <Search />
                            </>
                        )}
                        <div 
                            className={`profile_btn ${isStorePage ? '' : 'not_store'}`} 
                            onClick={toggleProfileMenu}
                        >
                            {user ? (
                               
                                <img src={user.photoURL || defaultProfileImg} className="profile_img" alt="Profile" />
                            ) : (
                                
                                <HiUser className="default_profile_img" />
                            )}
                        </div>

                        {showProfileMenu && <ProfileMenu closeMenu={closeMenu} />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
