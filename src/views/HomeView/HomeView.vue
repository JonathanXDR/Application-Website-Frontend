<template>
  <div>
    <div id="vhs">
      <div id="crt-lines"></div>
      <div id="darken"></div>
      <div id="vignette"></div>
    </div>

    <section
      v-for="(container, index) in data.containers"
      :key="index"
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
<style src="./HomeView.css"></style>
