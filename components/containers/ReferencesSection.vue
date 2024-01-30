<template>
  <HeadlineAnimation :title="title" />
  <ul class="grid">
    <CardItem
      variant="article"
      :size="windowObject.innerWidth < 900 ? 'small' : 'medium'"
      v-for="(article, index) in articles"
      :key="index"
      :card="article"
      :iconPosition="windowObject.innerWidth < 900 ? 'top' : 'left'"
      :dateFormatOptions="{
        year: 'numeric',
        month: 'long',
      }"
    />
  </ul>
</template>

<script setup lang="ts">
import type { CardItemType } from "~/types/common/CardItem";

defineProps<{
  title: string;
}>();

const { tm } = useI18n();
const articles: Ref<CardItemType[]> = computed(() =>
  tm("components.containers.references")
);
const windowObject = computed(() => window);
</script>
