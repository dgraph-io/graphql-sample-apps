import React from 'react'

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";

import './App.css';

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: "http://localhost:8080/graphql",
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
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
        />
      </div>
    </ApolloProvider>
  );
}

export default App
