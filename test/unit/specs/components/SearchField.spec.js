import { shallowMount } from '@vue/test-utils'
import SearchField from '@/components/Search/SearchField.vue'

describe('SearchField.vue', () => {
  let wrapper

  beforeEach(() => {
    const $route = {
      query: {
        term: 'xyz'
      }
    }

    const $router = {
      push: jest.fn()
    }

    const propsData = {
      value: 'xyz'
    }

    wrapper = shallowMount(SearchField, {
      mocks: {
        $route,
        $router
      },
      propsData
    })
  })

  it ('should proxy the value prop', () => {
    expect(wrapper.vm.term).toEqual(wrapper.vm.value)

    wrapper.vm.term = 'blah'
    expect(wrapper.emitted().input[1][0]).toBe('blah')
  })

  it ('should push the term to the route when changed', () => {
    wrapper.vm.pushTermToRoute = jest.fn()

    wrapper.vm.term = 'blah blah'
    expect(wrapper.vm.pushTermToRoute).toHaveBeenCalled()
  })

  it ('should update the route', () => {
    wrapper.vm.pushTermToRoute('xyz')

    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })

  it ('should set the term from the route (if the term is available)', () => {
    wrapper.vm.term = 'initial val'

    wrapper.vm.$route = { query: {} }
    wrapper.vm.setTermFromRoute()
    expect(wrapper.emitted().input[1][0]).toBe('initial val')

    wrapper.vm.$route.query = { term: 'new val' }
    wrapper.vm.setTermFromRoute()
    expect(wrapper.emitted().input[2][0]).toBe('new val')
  })

})
