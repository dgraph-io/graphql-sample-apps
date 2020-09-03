import React from "react";
import Post from "./Post";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks"
import queryString from 'query-string'

/*
Dgraph's GraphQL layer takes in a GraphQL schema file with the type definitions.
Then, it autogenerates the queries and mutation APIs for the same.

The schema.graphql file in the root of the repo contains all the
GraphQL types which are used as inputs to Dgraph.

From the schema you can see that the GraphQL type for a post look like this,

type Post {
        postID: ID!
        title: String! @search(by: [term, fulltext])
        text: String @search(by: [fulltext])
        tags: [String] @search(by: [exact])
        topic: String @search(by: [exact])
        numLikes: Int @search
        isPublished: Boolean @search
        postType: PostType @search
        author: Author! @hasInverse(field: posts)
}

Dgraph's GraphQL layer auto-generates the following queries and mutation API's
corresponding to the above GraphQL type.

1. getPost(postID: ID!): Post
2. addPost(input: [AddPostInput!]!): AddPostPayload
3. updatePost(input: UpdatePostInput!): UpdatePostPayload
4. deletePost(filter: PostFilter!): DeletePostPayload

*/

const GET_FILTERED_BLOG_POSTS = gql`
  query Post($search: String!){
    queryPost(filter:{or: {title: {anyoftext: $search}, or:{text:{anyoftext:$search}}}, tags:{eq:$search}}){
      postID
      title
      text
      numLikes
      isPublished
      author {
        id
        name
        dob
      }
    }
  }
`;

const GET_ALL_BLOG_POSTS = gql`
  { queryPost {
      postID
      title
      text
      numLikes
      isPublished
      author {
        id
        name
        dob
      }
    }
  }
`;

export default function PostList(props) {
  let params, search = "";
  if (props.location.search !== "") {
      params = queryString.parse(props.location.search)
      search = params.search;  
  } 
  let query = GET_FILTERED_BLOG_POSTS;
  if (search === "") {
    query = GET_ALL_BLOG_POSTS;
  }

  const {loading, error, data } = useQuery(query, {variables: { search }, fetchPolicy: "network-only"});
  if (loading) return "Fetching Posts...";
  if (error) return `Error: ${error}`;
  const posts = data.queryPost;
        
  return (
          <div className="container">
            {posts.map(post => (
              <Post key={post.postID} post={post} />
            ))}
          </div>
    );
}
