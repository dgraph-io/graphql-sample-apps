import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";

const url = "funny-money-3574.us-east-1.aws.thegaas.com/graphql";
// const url = "<Slash Graphql endpoint>"

const wsLink = new WebSocketLink({
    uri: `wss://${url}`,
    options: {
        reconnect: true
    }
});

const httpLink = new HttpLink({
    uri: `https://${url}`
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

export default new ApolloClient({
    cache: new InMemoryCache(),
    link
});
