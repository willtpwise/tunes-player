<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import miniToastr from 'mini-toastr'

import SearchField from './SearchField'
import SearchResults from './SearchResults'
import AudioController from '@/components/AudioController'
import Loader from '@/components/Loader'

const Search = namespace('Search')
const Audio = namespace('Audio')

@Component({
  components: {
    AudioController,
    SearchResults,
    SearchField,
    Loader
  }
})
export default class SearchBar extends Vue {
  @Search.Action search
  @Search.State results
  @Audio.State song

  searching = false
  searchTerm = null
  autoSearchTimeout = 1500

  @Watch('searchTerm')
  onSearchTermChange (phrase) {
    setTimeout(() => {
      if (phrase === this.searchTerm) {
        this.handleSearch()
      }
    }, this.autoSearchTimeout)
  }

  async handleSearch () {
    try {
      this.searching = true
      await this.search(this.searchTerm)
    } catch (e) {
      const title = 'Search failed'
      const message = 'Uh oh. The search operation failed. Try again soon'
      miniToastr.warn(message, title)
      console.error(e)
    } finally {
      this.searching = false
    }
  }
}
</script>

<template>
  <section class="search_bar" aria-labelledby="search_bar-title">
    <loader v-if="searching" />

    <h2 class="sr-only" id="search_bar-title">
      Search results
    </h2>

    <search-field v-model="searchTerm" @submit.native.prevent="handleSearch" />

    <search-results v-if="results.length" :results="results" />

    <div v-else class="search_bar-no_results">
      <h2>Nothing found...</h2>
      <p>Nothing could be found matching that search criteria</p>
    </div>

    <div class="search_bar-controller" v-if="song">
      <audio-controller />
    </div>

  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.search_bar {
  background: $grey-light;
  height: 100%;
  min-height: 100vh;
}

.search_bar-controller {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: $space-small;
  border-top: 1px solid $grey-base;
  background: inherit;
}

.search_bar-no_results {
  padding: $space-base;
}

@media screen and (max-width: $break-mobile) {
  .search_bar {
    position: relative;
    padding-bottom: 115px;
  }

  .search_bar-controller {
    display: block;
    box-shadow: -1px 0 3px rgba(#000, 0.15);
  }
}
</style>
