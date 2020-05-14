import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css'

import { Auth0Provider } from "./react-auth0-spa";
import config from "./config.json";
import history from "./history";

/* A function that routes the user to the right place after login */
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  />,
  document.getElementById("root")
);
