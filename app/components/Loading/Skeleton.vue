<script setup lang="ts">
defineProps<{
  width: string
  height: string
}>()
</script>

<template>
  <span
    class="loading-skeleton"
    :style="{
      width: width,
      height: height,
    }"
  />
</template>

<style scoped>
.loading-skeleton {
  --animation-duration: 1.5s;
  --animation-direction: normal;
  --pseudo-element-display: block;
  background-color: var(--base-color);
  width: 100%;
  border-radius: 0.25rem;
  display: inline-flex;
  line-height: 1;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.loading-skeleton:after {
  content: "";
  display: var(--pseudo-element-display);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(
    90deg,
    var(--base-color),
    var(--highlight-color),
    var(--base-color)
  );
  transform: translateX(-100%);
  animation-name: loading-skeleton;
  animation-direction: var(--animation-direction);
  animation-duration: var(--animation-duration);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
@keyframes loading-skeleton {
  to {
    transform: translateX(100%);
  }
}
</style>
