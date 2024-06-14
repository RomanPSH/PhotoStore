import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../index';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import "../sass/DeleteProduct/DeleteProduct.css";
import DeleteProductCard from './DeleteProductCard';
import SearchAdmin from './SearchAdmin';


const DeleteProduct = () => {
    const { db } = useContext(Context);
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            const productsCol = collection(db, 'products');
            const productSnapshot = await getDocs(productsCol);
            const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productList);
        };

        loadProducts();
    }, [db]);

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleDeleteProduct = async () => {
        if (selectedProduct) {
            await deleteDoc(doc(db, 'products', selectedProduct.id));
            setSuccessMessage('Product deleted successfully!');
            setSelectedProduct(null);
            const productsCol = collection(db, 'products');
            const productSnapshot = await getDocs(productsCol);
            const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productList);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="delete_page_body">
                <div className="delete_list_side_wrapper">
                <SearchAdmin searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    <div className="delete_list_side">
                    {filteredProducts.map(product => (
                            <div key={product.id} onClick={() => handleSelectProduct(product)}>
                                <DeleteProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="right_side">
                    {selectedProduct && (
                        <div className="delete_info">
                            <div className="delete_info_img">
                                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
                            </div>
                            <div className="delete_info_desc">
                                <div className="delete_info_desc_item">
                                    <div className="delete_info_name">Name:</div>
                                    <div className="delete_item_desc">{selectedProduct.name}</div>
                                </div>
                                <div className="delete_info_desc_item">
                                    <div className="delete_info_name">Brand:</div>
                                    <div className="delete_item_desc">{selectedProduct.brand}</div>
                                </div>
                                <div className="delete_info_desc_item">
                                    <div className="delete_info_name">Category:</div>
                                    <div className="delete_item_desc">{selectedProduct.category}</div>
                                </div>
                                <div className="delete_info_desc_item">
                                    <div className="delete_info_name">Type:</div>
                                    <div className="delete_item_desc">{selectedProduct.type}</div>
                                </div>
                                <div className="delete_info_desc_item">
                                    <div className="delete_info_name">Price:</div>
                                    <div className="delete_item_desc">{selectedProduct.price}$</div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="delete_btn_wrapper">
                        <button className='delete_btn' onClick={handleDeleteProduct}>Delete</button>
                    </div>
                    {successMessage && <div className="success">{successMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default DeleteProduct;
