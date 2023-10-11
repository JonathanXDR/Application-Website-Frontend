<template>
  <h2>{{ $t('components.containers.common.references') }}</h2>
  <ul class="grid" v-if="json">
    <ArticleItem v-for="(references, index) in json" :key="index" :article="references" />
  </ul>
  <LoadingSpinner v-else />
</template>

<script lang="ts" src="./ReferencesSection.ts"></script>
<style scoped src="./ReferencesSection.css"></style>
