import AudioService from '@/services/Audio'

const service = new AudioService()

export default {
  namespaced: true,

  state: {
    song: null,
    playing: false
  },

  getters: {
    isPlaying: (state) => (trackId) => {
      return state.playing && state.song.trackId === trackId
    }
  },

  mutations: {
    setSong (state, payload) {
      state.song = payload
    },

    setPlaying (state, payload) {
      state.playing = payload
    }
  },

  actions: {
    play ({ commit }) {
      service.play()
      commit('setPlaying', true)
    },

    pause ({ commit }) {
      service.pause()
      commit('setPlaying', false)
    },

    setSong ({ commit }, song) {
      service.create(song.previewUrl)
      commit('setPlaying', false)

      service.onEnded = () => {
        commit('setSong', song)
        commit('setPlaying', false)
      }

      commit('setSong', song)
    }
  }
}
