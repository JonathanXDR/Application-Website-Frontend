<template>
  <h3 class="typography-magical-headline">
    {{ props.title }}
  </h3>
  <SegmentNav @update:selectedIndex="updateSelectedIndex" />
  <div
    class="timeline-wrapper"
    v-if="projects.personal.length && projects.swisscom.length && projects.school.length"
  >
    <TimeLine />

    <ul ref="ul" class="timeline" v-if="selectedCategory === 'swisscom'">
      <ArticleItem v-for="(project, index) in projects.swisscom" :key="index" :article="project" />
    </ul>
    <ul ref="ul" class="timeline" v-if="selectedCategory === 'personal'">
      <ArticleItem v-for="(project, index) in projects.personal" :key="index" :article="project" />
    </ul>
    <ul ref="ul" class="timeline" v-if="selectedCategory === 'school'">
      <ArticleItem v-for="(project, index) in projects.school" :key="index" :article="project" />
    </ul>
  </div>
  <LoadingSpinner v-else class="center-horizontal center-vertical" style="padding-top: 100px" />
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
