import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GeistProvider, CssBaseline} from '@geist-ui/react'
import {BrowserRouter as Router} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {getAuth, Auth} from "firebase/auth";
import firebase from "firebase/compat";

initializeApp({
    apiKey: "AIzaSyDCatacUWWMPhMj2H7r3liwbBEk_Gz9Rmk",
    authDomain: "my-education-platform.firebaseapp.com",
    projectId: "my-education-platform",
    storageBucket: "my-education-platform.appspot.com",
    messagingSenderId: "856755604690",
    appId: "1:856755604690:web:2a661047252ffdd488b10b"
});

export const AuthContext = createContext({} as {auth: Auth});

const auth: Auth = getAuth()

ReactDOM.render(
    <Router>
        <GeistProvider>
            <CssBaseline/>
            <AuthContext.Provider value={{
                auth
            }}>
                <App/>
            </AuthContext.Provider>
        </GeistProvider>
    </Router>,
    document.getElementById('root')
);
