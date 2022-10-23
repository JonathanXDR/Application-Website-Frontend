<template>
  <h2>Referenzen</h2>
  <ul class="grid">
    <ArticleItem
      v-for="(references, index) in data"
      :key="index"
      :article="references"
    />
  </ul>
</template>

<script lang="ts" src="./ReferencesSection.ts"></script>
<style scoped src="./ReferencesSection.css"></style>
