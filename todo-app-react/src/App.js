import React from 'react'
import { Router, Switch } from "react-router-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { useAuth0 } from "./react-auth0-spa";
import { setContext } from "apollo-link-context";
import { getSlashGraphQLEndpoint } from './slash_endpoint'
import AuthToken from "./AuthToken";
import TodoApp from './TodoApp';
import NavBar from "./NavBar";
import Profile from "./Profile";
import history from "./history";
import PrivateRoute from "./PrivateRoute";
import './App.css';
import QueryStore from './QueryStore';

const createApolloClient = token => {
  const httpLink = createHttpLink({
    uri: getSlashGraphQLEndpoint(),
    options: {
      reconnect: true,
    },
  });

  const authLink = setContext((request, { headers }) => {
    QueryStore.setQuery(request.query.loc.source.body);

    // return the header to the context so httpLink can read them
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

const App = ({ idToken }) => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  const client = createApolloClient(idToken);

  return (
    <ApolloProvider client={client}>
      <div class="todoapp">
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

      <AuthToken token={idToken} />
    </ApolloProvider>
  );
}

export default App;
