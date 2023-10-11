<template>
  <ul class="sharesheet-options" v-if="json">
    <li class="social-option" v-for="(link, index) in json.links" :key="index" v-animation>
      <a class="link" :href="link.url" :title="link.title" target="_blank">
        <font-awesome-icon :icon="`fa-${link.category} fa-${link.icon}`" />
      </a>
    </li>
  </ul>
  <LoadingSpinner v-else />
</template>

<script lang="ts" src="./ShareSheet.ts"></script>
<style scoped src="./ShareSheet.css"></style>
