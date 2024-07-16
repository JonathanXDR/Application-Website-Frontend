<template>
  <div class="loader-progress" role="img" aria-label="loading, please wait">
    <div
      class="loader-progress-indicator"
      :style="`--progress: ${progress}%`"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  progress: number;
}>();
</script>

<style scoped>
.loader-progress-indicator {
  transition: transform 0.5s ease;
}
.loader-progress {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  height: 8px;
  margin-top: 60px;
  overflow: hidden;
  position: relative;
  width: 338px;
  z-index: 2;
}
@media only screen and (max-width: 734px) {
  .loader-progress {
    width: 248px;
  }
}
.loader-progress-indicator {
  --progress: -100%;
  background: #000;
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
