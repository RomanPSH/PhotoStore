import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import "../sass/ProfileMenu/ProfileMenu.css";
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../utils/consts';

const ProfileMenu = ({ closeMenu }) => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const menuRef = useRef(null);

    const goToAdmin = () => {
        navigate(ADMIN_ROUTE);
        closeMenu(); // Close the menu after navigating
    };

    const handleLogout = () => {
        auth.signOut();
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeMenu]);

    return (
        <div ref={menuRef} className="profile_menu">
            {user ? (
                <>
                    <div className="profile_menu_btn" onClick={goToAdmin}>
                        Admin page
                    </div>
                    <div className="profile_menu_divider"></div>
                    <div className="profile_menu_btn">
                        <div className="log_out_btn" onClick={handleLogout}>Log out</div>
                    </div>
                </> 
            ) : (
                window.location.href = "/login"
            )}
        </div>
    );
};

export default ProfileMenu;
