import module from '@/store/modules/Album'

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

describe('Album Store Module', () => {

  it ('should make an api request then commit the results', async () => {
    const context = {
      commit: jest.fn()
    }

    await module.actions.fetch(context, 'test')

    expect(mockPostCount).toBe(1)
    expect(context.commit).toHaveBeenCalledTimes(2)
  })

  it ('should pull the first record (the album) and store it', async () => {
    const state = {
      album: null
    }

    const payload = ['abc', 'xyz']

    module.mutations.setAlbum(state, payload)

    expect(state.album).toBe('abc')
  })

  it ('should filter out anything that isnt a song', async () => {
    const state = {
      songs: null
    }

    const payload = [
      { kind: 'something' },
      { kind: 'song' },
      { kind: 'somethingElse' },
      { kind: 'song' }
    ]

    module.mutations.setSongs(state, payload)

    expect(state.songs).toHaveLength(2)
    expect(state.songs[0].kind).toBe('song')
    expect(state.songs[1].kind).toBe('song')
  })

})
