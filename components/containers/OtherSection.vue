<template>
  <h2>{{ title }}</h2>
  <ul class="grid">
    <!-- <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" /> -->
    <CardItem
      v-for="(article, index) in articles"
      v-for="(article, index) in articles"
      :key="index"
      :key="index"
      variant="article"
      :loading="false"
      :size="windowWidth < 900 ? 'small' : 'medium'"
      :icon="{
        name: article.icon?.name,
        position: windowWidth < 900 ? 'top' : 'left',
      }"
      :date="{
        formatOptions: {
          weekday: 'long',
        },
      }"
    />
  </ul>
</template>

<script setup lang="ts">
import type { CardItemType } from '~/types/common/CardItem'

defineProps<{
  title: string
}>()

const { tm } = useI18n()
const articles = computed<CardItemType[]>(() =>
  tm('components.containers.other'),
)
const { width: windowWidth } = useWindowSize({ initialWidth: 0 })
</script>
~/types/common/ExtendedProps
