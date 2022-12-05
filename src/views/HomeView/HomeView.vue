<template>
  <div>
    <div id="vhs">
      <div id="crt-lines"></div>
      <div id="darken"></div>
      <div id="vignette"></div>
    </div>

    <section
      v-for="(container, index) in json"
      :key="index"
      v-section="index"
      :id="container.id"
      :class="container.class"
    >
      <component v-if="container.id" :is="`${container.id}Section`" />
    </section>

    <!-- insert Music Library here -->
    <!-- insert Galaxy Game here -->
  </div>
</template>

<script lang="ts" src="./HomeView.ts"></script>
<style scoped src="./HomeView.css"></style>
