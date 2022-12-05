<template>
  <h3 class="typography-magical-headline">Projekte bei Swisscom</h3>
  <div class="timeline-wrapper">
    <TimeLine />

    <ul class="timeline" ref="ul-timeline">
      <ArticleItem
        v-for="(projects, index) in json"
        :key="index"
        :article="projects"
      />
    </ul>
  </div>
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
