import React from 'react'
import { Router, Switch } from "react-router-dom";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { useAuth0 } from "./react-auth0-spa";

import TodoApp from './TodoApp';
import NavBar from "./NavBar";
import Profile from "./Profile";
import history from "./history";
import PrivateRoute from "./PrivateRoute";
import config from "./config.json";
import './App.css';

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: config.graphqlUrl,
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
  const { loading } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <div>
        <Router history={history}>
          <h1>todos</h1>
          <header className="navheader">
            <NavBar />
          </header>
          <Switch>
            <PrivateRoute path="/" component={TodoApp} exact />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Router>
    </div>
    </ApolloProvider>
  );
}

export default App
