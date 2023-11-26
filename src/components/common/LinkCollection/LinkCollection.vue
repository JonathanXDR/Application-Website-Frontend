<template>
  <a class="links">
    <a v-for="(link, index) in links" :key="index" :href="link.url" class="link" target="_blank">
      {{ link.title
      }}<Icon
        v-if="link.icon"
        :name="link.icon.name"
        :size="link.icon.size"
        :colors="link.icon.colors"
        class="icon icon-small"
      />
    </a>
  </a>
</template>

<script lang="ts" src="./LinkCollection.ts"></script>
<style scoped src="./LinkCollection.css"></style>
