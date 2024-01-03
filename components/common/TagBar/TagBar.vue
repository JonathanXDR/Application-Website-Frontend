<template>
  <div class="tags filter-suggested-tags">
    <div class="scroll-wrapper">
      <ul id="suggested-tags-tags">
        <li v-for="(tag, index) in tags" :key="index" class="tag">
          <a :href="`https://github.com/topics/${tag}`">{{ tag }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" src="./TagBar.ts"></script>
<style scoped src="./TagBar.css"></style>
