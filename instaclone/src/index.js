import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
/* import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"; */
import { Auth0Provider } from "@auth0/auth0-react";

/* const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_ENDPOINT,
  cache: new InMemoryCache(),
}); */

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);
