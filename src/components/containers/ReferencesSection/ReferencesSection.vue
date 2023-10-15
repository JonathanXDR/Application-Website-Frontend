<template>
  <h2>{{ $t('components.containers.common.references') }}</h2>
  <ul class="grid">
    <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" />
  </ul>
</template>

<script lang="ts" src="./ReferencesSection.ts"></script>
<style scoped src="./ReferencesSection.css"></style>
