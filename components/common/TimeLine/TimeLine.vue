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
      stroke="var(--color-fill-gray)"
      stroke-width="5"
      :d="pathD"
      :stroke-dashoffset="strokeDashoffset"
      :stroke-dasharray="strokeDasharray"
    ></path>
  </svg>
</template>

<script lang="ts" src="./TimeLine.script.ts"></script>
<style scoped src="./TimeLine.module.css"></style>
