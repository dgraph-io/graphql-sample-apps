import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || "https://beneficial-baseball-9463.us-west-2.aws.cloud.dgraph.io/graphql"
});

export default client;
