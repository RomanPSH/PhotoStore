import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../index';
import { doc, getDoc } from 'firebase/firestore';
import "../sass/ProductPage/ProductPage.css";
import { HiOutlineStar } from "react-icons/hi2";

const ProductPage = () => {
    const { db } = useContext(Context);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", productId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    console.log("No such document!");
                    setError("No such document!");
                }
            } catch (err) {
                console.error("Error fetching document: ", err);
                setError("Error fetching document");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [db, productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>No product found</div>;

    return (
        <div className="container">
            <div className="product_page">
                <div className="product_page_content">
                    <div className="product_img_side">
                        <div className="product_page_img">
                            <img src={product.imageUrl || 'default_image_url.png'} alt={product.name} />
                        </div>
                    </div>

                    <div className="product_info_side">
                        <div className="product_name">
                            {product.name}
                        </div>

                        <div className="cost_rating_availability">
                            <div className="cost_rating">
                                <div className="cost">${product.price.toFixed(2)}</div>
                                <div className="rating">
                                    <div className="rating_stars">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <HiOutlineStar className="star" key={index} style={{ color: index < product.rating ? 'gold' : 'gray' }} />
                                        ))}
                                    </div>
                                    <div className="rating_value">
                                        {product.rating}
                                    </div>
                                </div>
                            </div>
                            <div className="availability">
                                Available
                            </div>
                        </div>

                        <div className="description">
                            {product.description}
                        </div>

                        <div className="properties">
                            <div className="property_header">Properties</div>
                            <div className="properties_list">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div className="property_item" key={key}>
                                        <div className="circle"></div>
                                        <div className="property_text">
                                            {key}: {value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        

                        <button className="purchase_btn">purchase</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;