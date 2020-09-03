import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.css";
import App from "./components/App";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import { ApolloLink } from "apollo-boost";

const trackMetrics = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    console.log("resop", response);
    return response;
  });
});

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql"
});

const client = new ApolloClient({
  link: trackMetrics.concat(httpLink),
  cache: new InMemoryCache(),
  request: (operation) => {
    operation.setContext({
      fetchOptions: {
        mode: "no-cors",
      },
    });
  },
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});




ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
