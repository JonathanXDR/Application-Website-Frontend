<template>
  <h2>{{ title }}</h2>
  <ul class="grid">
    <!-- <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" /> -->
    <CardItem
      v-for="(article, index) in articles"
      :key="index"
      variant="article"
      :size="windowObject && windowObject.innerWidth < 900 ? 'small' : 'medium'"
      :card="article"
      :icon-position="
        windowObject && windowObject.innerWidth < 900 ? 'top' : 'left'
      "
      :date-format-options="{
        weekday: 'long',
      }"
    />
  </ul>
</template>

<script setup lang="ts">
import type { CardItemType } from '~/types/common/CardItem';

defineProps<{
  title: string
}>()

const { tm } = useI18n()
const articles: Ref<CardItemType[]> = computed(() =>
  tm('components.containers.other')
)
const windowObject = computed(() => window)
</script>
