<template>
  <div class="container">
    <Post v-bind:query-post="queryPost" />
  </div>
</template>

<script>
import gql from "graphql-tag";
import Post from "../components/Post";
const GET_FILTERED_BLOG_POSTS = gql`
  query Post($search: String!) {
    queryPost(
      filter: {
        or: {
          title: { anyoftext: $search }
          or: { text: { anyoftext: $search } }
        }
        tags: { eq: $search }
      }
    ) {
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
  {
    queryPost {
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

export default {
  name: "posts",
  components: {
    Post,
  },
  mounted() {
    let search = "";
    if (Object.keys(this.$route.query).length !== 0) {
      search = this.$route.query.search;
    }
    let query = GET_FILTERED_BLOG_POSTS;
    if (search === "") {
      query = GET_ALL_BLOG_POSTS;
    }
    this.$apollo
      .query({
        query: query,
        variables: {
          search: search,
        },
        fetchPolicy: "network-only",
      })
      .then((data) => {
        if (data.data.queryPost.length) {
          this.queryPost = data.data.queryPost;
        }
      });
  },
  data() {
    return {
      queryPost: [],
      error: null,
    };
  },
};
</script>
