import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../index';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "../sass/UpdateProduct/UpdateProduct.css";
import UpdateProductCard from './UpdateProductCard';
import SearchAdmin from './SearchAdmin';

const UpdateProduct = () => {
    const { db, storage } = useContext(Context);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
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
        setUpdatedProduct(product);
        setSuccessMessage('');
        setImagePreview(product.imageUrl);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    
    const handleUpdateProduct = async () => {
        try {
            let imageUrl = updatedProduct.imageUrl;
            if (image) {
                const storageRef = ref(storage, `${updatedProduct.category}/${image.name}`);
                await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
            }
    
            const productRef = doc(db, 'products', updatedProduct.id);
            await setDoc(productRef, { ...updatedProduct, imageUrl });
    
            setSuccessMessage('Product updated successfully!');
            const productsCol = collection(db, 'products');
            const productSnapshot = await getDocs(productsCol);
            const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productList);
    
            const updatedProductIndex = productList.findIndex(product => product.id === updatedProduct.id);
            setSelectedProduct(productList[updatedProductIndex]);
            setUpdatedProduct(null);
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="update_page_body">
                <div className="update_list_side_wrapper">
                    <SearchAdmin searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <div className="update_list_side">
                        {filteredProducts.map(product => (
                            <div key={product.id} onClick={() => handleSelectProduct(product)}>
                                <UpdateProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="right_side">
                    {selectedProduct && (
                        <div className="updated_info">
                            <div className="updated_info_img">
                                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
                            </div>
                            <div className="updated_info_desc">
                                <div className="updated_info_desc_item">
                                    <div className="updated_info_name">Name:</div>
                                    <div className="updated_item_desc">{selectedProduct.name}</div>
                                </div>
                                <div className="updated_info_desc_item">
                                    <div className="updated_info_name">Brand:</div>
                                    <div className="updated_item_desc">{selectedProduct.brand}</div>
                                </div>
                                <div className="updated_info_desc_item">
                                    <div className="updated_info_name">Category:</div>
                                    <div className="updated_item_desc">{selectedProduct.category}</div>
                                </div>
                                <div className="updated_info_desc_item">
                                    <div className="updated_info_name">Type:</div>
                                    <div className="updated_item_desc">{selectedProduct.type}</div>
                                </div>
                                <div className="updated_info_desc_item">
                                    <div className="updated_info_name">Price:</div>
                                    <div className="updated_item_desc">{selectedProduct.price}$</div>
                                </div>
                            </div>
                        </div>
                        
                    )}
                    {updatedProduct && (
                        <div className="update_info_form">
                            <div className="update_info_form_header">Update product</div>
                            <div className="update_info_form_wrapper">
                                <div className="upload_img">
                                    <div className="img_wrapper"><img src={imagePreview} alt="" /></div>
                                    <input type="file" onChange={handleImageChange} />
                                </div>

                                <div className="update_form">
                                    <div className="update_form_item">
                                        <div className="update_form_name">Name</div>
                                        <input type="text" name="name" value={updatedProduct.name} onChange={handleChange} />
                                    </div>
                                    <div className="update_form_item">
                                        <div className="update_form_name">Brand</div>
                                        <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
                                    </div>
                                    <div className="update_form_item">
                                        <div className="update_form_name">Type</div>
                                        <input type="text" name="type" value={updatedProduct.type} onChange={handleChange} />
                                    </div>
                                    <div className="update_form_item">
                                        <div className="update_form_name">Price, $</div>
                                        <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
                                    </div>
                                    <div className="update_form_item">
                                        <div className="update_form_name">Category</div>
                                        <input type="text" name="category" value={updatedProduct.category} onChange={handleChange} />
                                    </div>

                                    <button className='confirm_update' onClick={handleUpdateProduct}>Confirm changes</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {successMessage && <div className="success">{successMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;