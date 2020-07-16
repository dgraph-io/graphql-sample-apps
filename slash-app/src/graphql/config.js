import ApolloClient from 'apollo-boost';

import config from "../config";

const client = new ApolloClient({
    uri: config.dgraph_server_url,
    headers: { Authorization: config.token }

});

export default client;