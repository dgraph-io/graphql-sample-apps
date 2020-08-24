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
      }
    }
  }
`;
