import request from '@/services/Request'
import qs from 'qs'

export default {
  namespaced: true,

  state: {
    results: []
  },

  mutations: {
    setResults (state, results) {
      state.results = results
    }
  },

  actions: {
    async search ({ commit }, term) {
      const payload = {
        term: encodeURIComponent(term),
        media: 'music',
        entity: 'song',
        attribute: 'artistTerm',
        limit: 15
      }

      const endpoint = `https://itunes.apple.com/search?${qs.stringify(payload)}`

      const { data } = await request.post(endpoint)

      commit('setResults', data.results)
    }
  }
}
