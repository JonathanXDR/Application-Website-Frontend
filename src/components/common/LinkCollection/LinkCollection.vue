<template>
  <div class="links">
    <p v-for="(link, index) in data" :key="index">
      <a :href="link.url" class="link" target="_blank">
        {{ link.title }}
        <component v-if="link.icon" :is="link.icon" class="icon-after" />
      </a>
    </p>
  </div>
</template>

<script lang="ts" src="./LinkCollection.ts"></script>
<style src="./LinkCollection.css"></style>
