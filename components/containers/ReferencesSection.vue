<template>
  <h2>{{ title }}</h2>
  <ul class="grid">
    <CardItem
      v-for="(article, index) in articles"
      :key="index"
      v-bind="{
        ...article,
        variant: 'article',
        loading: false,
        componentSize: windowWidth < 900 ? 'small' : 'medium',
        icon: {
          ...article.icon,
          position: windowWidth < 900 ? 'top' : 'left'
        },
        date: {
          ...article.date,
          formatOptions: () => ({
            year: 'numeric',
            month: 'long'
          })
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
const articles = computed<CardItemType[]>(() =>
  tm('components.containers.references')
)
const { width: windowWidth } = useWindowSize({ initialWidth: 0 })
</script>
