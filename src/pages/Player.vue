<script>
import { Vue, Component, Prop } from 'vue-property-decorator'

import SearchBar from '@/components/Search/SearchBar'
import AlbumBar from '@/components/Album/AlbumBar'

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
}
</script>

<template>
  <article class="player" :class="{ 'player--open': playerOpen }">

    <aside class="player-aside">
      <search-bar />
    </aside>

    <main class="player-featured">
      <router-view />
    </main>

  </article>
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
