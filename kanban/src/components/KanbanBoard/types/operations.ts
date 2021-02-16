import * as Types from '../../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type ProjectNameFragment = (
  { __typename?: 'Project' }
  & Pick<Types.Project, 'projID' | 'name'>
);

export type ProjectOrderFragment = (
  { __typename?: 'Project' }
  & Pick<Types.Project, 'projID' | 'order'>
);

export type ProjectAllDetailsFragment = (
  { __typename?: 'Project' }
  & Pick<Types.Project, 'projID' | 'name' | 'url' | 'description' | 'order'>
);

export type ProjectWithColumnsFragment = (
  { __typename?: 'Project' }
  & Pick<Types.Project, 'projID'>
  & { columns?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Column' }
    & Pick<Types.Column, 'colID'>
  )>>> }
);

export type ColumnDetailsFragment = (
  { __typename?: 'Column' }
  & Pick<Types.Column, 'colID' | 'name'>
);

export type ColumnOrderFragment = (
  { __typename?: 'Column' }
  & Pick<Types.Column, 'colID' | 'order'>
);

export type ColumnWithTicketsFragment = (
  { __typename?: 'Column' }
  & Pick<Types.Column, 'colID' | 'name' | 'order'>
  & { tickets?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Ticket' }
    & TicketDetailsWithCommentsFragment
  )>>> }
);

export type ColumnWithProjectColumnsFragment = (
  { __typename?: 'Column' }
  & Pick<Types.Column, 'colID' | 'name'>
  & { inProject: (
    { __typename?: 'Project' }
    & ProjectWithColumnsFragment
  ) }
);

export type UserNamesFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'username' | 'displayName' | 'image'>
);

export type TicketDetailsFragment = (
  { __typename?: 'Ticket' }
  & Pick<Types.Ticket, 'id' | 'title' | 'description'>
  & { assigned?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )> }
);

export type TicketDetailsWithCommentsFragment = (
  { __typename?: 'Ticket' }
  & Pick<Types.Ticket, 'id' | 'title' | 'description'>
  & { assigned?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )>, comments?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Comment' }
    & CommentDetailsFragment
  )>>> }
);

export type TicketWithColumnFragment = (
  { __typename?: 'Ticket' }
  & { onColumn: (
    { __typename?: 'Column' }
    & ColumnDetailsFragment
  ) }
  & TicketDetailsFragment
);

export type TicketWithColumnWithTicketsFragment = (
  { __typename?: 'Ticket' }
  & { onColumn: (
    { __typename?: 'Column' }
    & ColumnWithTicketsFragment
  ) }
  & TicketDetailsFragment
);

export type RoleDetailsFragment = (
  { __typename?: 'Role' }
  & Pick<Types.Role, 'id' | 'permission'>
  & { assignedTo?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )>>> }
);

export type CommentDetailsFragment = (
  { __typename?: 'Comment' }
  & Pick<Types.Comment, 'id' | 'text' | 'datetime'>
  & { author: (
    { __typename?: 'User' }
    & UserNamesFragment
  ) }
);

export type GetProjectQueryVariables = Types.Exact<{
  projectID: Types.Scalars['ID'];
}>;


export type GetProjectQuery = (
  { __typename?: 'Query' }
  & { getProject?: Types.Maybe<(
    { __typename?: 'Project' }
    & { admin?: Types.Maybe<(
      { __typename?: 'User' }
      & UserNamesFragment
    )>, roles?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Role' }
      & RoleDetailsFragment
    )>>>, columns?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnWithTicketsFragment
    )>>> }
    & ProjectAllDetailsFragment
  )> }
);

export type GetTicketQueryVariables = Types.Exact<{
  ticketID: Types.Scalars['ID'];
}>;


export type GetTicketQuery = (
  { __typename?: 'Query' }
  & { getTicket?: Types.Maybe<(
    { __typename?: 'Ticket' }
    & TicketWithColumnFragment
  )> }
);

