import Vue from 'vue';
import VueRouter from 'vue-router';
// import {store} from './store';

Vue.use(VueRouter);

import Home from './components/Home/Home';
import Project from './components/Project/Project';
import Contacts from './components/Contacts/Contacts';
import E404 from './components/E404';

const routes = [
  {
    name: 'home',
    path: '',
    component: Home,
  },
  {
    name: 'project',
    path: '/project/:name',
    component: Project,
    props: true
  },
  {
    name: 'contacts',
    path: '/contacts',
    component: Contacts
  },
  {
    path: '*',
    component: E404
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});