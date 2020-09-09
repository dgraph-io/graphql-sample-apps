import * as Types from '../../types/graphql';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type PostDataFragment = (
  { __typename?: 'Post' }
  & Pick<Types.Post, 'id' | 'title' | 'text' | 'tags' | 'datePublished' | 'likes'>
  & { category: (
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
  ), author: (
    { __typename?: 'User' }
    & Pick<Types.User, 'username' | 'displayName' | 'avatarImg'>
  ), comments: Array<(
    { __typename?: 'Comment' }
    & Pick<Types.Comment, 'id' | 'text'>
    & { commentsOn: (
      { __typename?: 'Post' }
      & { comments: Array<(
        { __typename?: 'Comment' }
        & Pick<Types.Comment, 'id' | 'text'>
        & { author: (
          { __typename?: 'User' }
          & Pick<Types.User, 'username' | 'displayName' | 'avatarImg'>
        ) }
      )> }
    ), author: (
      { __typename?: 'User' }
      & Pick<Types.User, 'username' | 'displayName' | 'avatarImg'>
    ) }
  )> }
);

export type AllPostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllPostsQuery = (
  { __typename?: 'Query' }
  & { queryPost?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Post' }
    & PostDataFragment
  )>>> }
);

export type QueryPermissionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type QueryPermissionQuery = (
  { __typename?: 'Query' }
  & { queryPermission?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Permission' }
    & Pick<Types.Permission, 'role'>
    & { user: (
      { __typename?: 'User' }
      & Pick<Types.User, 'username'>
    ) }
  )>>> }
);

export type FilterPostsQueryVariables = Types.Exact<{
  filter?: Types.Maybe<Types.PostFilter>;
  categoryID?: Types.Maybe<Array<Types.Scalars['ID']>>;
}>;


export type FilterPostsQuery = (
  { __typename?: 'Query' }
  & { queryPost?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Post' }
    & Pick<Types.Post, 'id' | 'title' | 'text' | 'tags' | 'datePublished' | 'likes'>
    & { category: (
      { __typename?: 'Category' }
      & Pick<Types.Category, 'id' | 'name'>
    ), author: (
      { __typename?: 'User' }
      & Pick<Types.User, 'username' | 'displayName' | 'avatarImg'>
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id' | 'text'>
      & { commentsOn: (
        { __typename?: 'Post' }
        & { comments: Array<(
          { __typename?: 'Comment' }
          & Pick<Types.Comment, 'id' | 'text'>
          & { author: (
            { __typename?: 'User' }
            & Pick<Types.User, 'username' | 'displayName' | 'avatarImg'>
          ) }
        )> }
      ), author: (
        { __typename?: 'User' }
        & Pick<Types.User, 'username' | 'displayName' | 'avatarImg'>
      ) }
    )> }
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

export type GetUserQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'username' | 'displayName' | 'avatarImg'>
  )> }
);

export type CategoriesQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { all?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
  )>>>, writable?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
    & { permissions?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Permission' }
      & { user: (
        { __typename?: 'User' }
        & Pick<Types.User, 'username'>
      ) }
    )>>> }
  )>>>, public?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
  )>>> }
);

export type AddPostMutationVariables = Types.Exact<{
  post: Types.AddPostInput;
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost?: Types.Maybe<(
    { __typename?: 'AddPostPayload' }
    & { post?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Post' }
      & Pick<Types.Post, 'id'>
    )>>> }
  )> }
);

export type AddCommentMutationVariables = Types.Exact<{
  comment: Types.AddCommentInput;
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & { addComment?: Types.Maybe<(
    { __typename?: 'AddCommentPayload' }
    & { comment?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id' | 'text'>
      & { author: (
        { __typename?: 'User' }
        & Pick<Types.User, 'username' | 'displayName'>
      ) }
    )>>> }
  )> }
);

export type UpdateUserMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
  user?: Types.Maybe<Types.UserPatch>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Types.Maybe<(
    { __typename?: 'UpdateUserPayload' }
    & { user?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'displayName' | 'avatarImg'>
    )>>> }
  )> }
);

export type UpdatePostMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  post?: Types.Maybe<Types.PostPatch>;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Types.Maybe<(
    { __typename?: 'UpdatePostPayload' }
    & { post?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Post' }
      & PostDataFragment
    )>>> }
  )> }
);

