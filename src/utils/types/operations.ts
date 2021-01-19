import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type UserNamesFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'username' | 'displayName' | 'image'>
);

export type GetUserQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )> }
);

export type CountUsersAndSearchQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type CountUsersAndSearchQuery = (
  { __typename?: 'Query' }
  & { aggregateUser?: Types.Maybe<(
    { __typename?: 'UserAggregateResult' }
    & Pick<Types.UserAggregateResult, 'count'>
  )>, getUser?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )> }
);

export type AddUserMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
  displayName: Types.Scalars['String'];
  image?: Types.Maybe<Types.Scalars['String']>;
}>;


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & { addUser?: Types.Maybe<(
    { __typename?: 'AddUserPayload' }
    & { user?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'User' }
      & UserNamesFragment
    )>>> }
  )> }
);

export type UpdateUserMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
  displayName?: Types.Maybe<Types.Scalars['String']>;
  image?: Types.Maybe<Types.Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Types.Maybe<(
    { __typename?: 'UpdateUserPayload' }
    & { user?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'User' }
      & UserNamesFragment
    )>>> }
  )> }
);

export const UserNamesFragmentDoc = gql`
    fragment UserNames on User {
  username
  displayName
  image
}
    `;
export const GetUserDocument = gql`
    query getUser($username: String!) {
  getUser(username: $username) {
    ...UserNames
  }
}
    ${UserNamesFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CountUsersAndSearchDocument = gql`
    query countUsersAndSearch($username: String!) {
  aggregateUser {
    count
  }
  getUser(username: $username) {
    ...UserNames
  }
}
    ${UserNamesFragmentDoc}`;

/**
 * __useCountUsersAndSearchQuery__
 *
 * To run a query within a React component, call `useCountUsersAndSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountUsersAndSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountUsersAndSearchQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCountUsersAndSearchQuery(baseOptions: Apollo.QueryHookOptions<CountUsersAndSearchQuery, CountUsersAndSearchQueryVariables>) {
        return Apollo.useQuery<CountUsersAndSearchQuery, CountUsersAndSearchQueryVariables>(CountUsersAndSearchDocument, baseOptions);
      }
export function useCountUsersAndSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountUsersAndSearchQuery, CountUsersAndSearchQueryVariables>) {
          return Apollo.useLazyQuery<CountUsersAndSearchQuery, CountUsersAndSearchQueryVariables>(CountUsersAndSearchDocument, baseOptions);
        }
export type CountUsersAndSearchQueryHookResult = ReturnType<typeof useCountUsersAndSearchQuery>;
export type CountUsersAndSearchLazyQueryHookResult = ReturnType<typeof useCountUsersAndSearchLazyQuery>;
export type CountUsersAndSearchQueryResult = Apollo.QueryResult<CountUsersAndSearchQuery, CountUsersAndSearchQueryVariables>;
export const AddUserDocument = gql`
    mutation addUser($username: String!, $displayName: String!, $image: String) {
  addUser(
    input: [{username: $username, displayName: $displayName, image: $image}]
  ) {
    user {
      ...UserNames
    }
  }
}
    ${UserNamesFragmentDoc}`;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      displayName: // value for 'displayName'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, baseOptions);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($username: String!, $displayName: String, $image: String) {
  updateUser(
    input: {filter: {username: {eq: $username}}, set: {displayName: $displayName, image: $image}}
  ) {
    user {
      ...UserNames
    }
  }
}
    ${UserNamesFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      displayName: // value for 'displayName'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;