export type AddTicketMutationVariables = Types.Exact<{
  ticket: Types.AddTicketInput;
}>;


export type AddTicketMutation = (
  { __typename?: 'Mutation' }
  & { addTicket?: Types.Maybe<(
    { __typename?: 'AddTicketPayload' }
    & { ticket?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Ticket' }
      & TicketWithColumnWithTicketsFragment
    )>>> }
  )> }
);

export type UpdateTicketMutationVariables = Types.Exact<{
  ticketID: Types.Scalars['ID'];
  ticket?: Types.Maybe<Types.TicketPatch>;
  remove?: Types.Maybe<Types.TicketPatch>;
}>;


export type UpdateTicketMutation = (
  { __typename?: 'Mutation' }
  & { updateTicket?: Types.Maybe<(
    { __typename?: 'UpdateTicketPayload' }
    & { ticket?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Ticket' }
      & TicketWithColumnFragment
    )>>> }
  )> }
);

export type DeleteTicketMutationVariables = Types.Exact<{
  ticketID: Types.Scalars['ID'];
}>;


export type DeleteTicketMutation = (
  { __typename?: 'Mutation' }
  & { deleteTicket?: Types.Maybe<(
    { __typename?: 'DeleteTicketPayload' }
    & { ticket?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Ticket' }
      & Pick<Types.Ticket, 'id'>
    )>>> }
  )> }
);

export type AddColumnMutationVariables = Types.Exact<{
  column: Types.AddColumnInput;
}>;


export type AddColumnMutation = (
  { __typename?: 'Mutation' }
  & { addColumn?: Types.Maybe<(
    { __typename?: 'AddColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnWithProjectColumnsFragment
    )>>> }
  )> }
);

export type UpdateColumnMutationVariables = Types.Exact<{
  colID: Types.Scalars['ID'];
  ticketID: Types.Scalars['ID'];
}>;


export type UpdateColumnMutation = (
  { __typename?: 'Mutation' }
  & { updateColumn?: Types.Maybe<(
    { __typename?: 'UpdateColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnDetailsFragment
    )>>> }
  )> }
);

export type SetColumnOrderMutationVariables = Types.Exact<{
  projID: Types.Scalars['ID'];
  order: Types.Scalars['String'];
}>;


export type SetColumnOrderMutation = (
  { __typename?: 'Mutation' }
  & { updateProject?: Types.Maybe<(
    { __typename?: 'UpdateProjectPayload' }
    & { project?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Project' }
      & ProjectOrderFragment
    )>>> }
  )> }
);

export type DeleteColumnMutationVariables = Types.Exact<{
  colID: Types.Scalars['ID'];
}>;


export type DeleteColumnMutation = (
  { __typename?: 'Mutation' }
  & { deleteColumn?: Types.Maybe<(
    { __typename?: 'DeleteColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & Pick<Types.Column, 'colID'>
    )>>> }
  )> }
);

export type SetTicketOrderMutationVariables = Types.Exact<{
  colID: Types.Scalars['ID'];
  order: Types.Scalars['String'];
}>;


export type SetTicketOrderMutation = (
  { __typename?: 'Mutation' }
  & { updateColumn?: Types.Maybe<(
    { __typename?: 'UpdateColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnOrderFragment
    )>>> }
  )> }
);

export type MoveTicketMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  colID: Types.Scalars['ID'];
  order: Types.Scalars['String'];
}>;


export type MoveTicketMutation = (
  { __typename?: 'Mutation' }
  & { updateTicket?: Types.Maybe<(
    { __typename?: 'UpdateTicketPayload' }
    & { ticket?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Ticket' }
      & TicketWithColumnFragment
    )>>> }
  )>, updateColumn?: Types.Maybe<(
    { __typename?: 'UpdateColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnOrderFragment
    )>>> }
  )> }
);

export type UpdateColumnNameMutationVariables = Types.Exact<{
  colID: Types.Scalars['ID'];
  name: Types.Scalars['String'];
}>;


