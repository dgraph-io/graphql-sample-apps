import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./config"

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || config["REACT_APP_AUTH0_DOMAIN"];
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || config["REACT_APP_AUTH0_CLIENT_ID"];

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;