import React from 'react';
import "../sass/SocialIcons/SocialIcons.css";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa6";

const SocialIcons = () => {
  
    return (
        <div className="social_icons">
           <div className="social_icons_item">
                <FaFacebookF/>
           </div>
           <div className="social_icons_item">
                <IoLogoTwitter/>
           </div>
           <div className="social_icons_item">
                <IoLogoInstagram/>
           </div>

        </div>
    );
};

export default SocialIcons;
