import {gql} from '@apollo/client';

export const GET_FORMS = gql`
  query GetSurveys($email: String!) {
    getUser(email: $email) {
      forms {
        id
        title
        responses {
          id
        }
        isClosed
      }
    }
  }
`;

export const DELETE_FORM = gql`
  mutation DeleteForm($id: ID!) {
    deleteForm(filter: {id: [$id]}) {
      form {
        id
      }
    }
  }
`;

export const UPDATE_FORM = gql`
  mutation UpdateForm($id: ID!, $isClosed: Boolean!) {
    updateForm(input: {filter: {id: [$id]}, set: {isClosed: $isClosed}}) {
      numUids
      form {
        isClosed
      }
    }
  }
`;

export const GET_CSV = gql`
  query GetCsvResponses($id: ID!) {
    getForm(id: $id) {
      isClosed
      fields(order: {asc: order}) {
        id
        type
        title
      }
      responses {
        entries {
          field {
            id
          }
          date
          netPromoterScore
          rating
          singleChoice @cascade {
            title
          }
          text
        }
      }
    }
  }
`;
