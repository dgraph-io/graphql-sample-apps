import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { App } from "./App"
import * as serviceWorker from "./serviceWorker"
import "semantic-ui-css/semantic.min.css"
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client"
import { Auth0Provider } from "@auth0/auth0-react"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || "http://localhost:8080/graphql",
  }),
})

ReactDOM.render(
  <Auth0Provider
    domain="dev-x44cgu-8.auth0.com"
    clientId="f9l2o1N0ocIUNlb62KmQxCJ5QM8WurWI"
    redirectUri={window.location.origin}
  >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
