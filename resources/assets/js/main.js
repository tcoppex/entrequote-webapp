/// Application entrypoint.

import './bootstrap';

import App from './App.vue';
import router from './routes';

// Create the root div to hook our application.
const divRoot = document.createElement('div');
divRoot.setAttribute('id', 'root');
document.querySelector('body').appendChild(divRoot);

const app = new Vue({
  render: h => h(App),
  router
}).$mount('#root');