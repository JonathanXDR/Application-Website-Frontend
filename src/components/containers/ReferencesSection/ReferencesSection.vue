<template>
  <h2>{{ props.title }}</h2>
  <ul class="grid">
    <CardItem
      variant="article"
      :size="window.innerWidth < 900 ? 'small' : 'medium'"
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
