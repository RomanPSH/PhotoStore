import React, { useContext } from "react";
import "../sass/Login/Login.css";
import { Context } from "../index";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { auth } = useContext(Context);
  const navigate = useNavigate();

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const { user } = await auth.signInWithPopup(provider);
      console.log(user);
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.error("The popup has been closed by the user before finalizing the operation.");
      } else {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="login">
        <div className="login_content">
          <button onClick={login} className="login_btn">Login with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
