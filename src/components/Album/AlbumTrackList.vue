<script>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import CurrentSongIndicator from '@/components/CurrentSongIndicator'

const Audio = namespace('Audio')

@Component({
  components: {
    CurrentSongIndicator
  }
})
export default class AlbumTrackList extends Vue {
  @Audio.Action setSong
  @Audio.Action play
  @Audio.Getter isPlaying

  @Prop() tracks

  handleSongSelection (track) {
    this.setSong(track)
    this.play()
  }
}
</script>

<template>
  <ol class="album_track_list">
    <li v-for="track in tracks" :key="track.trackId">
      <button @click="handleSongSelection(track)" title="Click to play">
        <div class="album_track_list-label">
          {{ track.trackName }}
        </div>

        <div class="album_track_list-indicator" v-if="isPlaying(track.trackId)">
          <current-song-indicator />
        </div>
      </button>
    </li>
  </ol>
</template>

<style lang="scss" scoped>

@import "@/assets/variables.scss";

.album_track_list {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 0;
    position: relative;
  }

  button {
    background: none;
    padding: $space-small;
    text-align: left;
    border: 1px solid transparent;
    border-bottom-color: $grey-base;
    width: 100%;
    outline: none;
    display: flex;
    flex-flow: row wrap;
    cursor: pointer;

    &:focus {
      border-color: $brand-primary;
    }
  }
}

.album_track_list-indicator {
  width: 25px;
  margin-left: auto;
  text-align: right;
}
</style>
