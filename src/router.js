import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/submit/zenodo/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signedin',
      name: 'signedin',
      component: () => import(/* webpackChunkName: "signedin" */ './views/Signedin.vue')
    },
    {
      path: '/browser',
      name: 'filebrowser',
      component: () => import(/* webpackChunkName: "filebrowser" */ './views/FileBrowser.vue')
    },
    {
      path: '/metadata',
      name: 'metadata',
      component: () => import(/* webpackChunkName: "metadata" */ './views/MetadataForm.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import(/* webpackChunkName: "error" */ './views/Error.vue')
    }
  ]
})
