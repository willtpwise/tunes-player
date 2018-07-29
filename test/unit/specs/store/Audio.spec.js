import module from '@/store/modules/Audio'

let mockPostCount = 0

jest.mock('@/services/Audio', () => {
  return class AudioService {
    play() {}
    pause() {}
    create() {}
  }
})

describe('Audio Store Module', () => {

  it ('should set the playing state', async () => {
    const context = {
      commit: jest.fn()
    }

    module.actions.play(context)
    expect(context.commit).toHaveBeenCalledWith('setPlaying', true)
  })

  it ('should stop playing then set the new song', async () => {
    const context = {
      commit: jest.fn()
    }

    const song = 'new song'

    module.actions.setSong(context, song)

    expect(context.commit).toHaveBeenCalledWith('setPlaying', false)
    expect(context.commit).toHaveBeenCalledWith('setSong', song)
  })

  it ('should set the song', async () => {
    const state = {
      song: null
    }

    const song = 'new song'

    module.mutations.setSong(state, song)

    expect(state.song).toEqual(song)
  })

  it ('should set the playing state', async () => {
    const state = {
      playing: false
    }

    module.mutations.setPlaying(state, true)

    expect(state.playing).toBe(true)
  })

})
