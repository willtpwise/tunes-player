<script>
import { Vue, Component, Prop } from 'vue-property-decorator'
import PlayingIndicatorIcon from '@/assets/images/volume-up-solid.svg'

@Component
export default class CurrentSongIndicator extends Vue {
  icon = PlayingIndicatorIcon
}
</script>

<template>
  <figure aria-hidden="true" class="current_song_indicator">
    <img :src="icon" alt="Now playing">
  </figure>
</template>

<style lang="scss" scoped>
.current_song_indicator {
  width: 15px;
  padding: 0;
  margin: 0;
  display: inline-block;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
