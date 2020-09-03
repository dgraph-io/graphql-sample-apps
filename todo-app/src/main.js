import Vue from "vue";
import App from "./App.vue";
import VueApollo from "vue-apollo";

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
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
