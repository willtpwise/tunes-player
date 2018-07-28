import request from '@/services/Request'
import qs from 'qs'

export default {
  namespaced: true,

  state: {
    album: null,
    songs: null
  },

  mutations: {
    setAlbum (state, payload) {
      state.album = payload[0]
    },

    setSongs (state, payload) {
      state.songs = payload.filter((record) => {
        return record.kind === 'song'
      })
    }
  },

  actions: {
    async fetch ({ commit }, id) {
      const payload = {
        id,
        media: 'music',
        entity: 'song',
        limit: 30
      }

      const endpoint = `https://itunes.apple.com/lookup?${qs.stringify(payload)}`

      const { data } = await request.post(endpoint)

      commit('setAlbum', data.results)
      commit('setSongs', data.results)
    }
  }
}
