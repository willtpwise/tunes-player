<script>
import { Vue, Component, Prop } from 'vue-property-decorator'
import CurrentSongIndicator from '@/components/CurrentSongIndicator'

@Component({
  components: {
    CurrentSongIndicator
  }
})
export default class SearchCard extends Vue {
  @Prop() title
  @Prop() artist
  @Prop() album
  @Prop() artwork
  @Prop() playing
  @Prop() route
}
</script>

<template>
  <router-link :to="route" class="song_card" :class="{ 'song_card--playing': playing }">
    <figure class="song_card-artwork">
      <img :src="artwork" :alt="title">
    </figure>
    <div class="song_card-content">
      <div class="song_card-meta">
        <h3 class="song_card-title">
          <span class="sr-only">Song name: </span>
          {{ title }}
          <span v-if="playing" class="sr-only">(playing now)</span>
        </h3>
        <p class="song_card-artist">
          <span class="sr-only">Artist: </span>
          {{ artist }}
        </p>
        <p class="song_card-album">
          <span class="sr-only">Album: </span>
          {{ album }}
        </p>
      </div>

      <div class="song_card-indicator" v-if="playing">
        <current-song-indicator />
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.song_card {
  display: grid;
  grid-template-columns: 50px calc(100% - 50px);
  outline: none;
  position: relative;
  transition: all 0.5s ease;
  color: inherit;
  text-decoration: none;
  padding: $space-base;
  border: 1px solid transparent;
  background: $grey-light;

  &:hover {
    background: #fff;
  }

  &:focus,
  &.song_card--playing {
    border: 1px solid $brand-primary;
  }
}

.song_card-content {
  padding-left: $space-small;
}

.song_card-artwork {
  margin: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  border: 1px solid $grey-base;

  img {
    width: 100%;
  }
}

.song_card-title,
.song_card-artist,
.song_card-album {
  margin: 0 0 0.2em 0;
}

.song_card-title {
  font-size: 14px;
  padding-right: 25px;
}

.song_card-artist {
  font-size: 12px;
}

.song_card-album {
  font-size: 11px;
  color: $grey-dark;
}

.song_card-indicator {
  position: absolute;
  top: $space-base;
  right: $space-base;
}
</style>
