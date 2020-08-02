import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    // uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || "https://beneficial-baseball-9463.us-west-2.aws.cloud.dgraph.io/graphql",
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
});

export default client;
