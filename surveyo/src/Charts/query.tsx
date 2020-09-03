import {gql} from '@apollo/client';

export const GET_CHART_DATA = gql`
  query GetChartData($id: ID!) {
    getForm(id: $id) {
      title
      fields {
        title
        type
        count
        entries {
          rating
          singleChoice {
            title
          }
          text
        }
      }
    }
  }
`;
