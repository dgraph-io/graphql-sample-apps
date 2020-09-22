import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import { buildSchema } from './schema';
import * as typeDefs from "./dgraph/dgraph.graphql";
import { buildFederatedSchema } from "@apollo/federation";
import { HttpLink } from 'apollo-link-http';
import fetch from 'cross-fetch';
import { introspectSchema, makeRemoteExecutableSchema } from "graphql-tools";
import { buildResolvers } from './resolvers';

(async () => {
  const app = express();
  // const link = new HttpLink({ uri: 'http://localhost:8080/graphql', fetch });

  // const schema = await introspectSchema(link);
  //   const executableSchema = makeRemoteExecutableSchema({
  //     schema,
  //     link,
  //   });
  const server = new ApolloServer({
    schema: buildFederatedSchema(await buildSchema()),
  });
  server.applyMiddleware({
    app,
    path: "/graphql"
  })
  const httpServer = createServer(app);
  httpServer.listen(
    { port: 4000 },
    (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:4000/graphql`));
})();
