import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware} from "redux";
import allReducers from "./reducers";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const middleware = [thunk]

    //const location = localStorage.getItem('location') ? JSON.parse(localStorage.getItem('location')) : []
    //const cartFromLocalStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

    const persistConfig = {
      key: 'root',
      storage,
     // whitelist: ['currentLocation']
    }
    const persistedReducer = persistReducer(persistConfig, allReducers)

  const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware)));

  const persistor = persistStore(store);

  // const store = createStore(
  // allReducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
