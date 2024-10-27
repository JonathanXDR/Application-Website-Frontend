<template>
  <div
    v-animation="{ add: 'visible' }"
    class="loader-progress"
    role="img"
    aria-label="loading, please wait"
    :style="{
      'width': `${background ? 100 : progress}%`,
      '--color-secondary': colors.secondary,
    }"
  >
    <div
      class="loader-progress-indicator"
      :style="{
        '--progress-updated': background ? `-${100 - progress}%` : '0%',
        '--color-primary': colors.primary,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import type { ColorType } from '~/types/common/color'

withDefaults(
  defineProps<{
    progress: number
    colors?: ColorType
    background?: boolean
  }>(),
  {
    colors: () => ({
      primary: 'var(--color-fill-gray)',
      secondary: 'var(--color-fill-gray-secondary)',
    }),
    background: false,
  }
)
</script>

<style scoped>
.loader-progress.visible .loader-progress-indicator {
  --progress: var(--progress-updated);
  transition: transform 0.5s ease;
}
.loader-progress {
  /* background: var(--color-secondary); */
  background: var(--color-loading-background);
  border-radius: 4px;
  height: 8px;
  /* margin-top: 60px; */
  overflow: hidden;
  position: relative;
  z-index: 2;
}
.loader-progress-indicator {
  --progress: -100%;
  background: var(--color-primary);
  border-radius: 4px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: translateX(var(--progress));
  transform-origin: left;
  width: 100%;
}
</style>
