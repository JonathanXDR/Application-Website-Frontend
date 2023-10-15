<template>
  <h2>{{ $t('components.containers.common.references') }}</h2>
  <ul class="grid">
    <ArticleItem
      v-for="(references, index) in tm('components.containers.references')"
      :key="index"
      :article="references"
    />
  </ul>
</template>

<script lang="ts" src="./ReferencesSection.ts"></script>
<style scoped src="./ReferencesSection.css"></style>
