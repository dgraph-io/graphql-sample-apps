import gql from "graphql-tag";

export const ADD_USER = gql`
    mutation addUser($user: AddUserInput!){
        addUser(input: [$user]){
            user{
                username
                name
            }
        }
    }
`;

export const GET_USER = gql`
  query getUser($username: String!){
    getUser(username: $username) {
      username
      name
    }
  }
`;


export const ADD_POST = gql`
    mutation addPost($post: [AddPostInput!]!){
            addPost(input: $post){
                post{
                    text
                    createdby{
                        username
                    } 
                    tags{
                        name
                    }
                    timeStamp
            }
        }
    }
`;