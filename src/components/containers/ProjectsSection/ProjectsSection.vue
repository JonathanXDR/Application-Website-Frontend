<template>
  <h3 class="typography-magical-headline" style="padding-bottom: 50px">
    {{ props.title }}
  </h3>
  <NavBarExtension>
    <SegmentNav :index="currentIndex" @update:currentIndex="updateCurrentIndex" />
  </NavBarExtension>
  <div class="timeline-wrapper" v-if="currentIndex === 0">
    <TimeLine />
    <ul ref="ul" class="timeline">
      <ArticleItem v-for="(project, index) in currentProjects" :key="index" :article="project" />
    </ul>
  </div>
  <ul v-else class="card-container">
    <CardItem v-for="(card, index) in currentProjects" :key="index" :card="card" />
    <ResultBlankState v-if="!currentProjects" />
  </ul>
  <!-- <LoadingSpinner v-else class="center-horizontal center-vertical" style="padding-top: 100px" /> -->
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
