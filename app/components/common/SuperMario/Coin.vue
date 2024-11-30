<template>
  <div :class="['mario-coin', { pause: !isPlaying }]" />
</template>

<script setup lang="ts">
defineProps<{
  isPlaying: boolean
}>()
</script>

<style scoped>
.mario-coin {
  width: 128px;
  height: 128px;
  background: url('~~/public/mario/bg-mario.png') no-repeat 0 -256px;
  animation: marioCoin 0.6s steps(4) infinite;
  pointer-events: none;
}
.mario-coin.pause {
  animation-play-state: paused;
}
.preview > .mario-coin {
  margin: 10rem auto 3rem;
}
@keyframes marioCoin {
  to {
    background-position: -512px -256px;
  }
}
</style>
