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
    try {
      this.fetch(this.$route.params.albumId)
    } catch (e) {
      const title = 'Album not available'
      const message = `Uh oh. The album you're looking for isn't available at the moment. Try again soon`
      miniToastr.warn(message, title)
      console.error(e)
    }
  }

  created () {
    this.fetchFromRoute()
  }
}
</script>

<template>
  <div class="album_bar" v-if="album">
    <section role="region">
      <figure class="album_bar-artwork">
        <img :src="album.artworkUrl100" :alt="album.collectionName">
      </figure>

      <div class="album_bar-controller">
        <audio-controller />
      </div>
    </section>

    <section role="region">
      <album-track-list :tracks="songs" />
    </section>
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
