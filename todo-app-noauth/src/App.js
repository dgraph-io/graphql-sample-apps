import React from 'react'

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";

import TodoApp from "./TodoApp";
import './App.css';

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    options: {
      reconnect: true,
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });
}

const App = () => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>todos</h1>
        <TodoApp />
    </div>
    </ApolloProvider>
  );
}

export default App
