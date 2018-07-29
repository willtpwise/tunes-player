import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SearchBar from '@/components/Search/SearchBar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.useFakeTimers()

describe('SearchBar.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        Search: {
          namespaced: true,
          state: {
            results: []
          },
          actions: {
            search: jest.fn()
          }
        }
      }
    })

    wrapper = shallowMount(SearchBar, {
      store,
      localVue
    })
  })

  it ('should show the loader when handling the search', () => {
    wrapper.vm.searching = false

    wrapper.vm.search = () => {
      expect(wrapper.vm.searching).toBe(true)
    }

    wrapper.vm.handleSearch()
  })

  it ('should execute the search after Xms', () => {

    wrapper.vm.handleSearch = jest.fn()

    wrapper.vm.searchTerm = 'x'
    wrapper.vm.onSearchTermChange('y')

    jest.advanceTimersByTime(wrapper.vm.autoSearchTimeout)

    expect(wrapper.vm.handleSearch).toHaveBeenCalled()
  })

})
