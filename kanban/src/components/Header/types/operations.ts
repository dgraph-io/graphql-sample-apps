import * as Types from '../../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type ProjectNamesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProjectNamesQuery = (
  { __typename?: 'Query' }
  & { queryProject?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Project' }
    & Pick<Types.Project, 'projID' | 'name'>
  )>>> }
);


export const ProjectNamesDocument = gql`
    query projectNames {
  queryProject {
    projID
    name
  }
}
    `;

/**
 * __useProjectNamesQuery__
 *
 * To run a query within a React component, call `useProjectNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectNamesQuery(baseOptions?: Apollo.QueryHookOptions<ProjectNamesQuery, ProjectNamesQueryVariables>) {
        return Apollo.useQuery<ProjectNamesQuery, ProjectNamesQueryVariables>(ProjectNamesDocument, baseOptions);
      }
export function useProjectNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectNamesQuery, ProjectNamesQueryVariables>) {
          return Apollo.useLazyQuery<ProjectNamesQuery, ProjectNamesQueryVariables>(ProjectNamesDocument, baseOptions);
        }
export type ProjectNamesQueryHookResult = ReturnType<typeof useProjectNamesQuery>;
export type ProjectNamesLazyQueryHookResult = ReturnType<typeof useProjectNamesLazyQuery>;
export type ProjectNamesQueryResult = Apollo.QueryResult<ProjectNamesQuery, ProjectNamesQueryVariables>;