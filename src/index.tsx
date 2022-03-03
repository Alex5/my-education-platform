import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {store} from './redux/store';
import {Provider} from 'react-redux'
import './index.css'

import {RecoilRoot} from 'recoil';
import {Suspense} from 'react';
import AppLoader from "./components/shared/AppLoader";

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <RecoilRoot>
                <App/>
            </RecoilRoot>
        </Provider>
    </Router>,
    document.getElementById('root')
);
