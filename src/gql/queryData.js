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
            }
        }
    }
`;


export const GET_POST_FOR_USER = gql`
query queryUser($input: String!){
    queryUser(filter:{username:{eq:$input}}){
      name
      posts(filter:{isApproved:true}){
        text
      }
    }
  }
`;

export const SEARCH_POST_BY_TAG = gql`
    query queryTag($input:String!) {
        queryTag(filter:{name: {alloftext: $input} }) {
        name
        posts{
            text
        }
        }
    }
`;

export const GET_UNAPPROVED_POST = gql`
query{
    queryPost(filter:{isApproved:false}){
      text
      createdby{
        username
      }
      isApproved
    }
  }
`;

export const UPDATE_POST = gql`
mutation updatePost($input: UpdatePostInput!){
    updatePost(input: $input){
      post{
        text
        isApproved
      }
    }
  }
`;  

export const DELETE_POST = gql`
mutation deletePost($input: PostFilter!){
    deletePost(filter: $input){
      post{
        text
      }
      msg
    } 
}
`;