export type UpdateColumnNameMutation = (
  { __typename?: 'Mutation' }
  & { updateColumn?: Types.Maybe<(
    { __typename?: 'UpdateColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnDetailsFragment
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
      & Pick<Types.Comment, 'id'>
      & { onTicket?: Types.Maybe<(
        { __typename?: 'Ticket' }
        & Pick<Types.Ticket, 'id'>
        & { comments?: Types.Maybe<Array<Types.Maybe<(
          { __typename?: 'Comment' }
          & CommentDetailsFragment
        )>>> }
      )> }
    )>>> }
  )> }
);

export type UpdateCommentMutationVariables = Types.Exact<{
  commentID: Types.Scalars['ID'];
  commentPatch: Types.CommentPatch;
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment?: Types.Maybe<(
    { __typename?: 'UpdateCommentPayload' }
    & { comment?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Comment' }
      & CommentDetailsFragment
    )>>> }
  )> }
);

export type DeleteCommentMutationVariables = Types.Exact<{
  commentID: Types.Scalars['ID'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteComment?: Types.Maybe<(
    { __typename?: 'DeleteCommentPayload' }
    & { comment?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id'>
    )>>> }
  )> }
);

export const ProjectNameFragmentDoc = gql`
    fragment projectName on Project {
  projID
  name
}
    `;
export const ProjectOrderFragmentDoc = gql`
    fragment projectOrder on Project {
  projID
  order
}
    `;
export const ProjectAllDetailsFragmentDoc = gql`
    fragment projectAllDetails on Project {
  projID
  name
  url
  description
  order
}
    `;
export const ColumnOrderFragmentDoc = gql`
    fragment columnOrder on Column {
  colID
  order
}
    `;
export const ProjectWithColumnsFragmentDoc = gql`
    fragment projectWithColumns on Project {
  projID
  columns {
    colID
  }
}
    `;
export const ColumnWithProjectColumnsFragmentDoc = gql`
    fragment columnWithProjectColumns on Column {
  colID
  name
  inProject {
    ...projectWithColumns
  }
}
    ${ProjectWithColumnsFragmentDoc}`;
export const UserNamesFragmentDoc = gql`
    fragment userNames on User {
  username
  displayName
  image
}
    `;
export const TicketDetailsFragmentDoc = gql`
    fragment ticketDetails on Ticket {
  id
  title
  description
  assigned {
    ...userNames
  }
}
    ${UserNamesFragmentDoc}`;
export const ColumnDetailsFragmentDoc = gql`
    fragment columnDetails on Column {
  colID
  name
}
    `;
export const TicketWithColumnFragmentDoc = gql`
    fragment ticketWithColumn on Ticket {
  ...ticketDetails
  onColumn {
    ...columnDetails
  }
}
    ${TicketDetailsFragmentDoc}
${ColumnDetailsFragmentDoc}`;
export const CommentDetailsFragmentDoc = gql`
    fragment commentDetails on Comment {
  id
  text
  datetime
  author {
    ...userNames
  }
}
    ${UserNamesFragmentDoc}`;
export const TicketDetailsWithCommentsFragmentDoc = gql`
    fragment ticketDetailsWithComments on Ticket {
  id
  title
  description
  assigned {
    ...userNames
  }
  comments(order: {desc: datetime}) {
    ...commentDetails
  }
}
    ${UserNamesFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const ColumnWithTicketsFragmentDoc = gql`
    fragment columnWithTickets on Column {
  colID
  name
  tickets {
    ...ticketDetailsWithComments
  }
  order
}
    ${TicketDetailsWithCommentsFragmentDoc}`;
export const TicketWithColumnWithTicketsFragmentDoc = gql`
    fragment ticketWithColumnWithTickets on Ticket {
  ...ticketDetails
  onColumn {
    ...columnWithTickets
  }
}
    ${TicketDetailsFragmentDoc}
