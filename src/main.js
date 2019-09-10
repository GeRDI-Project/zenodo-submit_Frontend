import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import SharedUI from "shared-ui";
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
axios.defaults.timeout = 15000;

Vue.use(BootstrapVue);
// register shared-ui components
Vue.use(SharedUI)//, {store: store})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
