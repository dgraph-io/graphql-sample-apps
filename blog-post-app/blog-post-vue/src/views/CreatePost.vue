<template>
  <div class="container">
    <hr />
    <div class="form-group">
      <label htmlFor="authorSelect">Author:</label>
      <AuthorSelect :method="changeAuthor" />
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

const POST_MUTATION = gql`
  mutation addPost($post: [AddPostInput!]!) {
    addPost(input: $post) {
      post {
        postID
        title
        text
        author {
          id
          name
        }
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
    };
  },
  methods: {
    changeAuthor: function(authorId) {
      this.authorId = authorId;
    },
    addPost: function() {
      const tagNames = this.tags.map((tag) => tag.text);

      const post = [
        {
          title: this.title,
          text: this.text,
          tags: tagNames,
          isPublished: true,
          author: {
            id: this.authorId,
          },
        },
      ];

      this.$apollo
        .mutate({
          mutation: POST_MUTATION,
          variables: {
            post: post,
          },
        })
        .then(() => {
          this.$router.push({
            path: "/",
            name: "posts",
          });
        });
    },
  },
};
</script>
