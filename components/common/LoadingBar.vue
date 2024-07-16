<template>
  <div
    class="loader-progress"
    role="img"
    aria-label="loading, please wait"
    :style="`--color-secondary: ${colors.secondary}`"
  >
    <div
      class="loader-progress-indicator"
      :style="`
      --progress: -${progress}%;
      --color-primary: ${colors.primary};
    
      `"
    />
  </div>
</template>

<script setup lang="ts">
import type { ColorType } from "~/types/common/Color";

withDefaults(
  defineProps<{
    progress: number;
    colors?: ColorType;
  }>(),
  {
    colors: () => ({
      primary: "var(--color-fill-gray)",
      secondary: "var(--color-fill-gray-secondary)",
    }),
  },
);
</script>

<style scoped>
.loader-progress-indicator {
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
  width: 100%;
  z-index: 2;
}
@media only screen and (max-width: 734px) {
  .loader-progress {
    width: 248px;
  }
}
.loader-progress-indicator {
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
