<template>
  <h2>{{ title }}</h2>
  <ul class="grid">
    <!-- <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" /> -->
    <CardItem
      variant="article"
      :size="windowWidth < 900 ? 'small' : 'medium'"
      v-for="(article, index) in articles"
      :key="index"
      :icon="{
        name: article.icon?.name,
        position: windowWidth < 900 ? 'top' : 'left'
      }"
      :date="{
        formatOptions: {
          weekday: 'long'
        }
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
const articles: Ref<CardItemType[]> = computed(() =>
  tm('components.containers.other')
)
const { width: windowWidth } = useWindowSize({ initialWidth: 0 })
</script>
~/types/common/ExtendedProps
