<template>
  <div>
    <div id="vhs">
      <div id="crt-lines"></div>
      <div id="darken"></div>
      <div id="vignette"></div>
    </div>

    <section
      v-for="(section, index) in data.sections"
      :key="index"
      :id="section.title"
      :class="section.type"
    ></section>

    <!-- insert Music Library here -->
    <!-- insert Galaxy Game here -->
  </div>
</template>

<script lang="ts" src="./HomeView.ts"></script>
<style src="./HomeView.css"></style>
