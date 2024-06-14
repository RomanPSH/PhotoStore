import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setDoc, doc, getDocs, collection } from 'firebase/firestore';
import "../sass/ProductList/ProductList.css"
import ProductCard from './ProductCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import Filters from './Filters';
import { fetchFiltersData, fetchProductsData, fetchCartItemsData } from '../utils/fetchData';
import { filterAndSortProducts } from '../utils/filters';

const ProductList = () => {
    const { auth, db } = useContext(Context);
    const [user] = useAuthState(auth);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 8;

    useEffect(() => {
        const initializeData = async () => {
            const { categories, brands, types } = await fetchFiltersData(db);
            setCategories(categories);
            setBrands(brands);
            setTypes(types);

            const productsData = await fetchProductsData(db);
            setProducts(productsData);

            const cartItemsData = await fetchCartItemsData(db, user);
            setCartItems(cartItemsData);
        };

        initializeData();
    }, [db, user]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        if (category) {
            setSelectedCategory(category);
        }
    }, [location]);

    const addToCart = async (product) => {
        const uid = auth.currentUser.uid;
        if (uid) {
            product['qty'] = 1;
            product['TotalProductPrice'] = product.qty * product.price;

            try {
                await setDoc(doc(db, 'Cart ' + uid, product.id), product);
                console.log('Successfully added to cart');
                setCartItems([...cartItems, product]);
            } catch (error) {
                console.error('Error adding to cart:', error);
}
} else {
navigate(LOGIN_ROUTE);
}
};
const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    try {
        if (category) {
            const brandsSnapshot = await getDocs(collection(db, `${category} brands`));
            const typesSnapshot = await getDocs(collection(db, `${category} types`));

            setBrands(brandsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setTypes(typesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
            const brandsSnapshot = await getDocs(collection(db, "Cameras brands"));
            const typesSnapshot = await getDocs(collection(db, "Cameras types"));

            setBrands(brandsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setTypes(typesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
    } catch (error) {
        console.error('Error fetching brands and types:', error);
    }
};

const handleBrandChange = async (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);

    try {
        if (selectedCategory && brand) {
            const typesSnapshot = await getDocs(collection(db, `${selectedCategory} types`));
            setTypes(typesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
            const typesSnapshot = await getDocs(collection(db, "Cameras types"));
            setTypes(typesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
    } catch (error) {
        console.error('Error fetching types:', error);
    }
};

const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
};

const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
};

const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
        ...prev,
        [name]: value
    }));
};

const sortedProducts = filterAndSortProducts(products, selectedCategory, selectedBrand, selectedType, priceRange, sortOrder);

const loadMoreProducts = () => {
    setCurrentPage(prevPage => prevPage + 1);
};

return (
    <>
        <Filters
            categories={categories}
            brands={brands}
            types={types}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            selectedType={selectedType}
            sortOrder={sortOrder}
            priceRange={priceRange}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onTypeChange={handleTypeChange}
            onSortOrderChange={handleSortOrderChange}
            onPriceRangeChange={handlePriceRangeChange}
        />
        <div className="container">
            <div className="products">
                {sortedProducts.length > 0 ? (
                    sortedProducts.slice(0, currentPage * PRODUCTS_PER_PAGE).map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            addToCart={addToCart} 
                            isAdded={cartItems.some(item => item.id === product.id)}
                        />
                    ))
                ) : (
                    <div className='lack_of_products'>There are no products to display</div>
                )}
            </div>
            {sortedProducts.length > currentPage * PRODUCTS_PER_PAGE && (
                <button onClick={loadMoreProducts} className="load_more_button">
                    Load More
                </button>
            )}
        </div>
    </>
);
};

export default ProductList;