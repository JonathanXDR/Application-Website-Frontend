<template>
  <section
    v-for="(section, index) in sections"
    :key="section.id"
    :id="section.id"
    :class="section.class"
    v-section="index"
  >
    <component :is="`${section.id}Section`" />
  </section>

  <!-- insert Music Library here -->
  <!-- insert Galaxy Game here -->
</template>

<script lang="ts" src="./HomeView.ts"></script>
<style scoped src="./HomeView.css"></style>
