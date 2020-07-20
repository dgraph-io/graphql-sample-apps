<template>
  <div id="app">
    <Header />
    <div>
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
