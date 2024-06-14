import { collection, getDocs } from 'firebase/firestore';

export const fetchFiltersData = async (db) => {
    try {
        const categoriesSnapshot = await getDocs(collection(db, "Categories"));
        const brandsSnapshot = await getDocs(collection(db, "Cameras brands"));
        const typesSnapshot = await getDocs(collection(db, "Cameras types"));

        const categories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const brands = brandsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const types = typesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { categories, brands, types };
    } catch (error) {
        console.error('Error fetching filters:', error);
        return { categories: [], brands: [], types: [] };
    }
};

export const fetchProductsData = async (db) => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const fetchCartItemsData = async (db, user) => {
    if (user) {
        try {
            const querySnapshot = await getDocs(collection(db, `Cart ${user.uid}`));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error fetching cart items:', error);
            return [];
        }
    }
    return [];
};
