<template>
  <ul class="sharesheet-options">
    <li
      class="social-option"
      v-for="(link, index) in links"
      :key="index"
      v-animation="{ toggle: ['visible'] }"
    >
      <a class="link" :href="link.url" :title="link.title" target="_blank">
        <font-awesome-icon :icon="`fa-${link.category} fa-${link.icon.name}`" />
      </a>
    </li>
  </ul>
</template>

<script lang="ts" src="./ShareSheet.script.ts"></script>
<style scoped src="./ShareSheet.module.css"></style>
