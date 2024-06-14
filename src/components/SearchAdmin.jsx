import React from 'react';
import "../sass/SearchAdmin/SearchAdmin.css";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";

const SearchAdmin = ({ searchTerm, setSearchTerm }) => {
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search_form_block">
            <input
                className="search_form"
                type="text"
                placeholder='search...'
                value={searchTerm}
                onChange={handleChange}
            />
            <HiMagnifyingGlassCircle className="search_icon"/>
        </div>
    );
};

export default SearchAdmin;