import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { App } from "./App"
import * as serviceWorker from "./serviceWorker"
import "semantic-ui-css/semantic.min.css"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"

const AuthorizedApolloProvider: React.FC = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0()

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SLASH_GRAPHQL_ENDPOINT + "/graphql",
  })

console.log("HERE")

  const authLink = setContext(async (_, { headers }) => {
    if (!isAuthenticated) {
      return { headers }
    }

    const token = await getIdTokenClaims()

    return {
      headers: {
        ...headers,
        Authorization: token ? token.__raw : "",
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

console.log("HERE")
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN ?? "ERR"}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? "ERR"}
    redirectUri={window.location.origin}
  >
    <AuthorizedApolloProvider>
      <App />
    </AuthorizedApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()