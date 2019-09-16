import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
      name: 'browser',
      component: () => import(/* webpackChunkName: "filebrowser" */ './views/FileBrowser.vue')
    },
    {
      path: '/metadata',
      name: 'metadata',
      component: () => import(/* webpackChunkName: "metadata" */ './views/MetadataForm.vue')
    },
    {
      path: '/progress/:session',
      name: 'progress',
      component: () => import(/* webpackChunkName: "progress" */ './views/Progress.vue')
    },
    {
      path: '/error/:errorcode',
      name: 'error',
      component: () => import(/* webpackChunkName: "error" */ './views/Error.vue')
    }
  ]
})
