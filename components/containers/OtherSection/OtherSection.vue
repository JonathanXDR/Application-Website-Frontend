<template>
  <h2>{{ props.title }}</h2>
  <ul class="grid">
    <!-- <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" /> -->
    <CardItem
      variant="article"
      :size="window.innerWidth < 900 ? 'small' : 'medium'"
      v-for="(article, index) in articles"
      :key="index"
      :card="article"
      :iconPosition="window.innerWidth < 900 ? 'top' : 'left'"
      :dateFormatOptions="{
        weekday: 'long',
      }"
    />
  </ul>
</template>

<script lang="ts" src="./OtherSection.script.ts"></script>
<style scoped src="./OtherSection.module.css"></style>
