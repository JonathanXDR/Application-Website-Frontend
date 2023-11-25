<template>
  <h2>{{ props.title }}</h2>
  <ul class="grid">
    <!-- <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" /> -->
    <CardItem
      variant="article"
      size="medium"
      v-for="(article, index) in articles"
      :key="index"
      :card="article"
      :dateFormatOptions="{
        weekday: 'long'
      }"
    />
  </ul>
</template>

<script lang="ts" src="./OtherSection.ts"></script>
<style scoped src="./OtherSection.css"></style>
