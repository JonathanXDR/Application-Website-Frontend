<template>
  <svg
    ref="svg"
    class="svg-timeline"
    preserveAspectRatio="none"
    :height="ulHeight"
    :viewBox="viewBox"
    :xmlns="xmlns"
  >
    <path
      ref="path"
      class="path-timeline"
      :d="pathD"
      fill="none"
      fill-rule="evenodd"
      stroke-width="5"
      stroke="var(--color-fill-gray)"
      stroke-linecap="butt"
      stroke-miterlimit="10"
      :stroke-dashoffset="strokeDashoffset"
      :stroke-dasharray="strokeDasharray"
    ></path>
  </svg>
</template>

<script lang="ts" src="./TimeLine.ts"></script>
<style scoped src="./TimeLine.css"></style>
