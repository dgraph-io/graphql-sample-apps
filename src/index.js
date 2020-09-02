import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './index.css';
import App from './App';
import themes from './theme';

import Auth0ProviderWithHistory from './auth0-provider-with-history';

const theme = createMuiTheme(themes);

ReactDOM.render(
  <Auth0ProviderWithHistory>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </Auth0ProviderWithHistory>,
  document.getElementById('root')
);

