import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import App from "./app.jsx";
import reducer from './store/reducer.jsx';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, composeEnhancers(
        applyMiddleware(thunk)
    ));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        app,
        document.getElementById('app')
    );
});
