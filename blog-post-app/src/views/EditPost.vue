<template>
  <div class="container">
    <div class="form-group">
      <label htmlFor="authorSelect">Author:</label>
      <AuthorSelect v-bind:author="authorId" :method="changeAuthor" />
    </div>
    <div class="form-group">
      <label htmlFor="postTitle">Title:</label>
      <input
        id="postTitle"
        class="form-control"
        v-model="title"
        type="text"
        placeholder="Add Title"
      />
    </div>
    <div class="form-group">
      <label htmlFor="postTags">Tags (Press enter to add a tag):</label>
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        @tags-changed="(newTags) => (tags = newTags)"
      />
    </div>
    <div class="form-group">
      <label htmlFor="postText">Content:</label>
      <textarea
        id="postText"
        class="form-control"
        rows="15"
        cols="100"
        v-model="text"
        type="text"
        placeholder="Add your blog post"
      />
    </div>
    <button type="button" class="btn btn-primary" v-on:click="addPost()">
      Publish
    </button>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import AuthorSelect from "../components/AuthorSelect";
import gql from "graphql-tag";

const POST_MUTATION_TAGS = gql`
  mutation updatePost($postID: ID!, $postRemove: PostPatch!) {
    updatePost(input: { filter: { postID: [$postID] }, remove: $postRemove }) {
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

export default {
  components: {
    VueTagsInput,
    AuthorSelect,
  },
  data() {
    return {
      authorId: "",
      title: "Hello",
      text: "",
      tag: "",
      tags: [],
      removeTags: [],
      postID: "",
    };
  },
  mounted() {
    this.postID = this.$route.query.postID;
    this.$apollo
      .query({
        query: GET_POST,
        variables: {
          postID: this.postID,
        },
        fetchPolicy: "network-only",
      })
      .then((data) => {
        const post = data.data.getPost;
        this.title = post.title;
        this.text = post.text;
        this.tags = post.tags.map((tag) => {
          return { text: tag };
        });
        this.removeTags = post.tags;
        this.authorId = post.author.id;
      });
  },
  methods: {
    changeAuthor: function(authorId) {
      this.authorId = authorId;
    },
    addPost: async function() {
      const tagNames = this.tags.map((tag) => tag.text);

      const postRemove = {
        tags: this.removeTags,
      };

      await this.$apollo
        .mutate({
          mutation: POST_MUTATION_TAGS,
          variables: {
            postID: this.postID,
            postRemove: postRemove,
          },
        })
        .then((data) => {});
      const postSet = {
        title: this.title,
        text: this.text,
        tags: tagNames,
        isPublished: true,
        author: {
          id: this.authorId,
        },
      };

      await this.$apollo
        .mutate({
          mutation: POST_MUTATION,
          variables: {
            postSet: postSet,
            postID: this.postID,
          },
        })
        .then((data) => {
          this.$router.push({
            path: "/view",
            name: "view",
            query: { postID: this.postID },
          });
        });
    },
  },
};
</script>
