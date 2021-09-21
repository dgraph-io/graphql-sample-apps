import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import App from "../App";

const ApolloWrapper = () => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [xAuthToken, setXAuthToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getIdTokenClaims() : "";
      setXAuthToken(token);
    };
    getToken();
  }, [getIdTokenClaims, isAuthenticated]);

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_BACKEND_ENDPOINT,
  });

  const authLink = setContext((_, { headers, ...rest }) => {
    if (!xAuthToken) return { headers, ...rest };

    return {
      ...rest,
      headers: {
        ...headers,
        "X-Auth-Token": xAuthToken.__raw,
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default ApolloWrapper;
