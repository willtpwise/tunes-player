<script>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { merge } from 'lodash'
import SearchCard from './SearchCard'

const Audio = namespace('Audio')

@Component({
  components: {
    SearchCard
  }
})
export default class SearchResults extends Vue {
  @Prop() results

  @Audio.State song
  @Audio.Action setSong
  @Audio.Action play
  @Audio.Getter isPlaying

  playSongOnSelection () {
    const screenWidth = document.body.clientWidth
    const mobileThreshold = 768

    return screenWidth <= mobileThreshold
  }

  handleSongSelection (song) {
    this.setSong(song)

    if (this.playSongOnSelection()) {
      this.play()
    }
  }

  songRoute ({ collectionId }) {
    return {
      name: 'Album',
      params: {
        albumId: collectionId
      },
      query: this.$route.query
    }
  }
}
</script>

<template>
  <div class="search_results">
    <ol>
      <li class="search_results-item" v-for="song in results" :key="song.trackId">
        <search-card
          :title="song.trackName"
          :artist="song.artistName"
          :album="song.collectionName"
          :artwork="song.artworkUrl100"
          :route="songRoute(song)"
          :playing="isPlaying(song.trackId)"
          @click.native="handleSongSelection(song)">
        </search-card>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.search_results {
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 0;
    margin: 0;
    border-bottom: 1px solid $grey-base;

    &:last-child {
      border: none;
    }
  }
}
</style>
