<template>
  <h3 class="typography-magical-headline">Projekte bei Swisscom</h3>
  <div class="timeline-wrapper">
    <svg ref="svgTimeline" id="svg-timeline" preserveAspectRatio="none">
      <path
        ref="pathTimeline"
        class="path-timeline"
        stroke-width="5"
        fill="none"
        fill-rule="evenodd"
        stroke="var(--color-fill-gray)"
        stroke-linecap="butt"
        stroke-miterlimit="10"
      ></path>
    </svg>

    <ul class="timeline" ref="ulTimeline">
      <ArticleItem
        v-for="(projects, index) in data"
        :key="index"
        :article="projects"
      />
    </ul>
  </div>
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
