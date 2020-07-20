<template>
  <div class="container">
    <div class="h3 text-center">
      {{ post.title }}
      <span class="delete-post" v-on:click="deletePost(post.postID)">
        <i class="icon-trash" aria-hidden="true"></i>
      </span>
      <span class="edit-post" v-on:click="editPost(post.postID)">
        <i class="icon-edit" aria-hidden="true"></i>
      </span>
    </div>
    <hr />
    <div class="text-post">{{ post.text }}</div>
    <div>
      <button
        type="button"
        class="btn btn-primary btn-sm"
        v-on:click="updatePost(post)"
      >
        Likes <span class="badge badge-light">{{ post.numLikes }}</span>
      </button>
      <span class="tagsset-post">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="badge badge-secondary tag-post"
        >
          {{ tag }}
        </span>
      </span>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
const GET_POST = gql`
  query Post($postID: ID!) {
    getPost(postID: $postID) {
      postID
      title
      text
      tags
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

const DELETE_POST = gql`
  mutation deletePost($postID: ID!) {
    deletePost(filter: { postID: [$postID] }) {
      msg
    }
  }
`;

const POST_MUTATION = gql`
  mutation updatePost($postSet: PostPatch!, $postID: ID!) {
    updatePost(input: { filter: { postID: [$postID] }, set: $postSet }) {
      post {
        postID
        title
        text
        tags
        author {
          id
          name
        }
      }
    }
  }
`;
export default {
  data() {
    return {
      post: {},
      error: null,
    };
  },
  mounted() {
    let postID = this.$route.query.postID;
    this.$apollo
      .query({
        query: GET_POST,
        variables: {
          postID: postID,
        },
        fetchPolicy: "network-only",
      })
      .then((data) => {
        this.post = data.data.getPost;
      });
  },
  methods: {
    deletePost: function(postID) {
      this.$apollo
        .mutate({
          mutation: DELETE_POST,
          variables: {
            postID: postID,
          },
        })
        .then(() => {
          this.$router.push({
            path: "/",
            name: "posts",
          });
        });
    },
    editPost: function(postID) {
      this.$router.push({
        path: "/edit",
        name: "edit",
        query: { postID: postID },
      });
    },
    updatePost: function(post) {
      const postSet = {
        numLikes: post.numLikes + 1,
      };
      this.$apollo
        .mutate({
          mutation: POST_MUTATION,
          variables: {
            postSet: postSet,
            postID: post.postID,
          },
        })
        .then(() => {
          this.$router.push({
            path: "/",
            name: "posts",
          });
          this.$router.push({
            path: "/view",
            name: "view",
            query: { postID: post.postID },
          });
        });
    },
  },
};
</script>
