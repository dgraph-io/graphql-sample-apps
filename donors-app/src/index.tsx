import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Client, cacheExchange, fetchExchange, Provider, subscriptionExchange } from 'urql';
// import { createClient as createWSClient, SubscribePayload } from 'graphql-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

/*
const wsClient = ()=>createWSClient({
  url: 'wss://blue-surf-830002.us-east-1.aws.cloud.dgraph.io/graphql',
  connectionParams : {}
});
*/
const subscriptionClient = new SubscriptionClient('wss://green-bird.us-east-1.aws.cloud.dgraph.io/graphql', { reconnect: true });


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const client = new Client({
 // url: 'https://green-bird.us-east-1.aws.cloud.dgraph.io/graphql',
  url: 'https://green-bird.us-east-1.aws.cloud.dgraph.io/graphql',
  exchanges: [
    cacheExchange, 
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: request => subscriptionClient.request(request),
      /*
      forwardSubscription(operation) {
        //const input = { ...request, query: request.query || '' };
        
        return {
          subscribe(sink) {
            const unsubscribe = wsClient().subscribe(operation as SubscribePayload, sink);
              return { unsubscribe };
         },
       };
     },
     */
   })
]
});

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
