import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

const createApolloClient = (token) => {
    const httpLink = createHttpLink({
      uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
      options: {
        reconnect: true,
      },
    });

    const authLink = setContext((_, { headers }) => {
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          "X-Auth0-Token": token,
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
  }

export default createApolloClient;
