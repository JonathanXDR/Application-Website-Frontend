<template>
  <h2>{{ props.title }}</h2>
  <ul class="grid">
    <CardItem
      variant="article"
      :size="window.innerWidth < 900 ? 'small' : 'medium'"
      v-for="(article, index) in articles"
      :key="index"
      :card="article"
      :iconPosition="window.innerWidth < 900 ? 'top' : 'left'"
      :dateFormatOptions="{
        year: 'numeric',
        month: 'long',
      }"
    />
  </ul>
</template>

<script lang="ts" src="./ReferencesSection.script.ts"></script>
<style scoped src="./ReferencesSection.module.css"></style>
