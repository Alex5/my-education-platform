import ReactDOM from 'react-dom';
import App from './App';
import {GeistProvider, CssBaseline} from '@geist-ui/core'
import {BrowserRouter as Router} from "react-router-dom";
import {store} from './redux/store';
import {Provider} from 'react-redux'
import './index.css'


ReactDOM.render(
    <Router>
        <GeistProvider>
            <CssBaseline/>
            <Provider store={store}>
                <App/>
            </Provider>
        </GeistProvider>
    </Router>,
    document.getElementById('root')
);
