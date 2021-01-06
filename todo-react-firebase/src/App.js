import React, { useContext} from 'react'
import {Router, Switch, Route} from "react-router-dom";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import {AuthContext } from "./Auth";
import TodoApp from "./TodoApp";
import Profile from "./Profile";
import NavBar from "./NavBar";
import history from "./history";
import Login from "./Login";
import SignUp from "./SignUp";
import PrivateRoute from "./PrivateRoute";
import config from "./config.json";
import './App.css';

const createApolloClient = token => {
  const httpLink = createHttpLink({
    uri: config.graphqlUrl,
    options: {
      reconnect: true,
    },
  });

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        "X-Auth-Token": token,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}

const App = ({idToken}) => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(idToken)
  const client = createApolloClient(idToken);
  return (
    <ApolloProvider client={client}>
      <div>
        <Router history={history}>
        <header className="navheader">
          <NavBar/>
        </header>
        <Switch>
        <PrivateRoute path="/" component= {TodoApp} exact />
        <PrivateRoute path="/profile" component={Profile} exact/>
        <Route exact path="/login" component = {Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
      </Router>
    </div>
    </ApolloProvider>
  );
}

export default App
