import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "./store";

Vue.use(VueRouter);

import Home from "./components/Home/Home";
import Project from "./components/Project/Project";
import Contacts from "./views/ContactPage";
import E404 from "./components/E404";

const routes = [
  {
    name: "home",
    path: "",
    component: Home,
    meta: {
      title: "Intsdev portfolio"
    }
  },
  {
    name: "project",
    path: "/project/:name",
    component: Project,
    props: true,
    meta: {
      title: route => {
        /* return custom title based on route, store or anything */
        return store.getters["projects/get"](route.params.name).title;
      }
    }
  },
  {
    name: "contacts",
    path: "/contacts",
    component: Contacts,
    meta: {
      title: "Contacts"
    }
  },
  {
    path: "*",
    component: E404,
    meta: {
      title: "Not found :("
    }
  }
];

const scrollBehavior = (to, from, savedPosition) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ x: 0, y: 0 }), 200);
  });
};

let router = new VueRouter({
  mode: "history",
  scrollBehavior,
  routes
});

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title =
      typeof to.meta.title === "function" ? to.meta.title(to) : to.meta.title;
  });
});

export default router;
