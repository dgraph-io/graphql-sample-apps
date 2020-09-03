import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css'

import TodoApp from './TodoApp'

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({
    uri: "http://localhost:8080/graphql"
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    request: operation => {
      operation.setContext({
        fetchOptions: {
          mode: "no-cors"
        }
      });
    },
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      }
    }
});


ReactDOM.render(
        <ApolloProvider client={client}>
            <TodoApp/>
        </ApolloProvider>,
    document.getElementById('root')
);
