import React from 'react';
import "../sass/Filters/Filters.css";
import { HiChevronDown } from "react-icons/hi2";

const Filters = ({ 
    categories = [], 
    brands = [], 
    types = [], 
    selectedCategory, 
    selectedBrand, 
    selectedType, 
    sortOrder,
    priceRange = { min: '', max: '' },
    onCategoryChange, 
    onBrandChange, 
    onTypeChange,
    onSortOrderChange,
    onPriceRangeChange 
}) => {
    return (
        <div className="filters">
            <div className="container">
                <div className="filters_content">
                    <div className="filters_content_item">
                        <div className="filters_content_name">
                            Категорія
                        </div>
                        <div className="filters_content_choice">
                            <select className="custom-select" value={selectedCategory} onChange={onCategoryChange}>
                                <option value="">Всі</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <HiChevronDown className="filters_content_icon"/>
                        </div>
                    </div>
                    <div className="filters_content_item">
                        <div className="filters_content_name">
                            Бренд
                        </div>
                        <div className="filters_content_choice">
                            <select className="custom-select" value={selectedBrand} onChange={onBrandChange}>
                                <option value="">Всі</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.name}>{brand.name}</option>
                                ))}
                            </select>
                            <HiChevronDown className="filters_content_icon"/>
                        </div>
                    </div>
                    <div className="filters_content_item">
                        <div className="filters_content_name">
                            Тип
                        </div>
                        <div className="filters_content_choice">
                            <select className="custom-select" value={selectedType} onChange={onTypeChange}>
                                <option value="">Всі</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.name}>{type.name}</option>
                                ))}
                            </select>
                            <HiChevronDown className="filters_content_icon"/>
                        </div>
                    </div>
                    <div className="filters_content_item">
                        <div className="filters_content_name">
                            Сортування
                        </div>
                        <div className="filters_content_choice">
                            <select className="custom-select" value={sortOrder} onChange={onSortOrderChange}>
                                <option value="">Всі</option>
                                <option value="price-asc">Ціна: за зростанням</option>
                                <option value="price-desc">Ціна: за спаданням</option>
                                <option value="name-asc">Назва: за зростанням</option>
                                <option value="name-desc">Назва: за спаданням</option>
                            </select>
                            <HiChevronDown className="filters_content_icon"/>
                        </div>
                    </div>
                    <div className="filters_content_item">
                        <div className="filters_content_name">
                            Ціна
                        </div>
                        <div className="filters_content_choice">
                            <div className="price_input">
                                <input 
                                    type="number" 
                                    name="min" 
                                    value={priceRange.min} 
                                    placeholder="Від" 
                                    onChange={onPriceRangeChange} 
                                />
                                <input 
                                    type="number" 
                                    name="max" 
                                    value={priceRange.max} 
                                    placeholder="До" 
                                    onChange={onPriceRangeChange} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
