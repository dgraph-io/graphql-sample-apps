import ApolloClient from 'apollo-boost';

import config from "../config";

const client = new ApolloClient({
    uri: config.backend_url
});

export default client;