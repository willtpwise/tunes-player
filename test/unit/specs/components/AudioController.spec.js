import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AudioController from '@/components/AudioController.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AudioController.vue', () => {
  let wrapper
  let propsData
  let store

  beforeEach(() => {
    propsData = {
      tracks: []
    }

    store = new Vuex.Store({
      modules: {
        Audio: {
          namespaced: true,
          state: {
            song: null,
            playing: false
          },
          mutations: {
            setPlaying (state, payload) {
              state.playing = payload
            },
            setSong (state, payload) {
              state.song = payload
            }
          },
          actions: {
            pause: jest.fn(),
            play: jest.fn(),
            setPlaying ({ commit }, payload) {
              commit('setPlaying', payload)
            },
            setSong ({ commit }, payload) {
              commit('setSong', payload)
            }
          }
        }
      }
    })

    wrapper = shallowMount(AudioController, {
      propsData,
      store,
      localVue
    })
  })

  it ('should return the play / pause icon respectively', () => {
    wrapper.vm.pauseIcon = 'pause'
    wrapper.vm.playIcon = 'play'

    wrapper.vm.$store.dispatch('Audio/setPlaying', true)
    expect(wrapper.vm.icon).toBe('pause')

    wrapper.vm.$store.dispatch('Audio/setPlaying', false)
    expect(wrapper.vm.icon).toBe('play')
  })

  it ('should return appropriate assistive text', () => {
    wrapper.vm.pauseAssist = 'pause'
    wrapper.vm.playAssist = 'play'

    wrapper.vm.$store.dispatch('Audio/setPlaying', true)
    expect(wrapper.vm.assist).toBe('pause')

    wrapper.vm.$store.dispatch('Audio/setPlaying', false)
    expect(wrapper.vm.assist).toBe('play')
  })

  it ('should be disabled when there is no song', () => {
    wrapper.vm.$store.dispatch('Audio/setSong', {})
    expect(wrapper.vm.disabled).toBe(false)

    wrapper.vm.$store.dispatch('Audio/setSong', null)
    expect(wrapper.vm.disabled).toBe(true)
  })

  it ('should invert the play/pause state', () => {
    wrapper.vm.play = jest.fn()
    wrapper.vm.pause = jest.fn()

    wrapper.vm.$store.dispatch('Audio/setPlaying', true)
    wrapper.vm.toggle()
    expect(wrapper.vm.pause).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.play).toHaveBeenCalledTimes(0)

    wrapper.vm.$store.dispatch('Audio/setPlaying', false)
    wrapper.vm.toggle()
    expect(wrapper.vm.pause).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.play).toHaveBeenCalledTimes(1)
  })
})
