/// Application routers.

import Listing from './views/Listing.vue';
import Configuration from './views/Configuration.vue';

const routes = [
  {
    path: '/',
    component: Listing
  },

  {
    path: '/config',
    component: Configuration
  }
]

import VueRouter from 'vue-router';
export default new VueRouter({
  routes,
  linkActiveClass: 'is-active',
  mode: 'history'
});