import Vue from "vue";
import App from "./App.vue";

import { store } from "./store";
import router from "./routes";

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

import "bootstrap/dist/css/bootstrap.css";
// import 'bootstrap-vue/dist/bootstrap-vue.css'
