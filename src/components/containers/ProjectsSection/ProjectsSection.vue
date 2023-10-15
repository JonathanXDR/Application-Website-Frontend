<template>
  <h3 class="typography-magical-headline">
    {{ $t('components.containers.common.projectsAtSwisscom') }}
  </h3>
  <div class="timeline-wrapper">
    <TimeLine />

    <ul ref="ul" class="timeline">
      <ArticleItem
        v-for="(projects, index) in tm('components.containers.projects')"
        :key="index"
        :article="projects"
      />
    </ul>
  </div>
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
