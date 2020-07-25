import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './index.css';
import App from './App';
import themes from './theme';
import client from "./apollo-client";

import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme(themes);

ReactDOM.render(
   <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
