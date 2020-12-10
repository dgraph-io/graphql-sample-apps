import {gql} from '@apollo/client';

export const GET_FORM = gql`
  query GetForm($id: ID!) {
    getForm(id: $id) {
      id
      title
      isClosed
      fields(order: {asc: order}) {
        id
        title
        type
        required
        options(order: {asc: order}) {
          id
          title
        }
        count
      }
    }
  }
`;

export const ADD_RESPONSE = gql`
  mutation AddResponse($response: AddResponseInput!) {
    addResponse(input: [$response]) {
      response {
        id
      }
    }
  }
`;
