/// Application startup configuration.

import Vue from 'vue';
import axios from 'axios';

// Quick access to thirdparties.
window.Vue = Vue;
window.axios = axios;
window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
};

// Create a global vue object for cross-component communications.
window.Event = new class {
  constructor() {
    this.vue = new Vue();
  }

  fire(signal, data = null) {
    this.vue.$emit(signal, data);
  }

  listen(signal, cb) {
    this.vue.$on(signal, cb);
  }
}

// Tips Vue.js on the environment mode.
//Vue.config.productionTip = (process.env.NODE_ENV === 'production');