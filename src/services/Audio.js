
export default class AudioService {
  onEnded = null
  audioElement = null

  constructor (onEnded) {
    this.onEnded = onEnded
  }

  create (source) {
    this.destroyAudioElement(this.audioElement)
    this.audioElement = this.createAudioElement(source)
  }

  play () {
    this.audioElement.play()
  }

  pause () {
    this.audioElement.pause()
  }

  createAudioElement (source) {
    const audioEl = document.createElement('audio')
    const sourceEl = document.createElement('source')

    sourceEl.src = source
    sourceEl.setAttribute('type', 'audio/mp4')

    audioEl.addEventListener('ended', () => {
      if (typeof this.onEnded === 'function') {
        this.onEnded()
      }
    })

    audioEl.appendChild(sourceEl)
    document.body.appendChild(audioEl)

    return audioEl
  }

  destroyAudioElement (element) {
    if (element) {
      element.parentNode.removeChild(element)
    }
  }

}
