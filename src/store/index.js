import Vue from 'vue'
import Vuex from 'vuex'

import Search from './modules/Search'
import Album from './modules/Album'
import Audio from './modules/Audio'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Search,
    Album,
    Audio
  }
})