export const PostDataFragmentDoc = gql`
    fragment postData on Post {
  id
  title
  text
  tags
  datePublished
  likes
  category {
    id
    name
  }
  author {
    username
    displayName
    avatarImg
  }
  comments {
    id
    text
    commentsOn {
      comments {
        id
        text
        author {
          username
          displayName
          avatarImg
        }
      }
    }
    author {
      username
      displayName
      avatarImg
    }
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
export const QueryPermissionDocument = gql`
    query queryPermission {
  queryPermission(filter: {role: {eq: ADMINISTRATOR}}) {
    user {
      username
    }
    role
  }
}
    `;

/**
 * __useQueryPermissionQuery__
 *
 * To run a query within a React component, call `useQueryPermissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryPermissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryPermissionQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryPermissionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<QueryPermissionQuery, QueryPermissionQueryVariables>) {
        return ApolloReactHooks.useQuery<QueryPermissionQuery, QueryPermissionQueryVariables>(QueryPermissionDocument, baseOptions);
      }
export function useQueryPermissionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<QueryPermissionQuery, QueryPermissionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<QueryPermissionQuery, QueryPermissionQueryVariables>(QueryPermissionDocument, baseOptions);
        }
export type QueryPermissionQueryHookResult = ReturnType<typeof useQueryPermissionQuery>;
export type QueryPermissionLazyQueryHookResult = ReturnType<typeof useQueryPermissionLazyQuery>;
export type QueryPermissionQueryResult = ApolloReactCommon.QueryResult<QueryPermissionQuery, QueryPermissionQueryVariables>;
export const FilterPostsDocument = gql`
    query filterPosts($filter: PostFilter, $categoryID: [ID!]) {
  queryPost(filter: $filter) @cascade {
    id
    title
    text
    tags
    datePublished
    likes
    category(filter: {id: $categoryID}) {
      id
      name
    }
    author {
      username
      displayName
      avatarImg
    }
    comments {
      id
      text
      commentsOn {
        comments {
          id
          text
          author {
            username
            displayName
            avatarImg
          }
        }
      }
      author {
        username
        displayName
        avatarImg
      }
    }
  }
}
    `;

/**
 * __useFilterPostsQuery__
 *
 * To run a query within a React component, call `useFilterPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterPostsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      categoryID: // value for 'categoryID'
 *   },
 * });
 */
export function useFilterPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FilterPostsQuery, FilterPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<FilterPostsQuery, FilterPostsQueryVariables>(FilterPostsDocument, baseOptions);
      }
export function useFilterPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FilterPostsQuery, FilterPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FilterPostsQuery, FilterPostsQueryVariables>(FilterPostsDocument, baseOptions);
        }
export type FilterPostsQueryHookResult = ReturnType<typeof useFilterPostsQuery>;
export type FilterPostsLazyQueryHookResult = ReturnType<typeof useFilterPostsLazyQuery>;
export type FilterPostsQueryResult = ApolloReactCommon.QueryResult<FilterPostsQuery, FilterPostsQueryVariables>;
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
export const GetUserDocument = gql`
    query getUser($username: String!) {
  getUser(username: $username) {
    username
    displayName
    avatarImg
  }
}
    `;

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
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CategoriesDocument = gql`
    query categories($username: String!) {
  all: queryCategory {
    id
    name
  }
  writable: queryCategory @cascade {
    id
    name
    permissions(filter: {role: {eq: WRITER}}) {
      user(filter: {username: {eq: $username}}) {
        username
      }
    }
  }
  public: queryCategory(filter: {isPublic: true}) {
    id
    name
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = ApolloReactCommon.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const AddPostDocument = gql`
    mutation addPost($post: AddPostInput!) {
  addPost(input: [$post]) {
    post {
      id
    }
  }
}
    `;
export type AddPostMutationFn = ApolloReactCommon.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, baseOptions);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = ApolloReactCommon.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const AddCommentDocument = gql`
    mutation addComment($comment: AddCommentInput!) {
  addComment(input: [$comment]) {
    comment {
      id
      text
      author {
        username
        displayName
      }
    }
  }
}
    `;
export type AddCommentMutationFn = ApolloReactCommon.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = ApolloReactCommon.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($username: String!, $user: UserPatch) {
  updateUser(input: {filter: {username: {eq: $username}}, set: $user}) {
    user {
      displayName
      avatarImg
    }
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

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
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($id: ID!, $post: PostPatch) {
  updatePost(input: {filter: {id: [$id]}, set: $post}) {
    post {
      ...postData
    }
  }
}
    ${PostDataFragmentDoc}`;
export type UpdatePostMutationFn = ApolloReactCommon.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      post: // value for 'post'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = ApolloReactCommon.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const namedOperations = {
  Query: {
    allPosts: 'allPosts',
    queryPermission: 'queryPermission',
    filterPosts: 'filterPosts',
    getPost: 'getPost',
    getUser: 'getUser',
    categories: 'categories'
  },
  Mutation: {
    addPost: 'addPost',
    addComment: 'addComment',
    updateUser: 'updateUser',
    updatePost: 'updatePost'
  },
  Fragment: {
    postData: 'postData'
  }
}