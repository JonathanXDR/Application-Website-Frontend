<template>
  <div>
    <div id="vhs">
      <div id="crt-lines"></div>
      <div id="darken"></div>
      <div id="vignette"></div>
    </div>

    <section
      v-for="(container, index) in data"
      :key="index"
      v-section="index"
      :id="container.title"
      :class="container.type"
    >
      <component v-if="container.title" :is="`${container.title}Section`" />
    </section>

    <!-- insert Music Library here -->
    <!-- insert Galaxy Game here -->
  </div>
</template>

<script lang="ts" src="./HomeView.ts"></script>
<style scoped src="./HomeView.css"></style>
