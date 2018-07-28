<script>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Loader extends Vue {
}
</script>

<template>
  <div class="loader" aria-hidden="true">
    <div class="loader-progress"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

.loader-progress {
  width: 0;
  height: 100%;
  background: $brand-primary;
  animation: load 0.8s ease;
}

@keyframes load {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
