<template>
  <section
    v-for="(section, index) in sections"
    :name="section.name"
    :key="section.id"
    :id="section.id"
    :class="section.class"
    v-section="(section.id, index)"
  >
    <component :title="section.name" :is="`${section.id}Section`" />
  </section>

  <!-- insert Galaxy Game here -->
</template>

<script lang="ts" src="./HomeView.ts"></script>
<style scoped src="./HomeView.css"></style>
