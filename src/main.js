import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import SharedUI from "shared-ui";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  Vue.use(SharedUI)
  Vue.prototype.$gerdi = { // Dev-mode hack
    aai: {
      enabled: true,
      isChecked: function () {
        return true
      },
      isAuthenticated: function () {
        return true
      },
      getIdToken: function () { // Insert token below
        return ''
      },
      getUser: function() {
        return {
          given_name: 'John',
          family_name: 'Doe'
        }
      },
      signInUserSilent: function() {
        return
      }
    }
  }
} else { // production mode
  Vue.use(SharedUI, {store: store})
}

Vue.use(BootstrapVue);
// register shared-ui components

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
