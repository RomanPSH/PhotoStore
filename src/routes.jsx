import { Component } from "react";
import { LOGIN_ROUTE, PROFILE_ROUTE, HOME_ROUTE, STORE_ROUTE, PRODUCTPAGE_ROUTE, CART_ROUTE, ADMIN_ROUTE} from "./utils/consts";
import Login from "./components/Login";
import Profile from "./pages/profile";
import HomePage from "./pages/homePage";
import ShopPage from "./pages/shopPage";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import AdminPage from "./pages/AdminPage";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: HOME_ROUTE,
        Component: HomePage
    },
    {
        path: STORE_ROUTE,
        Component: ShopPage
    },
    {
        path: PRODUCTPAGE_ROUTE,
        Component: ProductPage
    }
]

export const privateRoutes = [
    {
        path: HOME_ROUTE,
        Component: HomePage
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: STORE_ROUTE,
        Component: ShopPage
    },
    {
        path: PRODUCTPAGE_ROUTE,
        Component: ProductPage
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    }
]