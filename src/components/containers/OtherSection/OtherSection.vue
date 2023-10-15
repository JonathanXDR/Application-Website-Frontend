<template>
  <h2>{{ $t('components.containers.common.other') }}</h2>
  <ul class="grid">
    <ArticleItem
      v-for="(other, index) in tm('components.containers.other')"
      :key="index"
      :article="other"
    />
  </ul>
</template>

<script lang="ts" src="./OtherSection.ts"></script>
<style scoped src="./OtherSection.css"></style>
