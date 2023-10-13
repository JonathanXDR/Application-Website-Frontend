<template>
  <h3 class="typography-magical-headline">
    {{ $t('components.containers.common.projectsAtSwisscom') }}
  </h3>
  <div class="timeline-wrapper" v-if="json">
    <TimeLine />

    <!-- <ul ref="ul" class="timeline">
      <ArticleItem v-for="(projects, index) in json" :key="index" :article="projects" />
    </ul> -->

    <ul ref="ul" class="timeline">
      <ArticleItem v-for="(project, index) in projects" :key="index" :article="project" />
    </ul>
  </div>
  <LoadingSpinner v-else class="center" />
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
