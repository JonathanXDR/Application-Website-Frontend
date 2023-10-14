<template>
  <h3 class="typography-magical-headline">
    {{ $t('components.containers.common.projectsAtSwisscom') }}
  </h3>
  <div class="timeline-wrapper" v-if="projects.personal && projects.swisscom && projects.school">
    <TimeLine />

    <ul ref="ul" class="timeline">
      <ArticleItem v-for="(project, index) in projects.swisscom" :key="index" :article="project" />
    </ul>

    <!-- <ul ref="ul" class="timeline">
      <ArticleItem v-for="(project, index) in projects.personal" :key="index" :article="project" />
    </ul> -->
  </div>
  <LoadingSpinner v-else class="center" />
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
