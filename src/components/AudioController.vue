<script>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const Audio = namespace('Audio')

@Component
export default class AudioController extends Vue {
  @Audio.State playing
  @Audio.State song
  @Audio.Action play
  @Audio.Action pause

  playIcon = '/static/images/play-circle-regular.svg'
  pauseIcon = '/static/images/pause-circle-regular.svg'

  playAssist = 'Play'
  pauseAssist = 'Pause'

  get icon () {
    return this.playing ? this.pauseIcon : this.playIcon
  }

  get assist () {
    return this.playing ? this.pauseAssist : this.playAssist
  }

  get disabled () {
    return !this.song
  }

  toggle () {
    if (this.playing) {
      this.pause()
    } else {
      this.play()
    }
  }
}
</script>

<template>
  <div class="audio_controller">
    <button
      @click="toggle"
      :disabled="disabled"
      class="audio_controller-action"
      :aria-label="assist">
      <img :src="icon" :alt="assist">
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.audio_controller {
  text-align: center;
}

.audio_controller-action {
  border-radius: 50%;
  position: relative;
  background: transparent;
  border: 1px solid $grey-base;
  width: 50px;
  height: 50px;
  padding: 0;
  margin: 0;
  outline: none;
  cursor: pointer;
  transition: all 0.5s ease;

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not([disabled]) {
    &:focus {
      border-color: $brand-primary;
    }

    &:hover {
      background: $grey-light;
    }
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
  }
}
</style>
