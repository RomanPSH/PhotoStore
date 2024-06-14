import React, { useEffect, useState, useContext } from 'react';
import "../sass/Search/Search.css";
import { Context } from '../index';
import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { collection, getDocs } from 'firebase/firestore';
import SearchResult from './SearchResult';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const { db } = useContext(Context);
    const [value, setValue] = useState('');
    const [products, setProducts] = useState([]);
    const [result, setResult] = useState([]);
    const location = useLocation();

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsData);
            console.log("products" + productsData);
            setResult(productsData.filter(product => product.name.toLowerCase().includes(value.toLowerCase())));
            console.log("result" + result);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect( () => {
        if(value.length > 0) {
            fetchProducts()
        } else {
            setResult([]);
        }
    }, [value])

    const isShopPage = location.pathname === '/store';

    return (
        <>
            <div className="search_form_block">
                <input
                className="search_form"
                type="text"
                placeholder='search...'
                onChange={(e) => setValue(e.target.value)}
                value={value}
                />
                <HiMagnifyingGlassCircle className="search_icon"/>
            </div>
    
            {isShopPage && value.length > 0 && <SearchResult result={result} />}
        </>
    );
    
};

export default Search;
