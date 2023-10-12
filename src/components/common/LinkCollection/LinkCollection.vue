<template>
  <div class="links">
    <p v-for="(link, index) in links" :key="index">
      <a :href="link.url" class="link link-icon" target="_blank">
        {{ link.title }}
        <Icon
          v-if="link.icon"
          :name="link.icon"
          size="big"
          class="svg-icon inline-chevron-right-icon icon-inline link-icon"
        />
      </a>
    </p>
  </div>
</template>

<script lang="ts" src="./LinkCollection.ts"></script>
<style scoped src="./LinkCollection.css"></style>
