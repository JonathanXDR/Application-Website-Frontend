<template>
  <h2>Anderes</h2>
  <ul class="grid">
    <ArticleItem v-for="(other, index) in json" :key="index" :article="other" />
  </ul>
</template>

<script lang="ts" src="./OtherSection.ts"></script>
<style scoped src="./OtherSection.css"></style>
