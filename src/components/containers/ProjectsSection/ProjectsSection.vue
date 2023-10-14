<template>
  <h3 class="typography-magical-headline">
    {{ $t('components.containers.common.projectsAtSwisscom') }}
  </h3>
  <div class="timeline-wrapper" v-if="json">
    <TimeLine />

    <!-- <ul ref="ul" class="timeline">
      <ArticleItem v-for="(projects, index) in json" :key="index" :article="projects" />
    </ul> -->

    <ul ref="ul" class="timeline" v-if="allProjects">
      <ArticleItem v-for="(project, index) in allProjects" :key="index" :article="project" />
    </ul>
    <LoadingSpinner v-else class="center" />
  </div>
  <LoadingSpinner v-else class="center" />
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
