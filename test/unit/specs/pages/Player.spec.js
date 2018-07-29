import { shallowMount } from '@vue/test-utils'
import Player from '@/pages/Player.vue'

describe('Player.vue', () => {

  it('should be open', () => {
    const wrapper = shallowMount(Player, {
      mocks: {
        $route: {
          name: 'Something'
        }
      },
      stubs: ['router-view']
    })
    expect(wrapper.vm.playerOpen).toEqual(false)
  })

  it('should be closed', () => {
    const wrapper = shallowMount(Player, {
      mocks: {
        $route: {
          name: 'Album'
        }
      },
      stubs: ['router-view']
    })
    expect(wrapper.vm.playerOpen).toEqual(true)
  })

})
