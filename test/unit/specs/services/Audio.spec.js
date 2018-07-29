import AudioService from '@/services/Audio'

describe('Audio Service', () => {
  let service
  beforeEach(() => {
    service = new AudioService()
  })

  it ('should destroy the existing audio element, then create a new one', () => {
    const order = []

    service.createAudioElement = () => order.push('create')
    service.destroyAudioElement = () => order.push('destroy')

    service.create('xyz')

    expect(order).toEqual(['destroy', 'create'])
  })

  it ('should proxy the audioElement play / pause', () => {
    service.audioElement = {
      play: jest.fn(),
      pause: jest.fn()
    }

    service.play()
    expect(service.audioElement.play).toHaveBeenCalled()

    service.pause()
    expect(service.audioElement.pause).toHaveBeenCalled()
  })

  it ('should create an audio element', () => {
    const element = service.createAudioElement('test')

    expect(element.tagName).toBe('AUDIO')
    expect(element.children[0].tagName).toBe('SOURCE')
    expect(element.children[0].src).toBe('test')
  })

  it ('should destroy the element', () => {
    const environment = document.createElement('div')
    const child = document.createElement('div')
    environment.appendChild(child)

    expect(environment.children.length).toBe(1)
    service.destroyAudioElement(child)
    expect(environment.children.length).toBe(0)
  })

  it ('should destroy the old element, create a new one and store it', () => {
    service.destroyAudioElement = jest.fn()
    service.createAudioElement = jest.fn(() => 'test')

    service.create('xyz')

    expect(service.destroyAudioElement).toHaveBeenCalled()
    expect(service.createAudioElement).toHaveBeenCalled()
    expect(service.audioElement).toBe('test')
  })
})
