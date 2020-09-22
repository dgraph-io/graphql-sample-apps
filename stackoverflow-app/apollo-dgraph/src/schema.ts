import 'graphql-import-node';
import * as typeDefs from './schema/schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { buildResolvers } from './resolvers';
import { GraphQLSchema } from 'graphql';

export async function buildSchema() {
  return [{
      typeDefs,
      resolvers: await buildResolvers(),
    }];
}
