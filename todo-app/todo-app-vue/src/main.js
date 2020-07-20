import Vue from "vue";
import App from "./TodoApp.vue";
import VueApollo from "vue-apollo";
import "todomvc-app-css/index.css";

import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-boost";

Vue.use(VueApollo);

Vue.config.productionTip = false;

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

var app = new Vue({
  apolloProvider,
  render: (h) => h(App),
})

app.$mount("#app");
