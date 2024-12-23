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
        componentSize: viewport.isLessThan('tablet') ? 'small' : 'medium',
        icon: {
          ...article.icon,
          position: viewport.isLessThan('tablet') ? 'top' : 'left',
        },
      }"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardItemType } from '#shared/types/common/card-item'

defineProps<{
  title: string
}>()

const viewport = useViewport()
const { tm } = useI18n()

const articles = computed<CardItemType[]>(() =>
  tm('components.containers.references'),
)
</script>
