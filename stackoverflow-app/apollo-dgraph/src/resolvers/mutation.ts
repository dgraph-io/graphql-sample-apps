import { MutationResolvers } from '../types/gql';
import { GraphQLSchema, SelectionSetNode, Kind } from 'graphql';
import { delegateToSchema, WrapQuery } from 'graphql-tools';

export function buildMutation(schema: GraphQLSchema): MutationResolvers {
  return {
    addQuestion: async (root, args, context, info) => {
      console.log("args", args)
      const wrap = new WrapQuery(
        ['addQuestion'],
        (subtree: SelectionSetNode) => ({
          kind: Kind.FIELD,
          name: { kind: Kind.NAME, value: 'question' },
          selectionSet: subtree,
        }),
        result => result.question[0],
      )

      const currentUser = context.currentUser
      
      console.log("args", args.input.text);
      const result = await delegateToSchema({
        schema,
        operation: "mutation",
        fieldName: "addQuestion",
        args: {
          input: [
            {
              text: args.input.text,
              title: args.input.title,
              tags: args.input.tags,
              author: { username: "av", email: "ab" },
              datePublished: new Date().toISOString(),
              likes: 0,
            },
          ],
        },
        context,
        info,
        transforms: [wrap],
      });
      return result
    },
    addAnswer: async (root, args, context, info) => {
      const wrap = new WrapQuery(
        ['addAnswer'],
        (subtree: SelectionSetNode) => ({
          kind: Kind.FIELD,
          name: { kind: Kind.NAME, value: 'answer' },
          selectionSet: subtree,
        }),
        result => result.answer[0], 
      )
      const currentUser = context.currentUser

      const result = await delegateToSchema({
        schema,
        operation: 'mutation',
        fieldName: 'addAnswer',
        args: {
          input: [ {
            text: args.input.text,
            author: currentUser,
            inAnswerTo: args.input.inAnswerTo,
            datePublished: (new Date()).toISOString(),
            likes: 0
          } ]
        },
        context,
        info,
        transforms: [ wrap ]
      })
      return result
    },
    addComment: async (root, args, context, info) => {
      const wrap = new WrapQuery(
        ['addComment'],
        (subtree: SelectionSetNode) => ({
          kind: Kind.FIELD,
          name: { kind: Kind.NAME, value: 'comment' },
          selectionSet: subtree,
        }),
        result => result.comment[0], 
      )
      const currentUser = context.currentUser

      const result = await delegateToSchema({
        schema,
        operation: 'mutation',
        fieldName: 'addComment',
        args: {
          input: [ {
            text: args.input.text,
            author: currentUser,
            commentsOn: args.input.commentsOn,
            datePublished: (new Date()).toISOString(),
            likes: 0
          } ]
        },
        context,
        info,
        transforms: [ wrap ]
      })
      return result
    },
    editPostText: async (root, args, context, info) => {
      const wrap = new WrapQuery(
        ['updatePost'],
        (subtree: SelectionSetNode) => ({
          kind: Kind.FIELD,
          name: { kind: Kind.NAME, value: 'post' },
          selectionSet: subtree,
        }),
        result => result.post[0], 
      )
      
      const result = await delegateToSchema({
        schema,
        operation: 'mutation',
        fieldName: 'updatePost',
        args: {
          input: {
            filter: {id: [args.id]},
            set: {text: args.newText},
          }
        },
        context,
        info,
        transforms: [ wrap ]
      })
      return result
    },
    likePost: async (root, args, context, info) => {
      const wrap = new WrapQuery(
        ['updatePost'],
        (subtree: SelectionSetNode) => ({
          kind: Kind.FIELD,
          name: { kind: Kind.NAME, value: 'post' },
          selectionSet: subtree,
        }),
        result => result.post[0], 
      )
      
      const result = await delegateToSchema({
        schema,
        operation: 'mutation',
        fieldName: 'updatePost',
        args: {
          input: {
            filter: {id: [args.id]},
            set: {likes: args.likes + 1},
          }
        },
        context,
        info,
        transforms: [ wrap ]
      })
      return result
    },                           
  }
}
