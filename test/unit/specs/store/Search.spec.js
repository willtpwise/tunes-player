import module from '@/store/modules/Search'

let mockPostCount = 0

jest.mock('@/services/Request', () => {
  return {
    post: () => {
      mockPostCount ++

      return {
        data: {
          results: []
        }
      }
    }
  }
})

describe('Search Store Module', () => {

  it ('should make an api request then commit the results', async () => {
    const context = {
      commit: jest.fn()
    }

    await module.actions.search(context, 'test')

    expect(mockPostCount).toBe(1)
    expect(context.commit).toHaveBeenCalled()
  })

  it ('should store the payload', async () => {
    const state = {
      results: null
    }

    const payload = ['abc', 'xyz']

    module.mutations.setResults(state, payload)

    expect(state.results).toEqual(payload)
  })

})
