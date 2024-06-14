import React, { useContext } from "react";
import "./sass/App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SocialIcons from "./components/SocialIcons";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./AppRouter";
import Loader from "./components/Loader";
import { useAuthState } from "react-firebase-hooks/auth"
import { Context } from "./index";

const App = () => {

  const location = useLocation();
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);
  
  if (loading) {
    return <Loader/>
  }

  return (
    <>
      <Navbar />
      <SocialIcons/>
      <AppRoutes />
      {location.pathname !== "/login" && <Footer />}
    </>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;