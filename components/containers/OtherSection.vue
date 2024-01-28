<template>
  <h2>{{ title }}</h2>
  <ul class="grid">
    <!-- <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" /> -->
    <CardItem
      variant="article"
      :size="windowObject.innerWidth < 900 ? 'small' : 'medium'"
      v-for="(article, index) in articles"
      :key="index"
      :card="article"
      :iconPosition="windowObject.innerWidth < 900 ? 'top' : 'left'"
      :dateFormatOptions="{
        weekday: 'long',
      }"
    />
  </ul>
</template>

<script lang="ts" setup>
import type { CardItemType } from "~/types/common/CardItem";

defineProps<{
  title: string;
}>();

const { tm } = useI18n();
const articles: Ref<CardItemType[]> = computed(() =>
  tm("components.containers.other"),
);
const windowObject = computed(() => window);
</script>
