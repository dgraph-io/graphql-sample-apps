import {
  makeRemoteExecutableSchema,
  introspectSchema,
  mergeSchemas,
} from "graphql-tools";
import { HttpLink } from "apollo-link-http";
import { ApolloServer } from "apollo-server";
import fetch from "node-fetch";

// Apollo link with the uri of GraphQL API
const link = new HttpLink({
  uri: "http://localhost:8080/graphql",
  fetch,
});

const createRemoteExecutableSchema = async () => {
  const remoteSchema = await introspectSchema(link);
  const remoteExecutableSchema = makeRemoteExecutableSchema({
    schema: remoteSchema,
    link,
  });
  return remoteExecutableSchema;
};

const customValidation = () => {
  const date = new Date();
  const currentHour = date.getHours();
  return currentHour >= 17;
};

const createNewSchema = async () => {
  const schema = await createRemoteExecutableSchema();

  const customResolvers = {
    Query: {
      game: (root, args, context, info) => {
        const validation = customValidation();
        if (!validation) {
          return [];
        } else {
          return info.mergeInfo.delegateToSchema({
            schema,
            operation: "query",
            fieldName: "game",
            args,
            context,
            info,
          });
        }
      },
    },
  };

  return mergeSchemas({
    schemas: [schema],
    resolvers: customResolvers,
  });
};

const runServer = async () => {
  const schema = await createNewSchema();
  const server = new ApolloServer({
    schema,
  });
  server.listen().then(({ url }) => {
    console.log(`Running at ${url}`);
  });
};

try {
  runServer();
} catch (err) {
  console.error(err);
}
