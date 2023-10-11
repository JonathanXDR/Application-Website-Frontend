<template>
  <h2>{{ $t('components.containers.common.other') }}</h2>
  <ul class="grid" v-if="json">
    <ArticleItem v-for="(other, index) in json" :key="index" :article="other" />
  </ul>
  <LoadingSpinner v-else />
</template>

<script lang="ts" src="./OtherSection.ts"></script>
<style scoped src="./OtherSection.css"></style>