${ColumnWithTicketsFragmentDoc}`;
export const RoleDetailsFragmentDoc = gql`
    fragment roleDetails on Role {
  id
  permission
  assignedTo {
    ...userNames
  }
}
    ${UserNamesFragmentDoc}`;
export const GetProjectDocument = gql`
    query getProject($projectID: ID!) {
  getProject(projID: $projectID) {
    ...projectAllDetails
    admin {
      ...userNames
    }
    roles {
      ...roleDetails
    }
    columns {
      ...columnWithTickets
    }
  }
}
    ${ProjectAllDetailsFragmentDoc}
${UserNamesFragmentDoc}
${RoleDetailsFragmentDoc}
${ColumnWithTicketsFragmentDoc}`;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      projectID: // value for 'projectID'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, baseOptions);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, baseOptions);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetTicketDocument = gql`
    query getTicket($ticketID: ID!) {
  getTicket(id: $ticketID) {
    ...ticketWithColumn
  }
}
    ${TicketWithColumnFragmentDoc}`;

/**
 * __useGetTicketQuery__
 *
 * To run a query within a React component, call `useGetTicketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketQuery({
 *   variables: {
 *      ticketID: // value for 'ticketID'
 *   },
 * });
 */
export function useGetTicketQuery(baseOptions: Apollo.QueryHookOptions<GetTicketQuery, GetTicketQueryVariables>) {
        return Apollo.useQuery<GetTicketQuery, GetTicketQueryVariables>(GetTicketDocument, baseOptions);
      }
export function useGetTicketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketQuery, GetTicketQueryVariables>) {
          return Apollo.useLazyQuery<GetTicketQuery, GetTicketQueryVariables>(GetTicketDocument, baseOptions);
        }
export type GetTicketQueryHookResult = ReturnType<typeof useGetTicketQuery>;
export type GetTicketLazyQueryHookResult = ReturnType<typeof useGetTicketLazyQuery>;
export type GetTicketQueryResult = Apollo.QueryResult<GetTicketQuery, GetTicketQueryVariables>;
export const AddTicketDocument = gql`
    mutation addTicket($ticket: AddTicketInput!) {
  addTicket(input: [$ticket]) {
    ticket {
      ...ticketWithColumnWithTickets
    }
  }
}
    ${TicketWithColumnWithTicketsFragmentDoc}`;
export type AddTicketMutationFn = Apollo.MutationFunction<AddTicketMutation, AddTicketMutationVariables>;

/**
 * __useAddTicketMutation__
 *
 * To run a mutation, you first call `useAddTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTicketMutation, { data, loading, error }] = useAddTicketMutation({
 *   variables: {
 *      ticket: // value for 'ticket'
 *   },
 * });
 */
export function useAddTicketMutation(baseOptions?: Apollo.MutationHookOptions<AddTicketMutation, AddTicketMutationVariables>) {
        return Apollo.useMutation<AddTicketMutation, AddTicketMutationVariables>(AddTicketDocument, baseOptions);
      }
export type AddTicketMutationHookResult = ReturnType<typeof useAddTicketMutation>;
export type AddTicketMutationResult = Apollo.MutationResult<AddTicketMutation>;
export type AddTicketMutationOptions = Apollo.BaseMutationOptions<AddTicketMutation, AddTicketMutationVariables>;
export const UpdateTicketDocument = gql`
    mutation updateTicket($ticketID: ID!, $ticket: TicketPatch, $remove: TicketPatch) {
  updateTicket(input: {filter: {id: [$ticketID]}, set: $ticket, remove: $remove}) {
    ticket {
      ...ticketWithColumn
    }
  }
}
    ${TicketWithColumnFragmentDoc}`;
export type UpdateTicketMutationFn = Apollo.MutationFunction<UpdateTicketMutation, UpdateTicketMutationVariables>;

/**
 * __useUpdateTicketMutation__
 *
 * To run a mutation, you first call `useUpdateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTicketMutation, { data, loading, error }] = useUpdateTicketMutation({
 *   variables: {
 *      ticketID: // value for 'ticketID'
 *      ticket: // value for 'ticket'
 *      remove: // value for 'remove'
 *   },
 * });
 */
