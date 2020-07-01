import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import Post from './Post';
import apolloClient from './ApolloSetup';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Post />
    </ApolloProvider>
  );
}

export default App;