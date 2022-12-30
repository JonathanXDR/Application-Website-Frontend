<template>
  <svg
    ref="svg"
    class="svg-timeline"
    :viewBox="viewBox"
    :xmlns="xmlns"
    :height="ulHeight"
  >
    <path
      ref="path"
      class="path-timeline"
      :d="pathD"
      stroke="var(--color-fill-gray)"
      stroke-width="5"
      :stroke-dashoffset="strokeDashoffset"
      :stroke-dasharray="strokeDasharray"
    ></path>
  </svg>
</template>

<script lang="ts" src="./TimeLine.ts"></script>
<style scoped src="./TimeLine.css"></style>
