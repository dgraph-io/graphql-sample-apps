import * as Types from '../../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type UserNamesFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'username' | 'displayName' | 'image'>
);

export type ProjectDetailsFragment = (
  { __typename?: 'Project' }
  & Pick<Types.Project, 'projID' | 'name' | 'description' | 'url'>
  & { admin?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )> }
);

export type AllProjectsDetailsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllProjectsDetailsQuery = (
  { __typename?: 'Query' }
  & { queryProject?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Project' }
    & ProjectDetailsFragment
  )>>> }
);

export type GetProjectDetailsQueryVariables = Types.Exact<{
  projID: Types.Scalars['ID'];
}>;


export type GetProjectDetailsQuery = (
  { __typename?: 'Query' }
  & { getProject?: Types.Maybe<(
    { __typename?: 'Project' }
    & ProjectDetailsFragment
  )> }
);

export type AllUsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { queryUser?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )>>> }
);

export type AddProjectMutationVariables = Types.Exact<{
  proj: Types.AddProjectInput;
}>;


export type AddProjectMutation = (
  { __typename?: 'Mutation' }
  & { addProject?: Types.Maybe<(
    { __typename?: 'AddProjectPayload' }
    & { project?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Project' }
      & ProjectDetailsFragment
    )>>> }
  )> }
);

export type UpdateProjectDetailsMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  details?: Types.Maybe<Types.ProjectPatch>;
}>;


export type UpdateProjectDetailsMutation = (
  { __typename?: 'Mutation' }
  & { updateProject?: Types.Maybe<(
    { __typename?: 'UpdateProjectPayload' }
    & { project?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Project' }
      & ProjectDetailsFragment
    )>>> }
  )> }
);

export type DeleteProjectMutationVariables = Types.Exact<{
  projID: Types.Scalars['ID'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & { deleteProject?: Types.Maybe<(
    { __typename?: 'DeleteProjectPayload' }
    & { project?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Project' }
      & Pick<Types.Project, 'projID'>
    )>>> }
  )> }
);

export const UserNamesFragmentDoc = gql`
    fragment userNames on User {
  username
  displayName
  image
}
    `;
export const ProjectDetailsFragmentDoc = gql`
    fragment projectDetails on Project {
  projID
  name
  description
  url
  admin {
    ...userNames
  }
}
    ${UserNamesFragmentDoc}`;
export const AllProjectsDetailsDocument = gql`
    query allProjectsDetails {
  queryProject {
    ...projectDetails
  }
}
    ${ProjectDetailsFragmentDoc}`;

/**
 * __useAllProjectsDetailsQuery__
 *
 * To run a query within a React component, call `useAllProjectsDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProjectsDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProjectsDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProjectsDetailsQuery(baseOptions?: Apollo.QueryHookOptions<AllProjectsDetailsQuery, AllProjectsDetailsQueryVariables>) {
        return Apollo.useQuery<AllProjectsDetailsQuery, AllProjectsDetailsQueryVariables>(AllProjectsDetailsDocument, baseOptions);
      }
export function useAllProjectsDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProjectsDetailsQuery, AllProjectsDetailsQueryVariables>) {
          return Apollo.useLazyQuery<AllProjectsDetailsQuery, AllProjectsDetailsQueryVariables>(AllProjectsDetailsDocument, baseOptions);
        }
export type AllProjectsDetailsQueryHookResult = ReturnType<typeof useAllProjectsDetailsQuery>;
export type AllProjectsDetailsLazyQueryHookResult = ReturnType<typeof useAllProjectsDetailsLazyQuery>;
export type AllProjectsDetailsQueryResult = Apollo.QueryResult<AllProjectsDetailsQuery, AllProjectsDetailsQueryVariables>;
export const GetProjectDetailsDocument = gql`
    query getProjectDetails($projID: ID!) {
  getProject(projID: $projID) {
    ...projectDetails
  }
}
    ${ProjectDetailsFragmentDoc}`;

/**
 * __useGetProjectDetailsQuery__
 *
 * To run a query within a React component, call `useGetProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDetailsQuery({
 *   variables: {
 *      projID: // value for 'projID'
 *   },
 * });
 */
export function useGetProjectDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>) {
        return Apollo.useQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(GetProjectDetailsDocument, baseOptions);
      }
export function useGetProjectDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>) {
          return Apollo.useLazyQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(GetProjectDetailsDocument, baseOptions);
        }
export type GetProjectDetailsQueryHookResult = ReturnType<typeof useGetProjectDetailsQuery>;
export type GetProjectDetailsLazyQueryHookResult = ReturnType<typeof useGetProjectDetailsLazyQuery>;
export type GetProjectDetailsQueryResult = Apollo.QueryResult<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>;
export const AllUsersDocument = gql`
    query allUsers {
  queryUser(order: {desc: displayName}) {
    ...userNames
  }
}
    ${UserNamesFragmentDoc}`;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, baseOptions);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, baseOptions);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const AddProjectDocument = gql`
    mutation addProject($proj: AddProjectInput!) {
  addProject(input: [$proj]) {
    project {
      ...projectDetails
    }
  }
}
    ${ProjectDetailsFragmentDoc}`;
export type AddProjectMutationFn = Apollo.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;

/**
 * __useAddProjectMutation__
 *
 * To run a mutation, you first call `useAddProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMutation, { data, loading, error }] = useAddProjectMutation({
 *   variables: {
 *      proj: // value for 'proj'
 *   },
 * });
 */
export function useAddProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>) {
        return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(AddProjectDocument, baseOptions);
      }
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export type AddProjectMutationResult = Apollo.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const UpdateProjectDetailsDocument = gql`
    mutation updateProjectDetails($id: ID!, $details: ProjectPatch) {
  updateProject(input: {filter: {projID: [$id]}, set: $details}) {
    project {
      ...projectDetails
    }
  }
}
    ${ProjectDetailsFragmentDoc}`;
export type UpdateProjectDetailsMutationFn = Apollo.MutationFunction<UpdateProjectDetailsMutation, UpdateProjectDetailsMutationVariables>;

/**
 * __useUpdateProjectDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateProjectDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectDetailsMutation, { data, loading, error }] = useUpdateProjectDetailsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      details: // value for 'details'
 *   },
 * });
 */
export function useUpdateProjectDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectDetailsMutation, UpdateProjectDetailsMutationVariables>) {
        return Apollo.useMutation<UpdateProjectDetailsMutation, UpdateProjectDetailsMutationVariables>(UpdateProjectDetailsDocument, baseOptions);
      }
export type UpdateProjectDetailsMutationHookResult = ReturnType<typeof useUpdateProjectDetailsMutation>;
export type UpdateProjectDetailsMutationResult = Apollo.MutationResult<UpdateProjectDetailsMutation>;
export type UpdateProjectDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateProjectDetailsMutation, UpdateProjectDetailsMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($projID: ID!) {
  deleteProject(filter: {projID: [$projID]}) {
    project {
      projID
    }
  }
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projID: // value for 'projID'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, baseOptions);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;