<template>
  <ul class="sharesheet-options">
    <li v-for="link in data.sharesheet.links" :key="link.url">
      <a :href="link.url" :title="link.title" target="_blank">
        <font-awesome-icon :icon="`fa-${link.category} fa-${link.icon}`" />
      </a>
    </li>
  </ul>
</template>

<script lang="ts" src="./ShareSheet.ts"></script>
<style src="./ShareSheet.css"></style>
