import React from 'react';
import "../sass/homePage/homePage.css";
import LensCategoryImg from "../img/lens_category_img.png";
import CameraCategoryImg from "../img/camera_category_img.png";
import AcсessoriesCategoryImg from "../img/acсessories_category_img.png";
import { HiMiniCheckBadge } from "react-icons/hi2";
import SubscribeSection from "../components/SubscribeSection";
import { useNavigate } from 'react-router-dom';
import { STORE_ROUTE } from '../utils/consts';

const HomePage = () => {
    const navigate = useNavigate();

    const toStore = () => {
        navigate(STORE_ROUTE);
    };

    const handleCategoryClick = (category) => {
        navigate(`${STORE_ROUTE}?category=${category}`);
    };

    return (
        <div>
            <div className="banner_section">
                <div className="container">
                    <div className="banner_section_content">
                        <button className="shop_btn" onClick={() => toStore()}>SHOP NOW</button>
                        <div className="banner_title">Capture Your World: Premium Photography Gear</div>
                        <div className="banner_subtitle">Discover the latest cameras, lenses, and accessories for every photographer</div>
                        <div className="banner_categories">
                            <div className="category_card" onClick={() => handleCategoryClick('Lenses')}>
                                <img className="lens_category_img" src={LensCategoryImg} alt="" />
                                <div className="banner_category_text">
                                    <div>Lenses</div>
                                    <div>Find the perfect lens for any shot, from portraits to landscapes.</div>
                                </div>
                            </div>
                            <div className="category_card" onClick={() => handleCategoryClick('Cameras')}>
                                <img className="camera_category_img" src={CameraCategoryImg} alt="" />
                                <div className="banner_category_text">
                                    <div>Cameras</div>
                                    <div>Choose from a variety of cameras, from beginner to pro.</div>
                                </div>
                            </div>
                            <div className="category_card" onClick={() => handleCategoryClick('Accessories')}>
                                <img className="acсessories_category_img" src={AcсessoriesCategoryImg} alt="" />
                                <div className="banner_category_text">
                                    <div>Accessories</div>
                                    <div>Get essential gear like tripods, bags, and memory cards.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="preference_section">
                <div className="container">
                    <div className="divider divider_black"></div>
                    <div className="preference_list">
                        <div className="preference_item">
                            <HiMiniCheckBadge className="preference_icon"/>
                            <div className="preference_title">Wide Range of Products</div>
                            <div className="preference_desc">Our online store offers a broad selection of products to meet every customer's needs. From electronics to clothing, from accessories to home goods - we have everything you need.</div>
                        </div>
                        <div className="preference_item">
                            <HiMiniCheckBadge className="preference_icon"/>
                            <div className="preference_title">High-Quality Products</div>
                            <div className="preference_desc">We collaborate only with trusted suppliers and manufacturers, ensuring the high quality of each product. Every item undergoes thorough inspection before being shipped to the customer.</div>
                        </div>
                        <div className="preference_item">
                            <HiMiniCheckBadge className="preference_icon"/>
                            <div className="preference_title">Convenient Shopping Process</div>
                            <div className="preference_desc">Our platform is designed for maximum user convenience. Easy registration, quick order processing, and a simple interface - all this creates a pleasant shopping experience.</div>
                        </div>
                        <div className="preference_item">
                            <HiMiniCheckBadge className="preference_icon"/>
                            <div className="preference_title">Fast Delivery</div>
                            <div className="preference_desc">We understand how important it is to receive your order on time. Thanks to our logistics partners, we provide fast and reliable delivery across the country.</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <SubscribeSection/>
        </div>
    );
};

export default HomePage;
