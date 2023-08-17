
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"
import config from "./auth_template.json"

const GRAPHQL_ENDPOINT = "http://localhost:8080/graphql"

const AuthorizedApolloProvider = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
  })

  const authLink = setContext(async (_, { headers }) => {
    if (!isAuthenticated) {
      return headers;
    }

    const token = await getIdTokenClaims();

    return {
      headers: {
        ...headers,
        "X-Auth-Token": token? token.__raw : "",
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    redirectUri={window.location.origin}
  >
      <AuthorizedApolloProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthorizedApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
)
