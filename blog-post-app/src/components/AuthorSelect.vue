<template>
  <div>
    <select
      id="authorSelect"
      v-model="authorId"
      v-on:change="onAuthorChange($event.target.value)"
      class="form-control"
    >
      <option v-for="author in authorList" :key="author.id" :value="author.id">
        {{ author.name }}
      </option>
    </select>
  </div>
</template>

<script>
import gql from "graphql-tag";
const GET_AUTHORS = gql`
  {
    queryAuthor {
      id
      name
    }
  }
`;
export default {
  props: ["author", "method"],
  data() {
    return {
      authorList: [{ id: "default", name: "Select an Author" }],
      authorId: "Select Author",
    };
  },
  watch: {
    author: {
      handler: function() {
        if (this.author !== undefined) {
          this.authorId = this.author;
        } else {
          this.authorId = this.authorList[0].id;
        }
        this.method(this.authorId);
      },
      immediate: true,
    },
  },
  mounted() {
    this.$apollo
      .query({
        query: GET_AUTHORS,
        fetchPolicy: "network-only",
      })
      .then((data) => {
        this.authorList = data.data.queryAuthor;

        if (this.author !== undefined) {
          this.authorId = this.author;
        } else {
          this.authorId = this.authorList[0].id;
        }
        this.method(this.authorId);
      });
  },
  methods: {
    onAuthorChange: function() {
      this.method(this.authorId);
    },
  },
};
</script>
