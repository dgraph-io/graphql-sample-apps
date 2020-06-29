import * as Types from '../../types/graphql';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type PostDataFragment = (
  { __typename?: 'Post' }
  & Pick<Types.Post, 'id' | 'title' | 'text' | 'datePublished' | 'likes'>
  & { category: (
    { __typename?: 'Category' }
    & Pick<Types.Category, 'name'>
  ), author: (
    { __typename?: 'User' }
    & Pick<Types.User, 'username' | 'displayName' | 'avatarImg'>
  ) }
);

export type AllPostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllPostsQuery = (
  { __typename?: 'Query' }
  & { queryPost?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Post' }
    & PostDataFragment
  )>>> }
);

export type GetPostQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost?: Types.Maybe<(
    { __typename?: 'Post' }
    & PostDataFragment
  )> }
);

export const PostDataFragmentDoc = gql`
    fragment postData on Post {
  id
  title
  text
  datePublished
  likes
  category {
    name
  }
  author {
    username
    displayName
    avatarImg
  }
}
    `;
export const AllPostsDocument = gql`
    query allPosts {
  queryPost(order: {desc: datePublished}) {
    ...postData
  }
}
    ${PostDataFragmentDoc}`;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, baseOptions);
      }
export function useAllPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, baseOptions);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = ApolloReactCommon.QueryResult<AllPostsQuery, AllPostsQueryVariables>;
export const GetPostDocument = gql`
    query getPost($id: ID!) {
  getPost(id: $id) {
    ...postData
  }
}
    ${PostDataFragmentDoc}`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, baseOptions);
      }
export function useGetPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, baseOptions);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = ApolloReactCommon.QueryResult<GetPostQuery, GetPostQueryVariables>;