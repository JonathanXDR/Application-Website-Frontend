<template>
  <!-- <h2>{{ props.title }}</h2> -->
  <HeadlineAnimation title="Test Test Test" />
  <ul class="grid">
    <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" />
  </ul>
</template>

<script lang="ts" src="./ReferencesSection.ts"></script>
<style scoped src="./ReferencesSection.css"></style>
