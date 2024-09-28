<template>
  <h1>{{ title }}</h1>
  <div class="card-grid">
    <CardItem
      v-for="(article, index) in articles"
      :key="index"
      v-bind="{
        ...article,
        variant: 'article',
        hover: 'false',
        loading: false,
        componentSize: windowWidth < 769 ? 'small' : 'medium',
        icon: {
          ...article.icon,
          name: article.icon?.name || '',
          position: windowWidth < 769 ? 'top' : 'left',
        },
        info: {
          ...article?.info,
        },
      }"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardItemType } from '~/types/common/card-item'

defineProps<{
  title: string
}>()

const { tm } = useI18n()
const { windowWidth } = useWidth()
const articles = computed<CardItemType[]>(() =>
  tm('components.containers.references')
)
</script>
