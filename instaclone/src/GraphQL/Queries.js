import { gql } from "@apollo/client";

export const QUERY_LOGGED_IN_USER = gql`
 subscription getUserInfo($userFilter: UserFilter!) {
    queryUser(filter: $userFilter) {
      email
      following {
        username
        avatarImageURL
        posts {
          id
          imageURL
          description
          likes
          postedBy {
            username
            avatarImageURL
          }
        }
      }
    }
  }
`;