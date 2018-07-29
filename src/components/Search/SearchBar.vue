<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import SearchField from './SearchField'
import SearchResults from './SearchResults'
import AudioController from '@/components/AudioController'
import Loader from '@/components/Loader'

const Search = namespace('Search')

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
      // TODO
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

    <div class="search_bar-controller">
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
