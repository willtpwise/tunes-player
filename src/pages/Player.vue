<script>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import SearchBar from '@/components/Search/SearchBar'
import AlbumBar from '@/components/Album/AlbumBar'

const Search = namespace('Search')

@Component({
  components: {
    SearchBar,
    AlbumBar
  }
})
export default class Player extends Vue {

  get playerOpen () {
    return this.$route.name === 'Album'
  }

  created () {
    console.log(this)
  }
}
</script>

<template>
  <div class="player" :class="{ 'player--open': playerOpen }">
    <search-bar class="player-aside" />

    <div class="player-featured">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.player {
  display: grid;
  grid-template-columns: 100%;

  &.player--open {
    grid-template-columns: 30% 70%;

    .player-featured {
      display: block;
    }
  }
}

@media screen and (max-width: $break-mobile) {
  .player {
    display: block;
  }

  .player-featured {
    display: none !important;
  }
}
</style>
