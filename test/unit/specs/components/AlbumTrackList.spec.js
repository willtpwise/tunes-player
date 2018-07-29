import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AlbumTrackList from '@/components/Album/AlbumTrackList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AlbumTrackList.vue', () => {
  let wrapper
  let propsData
  let store

  beforeEach(() => {
    wrapper = shallowMount(AlbumTrackList, {
      propsData,
      store,
      localVue
    })

    propsData = {
      tracks: []
    }

    store = new Vuex.Store({
      modules: {
        Audio: {
          namespaced: true,
          getters: {
            isPlaying: () => jest.fn()
          },
          actions: {
            setSong: jest.fn(),
            play: jest.fn()
          }
        }
      }
    })
  })

  it ('should set the song, then play it', () => {

    const track = {}

    wrapper.vm.setSong = jest.fn()
    wrapper.vm.play = jest.fn()

    wrapper.vm.handleSongSelection(track)

    expect(wrapper.vm.setSong).toHaveBeenCalledWith(track)
    expect(wrapper.vm.play).toHaveBeenCalled()
  })
})
