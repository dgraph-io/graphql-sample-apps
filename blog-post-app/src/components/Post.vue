<template>
  <div>
    <div v-for="post in queryPost" :key="post.postID">
      <div class="card col-12 mb-3">
        <div class="card-body card-pointer" v-on:click="viewPost(post.postID)">
          <h5 class="card-title">Title: {{ post.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            by {{ post.author.name }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ViewPost from "../views/ViewPost"
export default {
  props: ["queryPost"],
  methods: {
    viewPost(postID) {
      this.$router.push({
        path: "/view",
        name: "view",
        query: { postID: postID },
      });
    },
  },
};
</script>
