<template>
  <h3 class="typography-magical-headline">
    {{ $t('components.containers.common.projectsAtSwisscom') }}
  </h3>
  <SegmentNav />
  <div
    class="timeline-wrapper"
    v-if="projects.personal.length && projects.swisscom.length && projects.school.length"
  >
    <TimeLine />

    <ul ref="ul" class="timeline">
      <ArticleItem v-for="(project, index) in projects.personal" :key="index" :article="project" />
    </ul>

    <!-- <ul ref="ul" class="timeline">
      <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" />
    </ul> -->
  </div>
  <LoadingSpinner v-else class="center-horizontal center-vertical" />
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
