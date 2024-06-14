import React from 'react';
import "../sass/Footer/footer.css"
import whiteLogo from "../img/logo_white.png"
import { useNavigate } from 'react-router-dom';
import { STORE_ROUTE } from '../utils/consts';

const footer = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`${STORE_ROUTE}?category=${category}`);
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer_wrapper">
                <div className="divider"></div>

                    <div className="footer_content">
                    
                    <div className="footer_contacts_list">
                            <div className="footer_contacts_list_header">CONTACTS</div>
                        
                            <div className="footer_contacts_list_item">
                                <div className="footer_marker"></div>
                                <div className="footer_text">Phone: +380 123 456 789</div>
                            </div>

                            <div className="footer_contacts_list_item"> 
                                <div className="footer_marker"></div>
                                <div className="footer_text">Email: support@ourstore.ua</div>
                            </div>
                    </div>
                    
                    <div className="footer_logo">
                        <img src={whiteLogo} alt=""/>
                    </div>

                    <div className="footer_shop_links">
                            <div className="footer_shop_links_header">SHOP</div>
                        
                            <div className="footer_shop_links_item">
                                <div className="footer_text" onClick={() => handleCategoryClick('Lenses')}>Lenses</div>
                                <div className="footer_marker"></div>
                            </div>

                            <div className="footer_shop_links_item">
                                <div className="footer_text" onClick={() => handleCategoryClick('Cameras')}>Cameras</div>
                                <div className="footer_marker"></div>
                            </div>

                            <div className="footer_shop_links_item">
                                <div className="footer_text" onClick={() => handleCategoryClick('Accessories')}>Accessories</div>
                                <div className="footer_marker"></div>
                            </div>
                    </div>
                    </div>

                    <div className="footer_copyright">
                    © 2024 Our Online Store
                    </div>
                </div>
            </div>
        </footer>
        
    );
};

export default footer;