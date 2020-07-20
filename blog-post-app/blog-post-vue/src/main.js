import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "../static/style.css";
import VueApollo from "vue-apollo";
import router from "./router";

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

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
