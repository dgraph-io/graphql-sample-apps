<template>
  <nav class="navbar navbar-expand">
    <span class="navbar-brand"><h3>Dgraph GraphQL Blog</h3></span>
    <div class="navbar-collapse navbar-direction">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            Feed
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">
            Add Article
          </router-link>
        </li>
        <li class="nav-item">
          <input
            id="search"
            class="form-control"
            v-on:change="filterPosts($event.target.value)"
            type="text"
            placeholder="Search"
          />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    filterPosts: function(filterValue) {
      this.$router.push({
        path: "/",
        name: "posts",
        query: { search: filterValue },
      });
    },
  },
};
</script>
