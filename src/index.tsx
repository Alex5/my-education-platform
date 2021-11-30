import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GeistProvider, CssBaseline} from '@geist-ui/react'
import {BrowserRouter as Router} from "react-router-dom";
import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, Auth} from "firebase/auth";
import { store } from './redux/store';
import { Provider } from 'react-redux'
import { getAnalytics } from "firebase/analytics";
import './index.css'

const auth: Auth = getAuth();
export const AuthContext = createContext({} as {auth: Auth});

ReactDOM.render(
    <Router>
        <GeistProvider>
            <CssBaseline/>
            <AuthContext.Provider value={{auth}}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </AuthContext.Provider>
        </GeistProvider>
    </Router>,
    document.getElementById('root')
);
