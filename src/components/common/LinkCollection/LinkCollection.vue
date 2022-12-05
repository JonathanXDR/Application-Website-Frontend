<template>
  <div class="links">
    <p v-for="(link, index) in json" :key="index">
      <a :href="link.url" class="link" target="_blank">
        {{ link.title }}
        <component
          v-if="link.icon"
          :is="link.icon"
          class="svg-icon inline-chevron-right-icon icon-inline link-icon"
        />
      </a>
    </p>
  </div>
</template>

<script lang="ts" src="./LinkCollection.ts"></script>
<style scoped src="./LinkCollection.css"></style>