export function useUpdateTicketMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTicketMutation, UpdateTicketMutationVariables>) {
        return Apollo.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument, baseOptions);
      }
export type UpdateTicketMutationHookResult = ReturnType<typeof useUpdateTicketMutation>;
export type UpdateTicketMutationResult = Apollo.MutationResult<UpdateTicketMutation>;
export type UpdateTicketMutationOptions = Apollo.BaseMutationOptions<UpdateTicketMutation, UpdateTicketMutationVariables>;
export const DeleteTicketDocument = gql`
    mutation deleteTicket($ticketID: ID!) {
  deleteTicket(filter: {id: [$ticketID]}) {
    ticket {
      id
    }
  }
}
    `;
export type DeleteTicketMutationFn = Apollo.MutationFunction<DeleteTicketMutation, DeleteTicketMutationVariables>;

/**
 * __useDeleteTicketMutation__
 *
 * To run a mutation, you first call `useDeleteTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTicketMutation, { data, loading, error }] = useDeleteTicketMutation({
 *   variables: {
 *      ticketID: // value for 'ticketID'
 *   },
 * });
 */
export function useDeleteTicketMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTicketMutation, DeleteTicketMutationVariables>) {
        return Apollo.useMutation<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument, baseOptions);
      }
export type DeleteTicketMutationHookResult = ReturnType<typeof useDeleteTicketMutation>;
export type DeleteTicketMutationResult = Apollo.MutationResult<DeleteTicketMutation>;
export type DeleteTicketMutationOptions = Apollo.BaseMutationOptions<DeleteTicketMutation, DeleteTicketMutationVariables>;
export const AddColumnDocument = gql`
    mutation addColumn($column: AddColumnInput!) {
  addColumn(input: [$column]) {
    column {
      ...columnWithProjectColumns
    }
  }
}
    ${ColumnWithProjectColumnsFragmentDoc}`;
export type AddColumnMutationFn = Apollo.MutationFunction<AddColumnMutation, AddColumnMutationVariables>;

/**
 * __useAddColumnMutation__
 *
 * To run a mutation, you first call `useAddColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addColumnMutation, { data, loading, error }] = useAddColumnMutation({
 *   variables: {
 *      column: // value for 'column'
 *   },
 * });
 */
export function useAddColumnMutation(baseOptions?: Apollo.MutationHookOptions<AddColumnMutation, AddColumnMutationVariables>) {
        return Apollo.useMutation<AddColumnMutation, AddColumnMutationVariables>(AddColumnDocument, baseOptions);
      }
export type AddColumnMutationHookResult = ReturnType<typeof useAddColumnMutation>;
export type AddColumnMutationResult = Apollo.MutationResult<AddColumnMutation>;
export type AddColumnMutationOptions = Apollo.BaseMutationOptions<AddColumnMutation, AddColumnMutationVariables>;
export const UpdateColumnDocument = gql`
    mutation updateColumn($colID: ID!, $ticketID: ID!) {
  updateColumn(
    input: {filter: {colID: [$colID]}, set: {tickets: [{id: $ticketID}]}}
  ) {
    column {
      ...columnDetails
    }
  }
}
    ${ColumnDetailsFragmentDoc}`;
export type UpdateColumnMutationFn = Apollo.MutationFunction<UpdateColumnMutation, UpdateColumnMutationVariables>;

/**
 * __useUpdateColumnMutation__
 *
 * To run a mutation, you first call `useUpdateColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnMutation, { data, loading, error }] = useUpdateColumnMutation({
 *   variables: {
 *      colID: // value for 'colID'
 *      ticketID: // value for 'ticketID'
 *   },
 * });
 */
export function useUpdateColumnMutation(baseOptions?: Apollo.MutationHookOptions<UpdateColumnMutation, UpdateColumnMutationVariables>) {
        return Apollo.useMutation<UpdateColumnMutation, UpdateColumnMutationVariables>(UpdateColumnDocument, baseOptions);
      }
