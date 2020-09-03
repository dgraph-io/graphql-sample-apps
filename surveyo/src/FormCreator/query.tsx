import {gql} from '@apollo/client';

export const ADD_FORM = gql`
  mutation AddForm($form: AddFormInput!) {
    addForm(input: [$form]) {
      form {
        id
      }
    }
  }
`;
