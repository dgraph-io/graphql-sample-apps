import { QueryResolvers } from '../types/gql';
import { GraphQLSchema } from 'graphql';
import { delegateToSchema } from 'graphql-tools';

export function buildQuery(schema: GraphQLSchema): QueryResolvers {
  return {
    getQuestion: async (root, args, context, info) => {
      return await delegateToSchema({
        schema,
        operation: 'query',
        fieldName: 'getQuestion',
        args,
        context,
        info
      });
    },
    getAnswer: async (root, args, context, info) => {
      return await delegateToSchema({
        schema,
        operation: 'query',
        fieldName: 'getAnswer',
        args,
        context,
        info
      });
    },
    getComment: async (root, args, context, info) => {
      return await delegateToSchema({
        schema,
        operation: 'query',
        fieldName: 'getComment',
        args,
        context,
        info
      });
    },
    queryQuestion: async (root, args, context, info) => {
      return await delegateToSchema({
        schema,
        operation: 'query',
        fieldName: 'queryQuestion',
        args,
        context,
        info
      });
    },
    myTopQuestions: async (root, args, context, info) => {
      const result = await delegateToSchema({
        schema,
        operation: 'query',
        fieldName: 'queryQuestion',
        args: {
          first: 10,
          order: { desc: "likes" }
        },
        context,
        info
      });
      return result
    },
  }
}
