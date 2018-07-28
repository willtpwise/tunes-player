<script>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SearchField extends Vue {
  @Prop() value

  get term () {
    return this.value
  }
  set term (payload) {
    this.$emit('input', payload)

    this.pushTermToRoute(payload)
  }

  pushTermToRoute (term) {
    this.$router.push({
      query: { term }
    })
  }

  setTermFromRoute () {
    const routeTerm = this.$route.query.term
    if (routeTerm) {
      this.term = routeTerm
    }
  }

  created () {
    this.setTermFromRoute()
  }
}
</script>

<template>
  <form class="search_field">
    <label for="search_field-input" class="sr-only">
      Search artists
    </label>

    <input
      type="search"
      id="search_field-input"
      v-model="term"
      placeholder="Search artists">
  </form>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.search_field {
  padding: $space-base;
}

#search_field-input {
  font-size: 16px;
  border-radius: $radius-base;
  border: 1px solid $grey-base;
  padding: 8px;
  width: 100%;
  box-shadow: none;
  -webkit-appearance: none;
  outline: none;

  &:focus,
  &:hover {
    border-color: $brand-primary;
  }
}
</style>