export type UpdateColumnMutationHookResult = ReturnType<typeof useUpdateColumnMutation>;
export type UpdateColumnMutationResult = Apollo.MutationResult<UpdateColumnMutation>;
export type UpdateColumnMutationOptions = Apollo.BaseMutationOptions<UpdateColumnMutation, UpdateColumnMutationVariables>;
export const SetColumnOrderDocument = gql`
    mutation setColumnOrder($projID: ID!, $order: String!) {
  updateProject(input: {filter: {projID: [$projID]}, set: {order: $order}}) {
    project {
      ...projectOrder
    }
  }
}
    ${ProjectOrderFragmentDoc}`;
export type SetColumnOrderMutationFn = Apollo.MutationFunction<SetColumnOrderMutation, SetColumnOrderMutationVariables>;

/**
 * __useSetColumnOrderMutation__
 *
 * To run a mutation, you first call `useSetColumnOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetColumnOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setColumnOrderMutation, { data, loading, error }] = useSetColumnOrderMutation({
 *   variables: {
 *      projID: // value for 'projID'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useSetColumnOrderMutation(baseOptions?: Apollo.MutationHookOptions<SetColumnOrderMutation, SetColumnOrderMutationVariables>) {
        return Apollo.useMutation<SetColumnOrderMutation, SetColumnOrderMutationVariables>(SetColumnOrderDocument, baseOptions);
      }
export type SetColumnOrderMutationHookResult = ReturnType<typeof useSetColumnOrderMutation>;
export type SetColumnOrderMutationResult = Apollo.MutationResult<SetColumnOrderMutation>;
export type SetColumnOrderMutationOptions = Apollo.BaseMutationOptions<SetColumnOrderMutation, SetColumnOrderMutationVariables>;
export const DeleteColumnDocument = gql`
    mutation deleteColumn($colID: ID!) {
  deleteColumn(filter: {colID: [$colID]}) {
    column {
      colID
    }
  }
}
    `;
export type DeleteColumnMutationFn = Apollo.MutationFunction<DeleteColumnMutation, DeleteColumnMutationVariables>;

/**
 * __useDeleteColumnMutation__
 *
 * To run a mutation, you first call `useDeleteColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteColumnMutation, { data, loading, error }] = useDeleteColumnMutation({
 *   variables: {
 *      colID: // value for 'colID'
 *   },
 * });
 */
export function useDeleteColumnMutation(baseOptions?: Apollo.MutationHookOptions<DeleteColumnMutation, DeleteColumnMutationVariables>) {
        return Apollo.useMutation<DeleteColumnMutation, DeleteColumnMutationVariables>(DeleteColumnDocument, baseOptions);
      }
export type DeleteColumnMutationHookResult = ReturnType<typeof useDeleteColumnMutation>;
export type DeleteColumnMutationResult = Apollo.MutationResult<DeleteColumnMutation>;
export type DeleteColumnMutationOptions = Apollo.BaseMutationOptions<DeleteColumnMutation, DeleteColumnMutationVariables>;
export const SetTicketOrderDocument = gql`
    mutation setTicketOrder($colID: ID!, $order: String!) {
  updateColumn(input: {filter: {colID: [$colID]}, set: {order: $order}}) {
    column {
      ...columnOrder
    }
  }
}
    ${ColumnOrderFragmentDoc}`;
export type SetTicketOrderMutationFn = Apollo.MutationFunction<SetTicketOrderMutation, SetTicketOrderMutationVariables>;

