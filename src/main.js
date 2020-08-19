import Vue from "vue";
import App from "./App.vue";
import { store } from "./store";
import router from "./routes";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/animate.min.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
