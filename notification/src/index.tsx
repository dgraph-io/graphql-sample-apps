import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Client, cacheExchange, fetchExchange, Provider, subscriptionExchange } from 'urql';

if (!process.env.REACT_APP_DGRAPH_ENDPOINT) {
  throw new Error("Missing Dgraph Endpoint")
}

const client = new Client({
  url: process.env.REACT_APP_DGRAPH_ENDPOINT,
  exchanges: [
    cacheExchange,
    fetchExchange
   ]
 })
 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider value={client}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
