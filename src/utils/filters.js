export const filterAndSortProducts = (products, selectedCategory, selectedBrand, selectedType, priceRange, sortOrder) => {
    const filteredProducts = products.filter(product => {
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesBrand = !selectedBrand || product.brand === selectedBrand;
        const matchesType = !selectedType || product.type === selectedType;
        const matchesPrice = (!priceRange.min || product.price >= priceRange.min) && (!priceRange.max || product.price <= priceRange.max);

        return matchesCategory && matchesBrand && matchesType && matchesPrice;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'price-asc') {
            return a.price - b.price;
        } else if (sortOrder === 'price-desc') {
            return b.price - a.price;
        } else if (sortOrder === 'name-asc') {
            return a.name.localeCompare(b.name);
        } else if (sortOrder === 'name-desc') {
            return b.name.localeCompare(a.name);
        } else {
            return 0;
        }
    });

    return sortedProducts;
};
