import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createClient, Provider} from 'urql';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = createClient({
  url: "https://green-bird.us-east-1.aws.cloud.dgraph.io/graphql"
})
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
