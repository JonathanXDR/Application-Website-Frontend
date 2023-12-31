<template>
  <h2>{{ title }}</h2>
  <ul class="grid">
    <ArticleItem
      v-for="(article, index) in articles"
      :key="index"
      :article="article"
    />
  </ul>
</template>

<script lang="ts" setup>
import type { ArticleItemType } from "~/types/common/ArticleItem";

defineProps({
  title: {
    type: String,
    required: true,
    default: undefined,
  },
});

const { tm } = useI18n();
const articles = computed(
  () => tm("components.containers.references") as ArticleItemType[]
);
</script>
<style scoped></style>
