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
      <CardItem
        variant="article"
        :size="window.innerWidth < 900 ? 'small' : 'medium'"
        v-for="(project, index) in currentProjects"
        :key="index"
        :card="project"
        :dateFormatOptions="{
          year: 'numeric',
          month: 'long'
        }"
      />
    </ul>
  </div>
  <div v-else>
    <div v-if="projects.personal.length && projects.school.length">
      <LiveResultSummary
        :totalResults="currentProjects.length + pinned.length"
        :pinnedResults="pinned.length"
      />
      <ul v-if="pinned" class="card-container pinned-items">
        <CardItem
          v-for="(card, index) in pinned"
          :key="index"
          :card="card"
          size="small"
          iconPosition="right"
          class="color"
          :style="`--color-figure: var(--color-figure-${randomColor});
          --color-fill: var(--color-fill-${randomColor}-secondary)`"
        />
      </ul>
      <ul class="card-container">
        <CardItem
          v-for="(card, index) in currentProjects"
          :key="index"
          :card="card"
          size="small"
          iconPosition="right"
        />
        <ResultBlankState v-if="!currentProjects" />
      </ul>
    </div>
    <LoadingSpinner v-else class="center-horizontal center-vertical" style="padding-top: 100px" />
  </div>
</template>

<script lang="ts" src="./ProjectsSection.ts"></script>
<style scoped src="./ProjectsSection.css"></style>
