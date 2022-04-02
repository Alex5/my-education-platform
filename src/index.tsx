import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {store} from './redux/store';
import {Provider} from 'react-redux'
import './index.css'

import {RecoilRoot} from 'recoil';
import { StrictMode } from 'react';
import { MetaMaskProvider } from 'metamask-react';

const container = document.getElementById('root');

if (!container) {
    throw new Error('container not found')
}

const root = createRoot(container);

root.render(
    <StrictMode>
        <Router>
            <MetaMaskProvider>
                <Provider store={store}>
                    <RecoilRoot>
                        <App/>
                    </RecoilRoot>
                </Provider>
            </MetaMaskProvider>
        </Router>
    </StrictMode>,
);
