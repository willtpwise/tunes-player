<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  msg = 'Hello world'
}
</script>

<style scoped>
  /* ... */
</style>
