import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './index.css';
import App from './App';
import themes from './theme';
import client from "./apollo-client";

import Auth0ProviderWithHistory from './auth0-provider-with-history';

const theme = createMuiTheme(themes);

ReactDOM.render(
  <Auth0ProviderWithHistory>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </Auth0ProviderWithHistory>,
  document.getElementById('root')
);

