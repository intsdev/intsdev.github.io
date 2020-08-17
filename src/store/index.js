import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import projects from "./modules/projects";
import contacts from "./modules/contacts";

export const store = new Vuex.Store({
  modules: {
    projects,
    contacts
  },
  strict: process.env.NODE_ENV !== "production"
});
