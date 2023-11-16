<template>
  <h2>{{ props.title }}</h2>
  <ul class="grid">
    <!-- <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" /> -->
    <CardItem
      variant="article"
      v-for="(article, index) in articles"
      :key="index"
      :card="article"
      :dateFormatOptions="{
        year: 'numeric',
        month: 'long'
      }"
    />
  </ul>
</template>

<script lang="ts" src="./ReferencesSection.ts"></script>
<style scoped src="./ReferencesSection.css"></style>
