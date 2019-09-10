import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import zenodoModule from '@/store/zenodo'

Vue.use(Vuex)

const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  key: 'gerdi-submit-zenodo',
  modules: ['zenodo']
})

export default new Vuex.Store({
  modules: {
    zenodo: zenodoModule
  },
  plugins: [vuexSession.plugin]
})
