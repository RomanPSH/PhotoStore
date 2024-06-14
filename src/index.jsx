import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import "./sass/style.css";
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

firebase.initializeApp({
  apiKey: "AIzaSyDYvuWKPlxmEN80aWdbOZ7A-iWHw9PDmMs",
  authDomain: "photostore-5aca9.firebaseapp.com",
  projectId: "photostore-5aca9",
  storageBucket: "photostore-5aca9.appspot.com",
  messagingSenderId: "197609295030",
  appId: "1:197609295030:web:d7f73d543cf1e0c37eea17"
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();
const db = getFirestore();
const storage = getStorage();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ firebase, auth, firestore, db, storage }}>
    <App />
  </Context.Provider>
);
