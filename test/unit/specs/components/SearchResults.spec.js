import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SearchResults from '@/components/Search/SearchResults.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SearchResults.vue', () => {
  let wrapper
  let propsData
  let store

  beforeEach(() => {
    propsData = {
      results: []
    }

    store = new Vuex.Store({
      modules: {
        Audio: {
          namespaced: true,
          state: {
            song: null,
            playing: false
          },
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

    const $route = {
      query: {
        term: 'xyz'
      }
    }

    wrapper = shallowMount(SearchResults, {
      propsData,
      store,
      mocks: {
        $route
      },
      localVue
    })
  })

  it ('should set the song then play (on a mobile)', () => {
    wrapper.vm.play = jest.fn()
    wrapper.vm.setSong = jest.fn()

    wrapper.vm.playSongOnSelection = () => false
    wrapper.vm.handleSongSelection()
    expect(wrapper.vm.setSong).toHaveBeenCalled()
    expect(wrapper.vm.play).not.toHaveBeenCalled()

    wrapper.vm.playSongOnSelection = () => true
    wrapper.vm.handleSongSelection()
    expect(wrapper.vm.setSong).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.play).toHaveBeenCalledTimes(1)
  })

  it ('should determine if the screen is less than or equal to the mobile threshold', () => {
    let screenWidth
    wrapper.vm.screenWidth = () => screenWidth

    screenWidth = wrapper.vm.mobileThreshold + 1
    expect(wrapper.vm.playSongOnSelection()).toBe(false)

    screenWidth = wrapper.vm.mobileThreshold
    expect(wrapper.vm.playSongOnSelection()).toBe(true)

    screenWidth = wrapper.vm.mobileThreshold - 1
    expect(wrapper.vm.playSongOnSelection()).toBe(true)
  })

  it ('should return the desired route', () => {
    const generatedRoute = wrapper.vm.songRoute({
      collectionId: 'xyz'
    })

    expect(generatedRoute.name).toBe('Album')
    expect(generatedRoute.params).toEqual({ albumId: 'xyz' })
    expect(generatedRoute.query).toBeTruthy()
  })
})
