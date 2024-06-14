import React from 'react';
import "../sass/subscribe_section/subscribe_section.css";

const SubscribeSection = () => {
    return (
        <div className="subscribe_section">
                <div className="container">
                    <div className="divider divider_white"></div>


                    <div className="subscribe_title">
                        Receive news and exclusive offers first!
                    </div>

                    <div className="subscribe_desc">
                        By subscribing to our newsletter, you'll be the first to know about new arrivals, special promotions, and exclusive discounts. Stay updated with the latest trends and never miss out on our limited-time deals!
                    </div>

                    <div className="input_block">

                        <input className="subscribe_input" type="text" />

                        <button className="subscribe_btn">SUBSCRIBE</button>
                    </div>
                </div>
        </div>
    );
};

export default SubscribeSection;