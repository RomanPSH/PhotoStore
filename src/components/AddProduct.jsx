import React, { useState, useContext } from 'react';
import { Context } from '../index';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "../sass/AddProduct/AddProduct.css";

const AddProduct = () => {
    const { db, storage } = useContext(Context);
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        price: '',
        type: '',
        category: '',
        description: '',
        imageUrl: ''
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevState => ({
            ...prevState,
            [name]: ''
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!product.name) newErrors.name = 'Name is required';
        if (!product.brand) newErrors.brand = 'Brand is required';
        if (!product.price || isNaN(product.price)) newErrors.price = 'Valid price is required';
        if (!product.type) newErrors.type = 'Type is required';
        if (!product.category) newErrors.category = 'Category is required';
        if (!product.description) newErrors.description = 'Description is required';
        if (!image) newErrors.image = 'Image is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            let imageUrl = '';
            if (image) {
                const storageRef = ref(storage, `${product.category}/${image.name}`);
                await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
            }

            const newProduct = { 
                ...product, 
                price: parseFloat(product.price), 
                imageUrl,
                specifications: {},
                rating: (Math.random() * 4 + 1).toFixed(1) // Generates a random rating between 1 and 5
            };
            await addDoc(collection(db, "products"), newProduct);

            await updateBrandAndTypeCollections(newProduct);

            setSuccessMessage("Product added successfully!");
            setProduct({
                name: '',
                brand: '',
                price: '',
                type: '',
                category: '',
                description: '',
                imageUrl: ''
            });
            setImage(null);
            setImagePreview('');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const updateBrandAndTypeCollections = async (product) => {
        const brandDocRef = doc(db, `${product.category} brands`, product.brand);
        const brandDoc = await getDoc(brandDocRef);

        if (!brandDoc.exists()) {
            await setDoc(brandDocRef, { name: product.brand });
        }

        const typeDocRef = doc(db, `${product.category} types`, product.type);
        const typeDoc = await getDoc(typeDocRef);

        if (!typeDoc.exists()) {
            await setDoc(typeDocRef, { name: product.type });
        }
    };

    return (
        <div className="add_product_body">
            <div className="add_product_form">
                <div className="add_product_header">New product</div>
                <form onSubmit={handleSubmit} className="add_form_wrapper">
                    <div className="input_group">
                        <div className="input_header">Name</div>
                        <input type="text" name="name" value={product.name} onChange={handleChange} />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>

                    <div className="input_group">
                        <div className="input_header">Brand</div>
                        <input type="text" name="brand" value={product.brand} onChange={handleChange} />
                        {errors.brand && <div className="error">{errors.brand}</div>}
                    </div>

                    <div className="input_group">
                        <div className="input_header">Price, $</div>
                        <input type="text" name="price" value={product.price} onChange={handleChange} />
                        {errors.price && <div className="error">{errors.price}</div>}
                    </div>

                    <div className="input_group">
                        <div className="input_header">Type</div>
                        <input type="text" name="type" value={product.type} onChange={handleChange} />
                        {errors.type && <div className="error">{errors.type}</div>}
                    </div>

                    <div className="input_group">
                        <div className="input_header">Category</div>
                        <input type="text" name="category" value={product.category} onChange={handleChange} />
                        {errors.category && <div className="error">{errors.category}</div>}
                    </div>

                    <div className="input_group">
                        <div className="input_header">Description</div>
                        <textarea name="description" value={product.description} onChange={handleChange} />
                        {errors.description && <div className="error">{errors.description}</div>}
                    </div>

                    <div className="upload_btn_wrapper">
                        <input type="file" onChange={handleImageChange} />
                        {errors.image && <div className="error">{errors.image}</div>}
                    </div>

                    <button className='add_product_btn'>Add</button>
                </form>
                {successMessage && <div className="success">{successMessage}</div>}
            </div>

            <div className="info_side">
                {imagePreview && <div className="info_side_img">
                    <img src={imagePreview} alt="Product Preview" />
                </div>}
                <div className="product_info">
                    <div className="product_info_item">
                        <div className="info_item_name">Name</div>
                        <div className="info_item_desc">{product.name}</div>
                    </div>
                    <div className="product_info_item">
                        <div className="info_item_name">Brand</div>
                        <div className="info_item_desc">{product.brand}</div>
                    </div>
                    <div className="product_info_item">
                        <div className="info_item_name">Type</div>
                        <div className="info_item_desc">{product.type}</div>
                    </div>
                    <div className="product_info_item">
                        <div className="info_item_name">Category</div>
                        <div className="info_item_desc">{product.category}</div>
                    </div>
                    <div className="product_info_item">
                        <div className="info_item_name">Description</div>
                        <div className="info_item_desc">{product.description}</div>
                    </div>
                    <div className="product_info_item">
                        <div className="info_item_name">Price</div>
                        <div className="info_item_desc">${product.price}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;