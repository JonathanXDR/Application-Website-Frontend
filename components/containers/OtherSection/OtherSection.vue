<template>
  <h2>{{ props.title }}</h2>
  <ul class="grid">
    <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" />
  </ul>
</template>

<script lang="ts" src="./OtherSection.ts"></script>
<style scoped src="./OtherSection.css"></style>
