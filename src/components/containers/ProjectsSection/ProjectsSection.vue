<template>
  <h3 class="typography-magical-headline">
    {{ props.title }}
  </h3>
  <SegmentNav @update:selectedIndex="updateSelectedIndex" />
  <div class="timeline-wrapper" v-if="projects[selectedCategory].length">
    <TimeLine />
    <ul ref="ul" class="timeline">
      <ArticleItem
        v-for="(project, index) in projects[selectedCategory]"
        :key="index"
        :article="project"
      />
    </ul>
  </div>
  <LoadingSpinner v-else class="center-horizontal center-vertical" style="padding-top: 100px" />
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
