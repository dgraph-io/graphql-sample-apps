import React from "react";

import QuestionList from "./QuestionList";
import Header from "./Header";
import CreateQuestion from "./CreateQuestion";
import {Router, Switch} from "react-router-dom";
import history from "../utils/history"
import PrivateRoute from "./PrivateRoute"
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";

import { useAuth0 } from "../react-auth0-spa";
import ViewQuestion from "./ViewQuestion";

export default function App() {
  const { loading } = useAuth0();
  
  if (loading) {
    return <div>Loading...</div>;
  }
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

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Router history={history}>
          <Header />
          <Switch>
            <PrivateRoute exact path="/" component={QuestionList} />
            <PrivateRoute exact path="/create" component={CreateQuestion} />
            <PrivateRoute exact path="/view" component={ViewQuestion} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}