/**
 * __useSetTicketOrderMutation__
 *
 * To run a mutation, you first call `useSetTicketOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTicketOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTicketOrderMutation, { data, loading, error }] = useSetTicketOrderMutation({
 *   variables: {
 *      colID: // value for 'colID'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useSetTicketOrderMutation(baseOptions?: Apollo.MutationHookOptions<SetTicketOrderMutation, SetTicketOrderMutationVariables>) {
        return Apollo.useMutation<SetTicketOrderMutation, SetTicketOrderMutationVariables>(SetTicketOrderDocument, baseOptions);
      }
export type SetTicketOrderMutationHookResult = ReturnType<typeof useSetTicketOrderMutation>;
export type SetTicketOrderMutationResult = Apollo.MutationResult<SetTicketOrderMutation>;
export type SetTicketOrderMutationOptions = Apollo.BaseMutationOptions<SetTicketOrderMutation, SetTicketOrderMutationVariables>;
export const MoveTicketDocument = gql`
    mutation moveTicket($id: ID!, $colID: ID!, $order: String!) {
  updateTicket(input: {filter: {id: [$id]}, set: {onColumn: {colID: $colID}}}) {
    ticket {
      ...ticketWithColumn
    }
  }
  updateColumn(input: {filter: {colID: [$colID]}, set: {order: $order}}) {
    column {
      ...columnOrder
    }
  }
}
    ${TicketWithColumnFragmentDoc}
${ColumnOrderFragmentDoc}`;
export type MoveTicketMutationFn = Apollo.MutationFunction<MoveTicketMutation, MoveTicketMutationVariables>;

/**
 * __useMoveTicketMutation__
 *
 * To run a mutation, you first call `useMoveTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveTicketMutation, { data, loading, error }] = useMoveTicketMutation({
 *   variables: {
 *      id: // value for 'id'
 *      colID: // value for 'colID'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useMoveTicketMutation(baseOptions?: Apollo.MutationHookOptions<MoveTicketMutation, MoveTicketMutationVariables>) {
        return Apollo.useMutation<MoveTicketMutation, MoveTicketMutationVariables>(MoveTicketDocument, baseOptions);
      }
export type MoveTicketMutationHookResult = ReturnType<typeof useMoveTicketMutation>;
export type MoveTicketMutationResult = Apollo.MutationResult<MoveTicketMutation>;
export type MoveTicketMutationOptions = Apollo.BaseMutationOptions<MoveTicketMutation, MoveTicketMutationVariables>;
export const UpdateColumnNameDocument = gql`
    mutation updateColumnName($colID: ID!, $name: String!) {
  updateColumn(input: {filter: {colID: [$colID]}, set: {name: $name}}) {
    column {
      ...columnDetails
    }
  }
}
    ${ColumnDetailsFragmentDoc}`;
export type UpdateColumnNameMutationFn = Apollo.MutationFunction<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>;

/**
 * __useUpdateColumnNameMutation__
 *
 * To run a mutation, you first call `useUpdateColumnNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnNameMutation, { data, loading, error }] = useUpdateColumnNameMutation({
 *   variables: {
 *      colID: // value for 'colID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateColumnNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>) {
        return Apollo.useMutation<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>(UpdateColumnNameDocument, baseOptions);
      }
export type UpdateColumnNameMutationHookResult = ReturnType<typeof useUpdateColumnNameMutation>;
export type UpdateColumnNameMutationResult = Apollo.MutationResult<UpdateColumnNameMutation>;
export type UpdateColumnNameMutationOptions = Apollo.BaseMutationOptions<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>;
export const AddCommentDocument = gql`
    mutation addComment($comment: AddCommentInput!) {
  addComment(input: [$comment]) {
    comment {
      id
      onTicket {
        id
        comments(order: {desc: datetime}) {
          ...commentDetails
        }
      }
    }
  }
}
    ${CommentDetailsFragmentDoc}`;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

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
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation updateComment($commentID: ID!, $commentPatch: CommentPatch!) {
  updateComment(input: {filter: {id: [$commentID]}, set: $commentPatch}) {
    comment {
      ...commentDetails
    }
  }
}
    ${CommentDetailsFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      commentID: // value for 'commentID'
 *      commentPatch: // value for 'commentPatch'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, baseOptions);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($commentID: ID!) {
  deleteComment(filter: {id: [$commentID]}) {
    comment {
      id
    }
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentID: // value for 'commentID'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;