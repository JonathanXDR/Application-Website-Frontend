<template>
  <svg
    id="svg-timeline"
    ref="svg-timeline"
    preserveAspectRatio="none"
    :height="totalLength"
  >
    <path
      :style="{
        strokeDashoffset: totalLength,
        strokeDasharray: scrollPosition,
      }"
      ref="path-timeline"
      class="path-timeline"
      :d="`M 4 0 L 4 ${totalLength}`"
      stroke-width="5"
      fill="none"
      fill-rule="evenodd"
      stroke="var(--color-fill-gray)"
      stroke-linecap="butt"
      stroke-miterlimit="10"
    ></path>
  </svg>
</template>

<script lang="ts" src="./TimeLine.ts"></script>
<style scoped src="./TimeLine.css"></style>
