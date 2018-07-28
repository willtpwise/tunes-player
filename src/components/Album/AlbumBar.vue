<script>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import AudioController from '@/components/AudioController'
import AlbumTrackList from './AlbumTrackList'

const Album = namespace('Album')

@Component({
  components: {
    AudioController,
    AlbumTrackList
  }
})
export default class AlbumBar extends Vue {
  @Album.Action fetch
  @Album.State album
  @Album.State songs

  @Watch('$route', {
    deep: true
  })
  onRouteChange () {
    this.fetchFromRoute()
  }

  fetchFromRoute () {
    this.fetch(this.$route.params.albumId)
  }

  created () {
    this.fetchFromRoute()
  }
}
</script>

<template>
  <div class="album_bar" v-if="album">
    <figure class="album_bar-artwork">
      <img :src="album.artworkUrl100" :alt="album.collectionName">
    </figure>

    <div class="album_bar-controller">
      <audio-controller />
    </div>

    <album-track-list :tracks="songs" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.album_bar {
  padding: $space-base;
  background: #fff;
}

.album_bar-artwork {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  padding: 0;

  img {
    width: 100%;
  }
}

.album_bar-controller {
  padding: $space-base;
}
</style>
