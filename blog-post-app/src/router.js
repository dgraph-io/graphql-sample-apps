import Vue from "vue";
import Router from "vue-router";
// import Hello from "./components/HelloWorld.vue"
import PostList from "./views/PostList";
import ViewPost from "./views/ViewPost";
import CreatePost from "./views/CreatePost";
import EditPost from "./views/EditPost";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "posts",
      component: PostList,
    },
    {
      path: "/view",
      name: "view",
      component: ViewPost,
    },
    {
      path: "/create",
      name: "create",
      component: CreatePost,
    },
    {
      path: "/edit",
      name: "edit",
      component: EditPost,
    },
  ],
});

export default router;
