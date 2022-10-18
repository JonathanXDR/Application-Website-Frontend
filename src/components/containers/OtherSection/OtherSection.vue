<template>
  <h2>Anderes</h2>
  <ul class="grid">
    <ArticleItem
      v-for="(other, index) in data.other"
      :key="index"
      :article="other"
    />
  </ul>
</template>

<script lang="ts" src="./OtherSection.ts"></script>
<style src="./OtherSection.css"></style>
