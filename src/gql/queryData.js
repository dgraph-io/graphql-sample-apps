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
      isMod
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
                    isApproved
                    numFlags
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
            id
            createdby{
              username
            }
            isApproved
            timeStamp
            likes{
              username
            }
            tags {
              name
            }
          }
        }
    }
`;

export const GET_UNAPPROVED_POST = gql`
query{
    queryPost(filter:{isApproved:false}){
      id
      text
      createdby{
        username
      }
      timeStamp
      likes {
        username
      }
      tags {
        name
      }
      isApproved
      flags{
        username
      }
      numFlags
      img
    }
  }
`;

export const GET_FLAGGED_POST = gql`
query{
  queryPost(filter:{numFlags:{ge:2}}){
    id
    text
    createdby{
      username
    }
    timeStamp
    likes {
      username
    }
    tags {
      name
    }
    isApproved
    flags {
      username
    }
    numFlags
    img
  }
}
`;

export const GET_APPROVED_POST = gql`
query{
    queryPost(filter:{isApproved:true,numFlags:{lt:2}}){
      id
      text
      createdby{
        username
      }
      timeStamp
      likes {
        username
      }
      isApproved
      tags{
          name
      }
      flags{
        username
      }
      numFlags
      img
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

export const APPROVE_POST = gql`
mutation updatePost($input:ID!,$flagArray:[UserRef!]!){
    updatePost(input:{
      filter: {id : [$input]},
      remove :{flags: $flagArray},
      set: {isApproved:true,numFlags:0}
    }){
      post{
        text
        createdby{
          username
        }
      }
    }
}
`;



export const LIKE_POST = gql`
mutation updatePost($input:ID!,$likes:[UserRef!]!){
    updatePost(input:{
      filter: {id : [$input]},
      set: {likes :$likes}
    }){
      post{
        id
      }
    }
}
`;

export const UNLIKE_POST = gql`
mutation updatePost($input:ID!,$likes:[UserRef!]!){
    updatePost(input:{
      filter: {id : [$input]},
      remove: {likes :$likes}
    }){
      post{
        id
      }
    }
}
`;

export const FLAG_POST = gql`
mutation updatePost($input:ID!,$flags:[UserRef!]!,$flagCnt:Int){
    updatePost(input:{
      filter: {id : [$input]},
      set: {flags :$flags,numFlags: $flagCnt}
    }){
      post{
        id
      }
    }
}
`;



export const UNFLAG_POST = gql`
mutation updatePost($input:ID!,$flags:[UserRef!]!,$flagCnt:Int){
  updatePost(input:{
    filter: {id : [$input]},
    remove: {flags :$flags},
    set: {numFlags: $flagCnt}
  }){
    post{
      id
    }
  }
}
`;


export const GET_RECENT_POSTS = gql`
query{
    queryPost(filter:{isApproved:true},order:{desc:timeStamp}){
      id
      text
      createdby{
        username
      }
      timeStamp
      tags{
          name
      }
      flags {
        username
      }
      img
    }
  }
`;

export const GET_OLDEST_POSTS = gql`
query{
    queryPost(filter:{isApproved:true,numFlags:{lt:2}},order:{asc:timeStamp}){
      id
      text
      createdby{
        username
      }
      timeStamp
      img
    }
  }
`;

export const GET_TAGS = gql`
query{
    queryTag {
      name
  }
}
`;

export const SEARCH_POSTS = gql`
query($text:String!){
  queryPost(filter:{text:{anyoftext:$text},isApproved:true,numFlags:{lt:2}}){
    text
    id
    createdby{
      username
    }
    isApproved
    timeStamp
    likes{
      username
    }
    tags{
        name
    }
    flags{
      username
    }
    numFlags
    img
  }
}
`;