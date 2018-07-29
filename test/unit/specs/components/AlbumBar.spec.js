import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AlbumBar from '@/components/Album/AlbumBar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AlbumBar.vue', () => {

  const $route = {
    params: {
      albumId: '123'
    }
  }

  const fetch = jest.fn()
  const store = new Vuex.Store({
    modules: {
      Album: {
        namespaced: true,
        state: {
          album: {
            artworkUrl100: 'test',
            collectionName: 'test'
          },
          songs: []
        },
        actions: {
          fetch
        }
      }
    }
  })

  it ('should fetch from the URL params when the route changes', () => {
    const wrapper = shallowMount(AlbumBar, {
      mocks: {
        $route,
      },
      store,
      localVue
    })

    wrapper.vm.fetchFromRoute = jest.fn()

    wrapper.vm.onRouteChange()

    expect(wrapper.vm.fetchFromRoute).toHaveBeenCalled()
  })
})
