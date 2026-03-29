<script setup lang="ts">
import type { CardItemType } from '#shared/types/components/card-item'

defineProps<{
  title: string
}>()

const viewport = useViewport()
const { data: refData } = await useQueryCollection('sections')
  .stem('references')
  .first()
const articles = computed<CardItemType[]>(
  () =>
    ((refData.value as unknown as Record<string, unknown>)
      ?.items as CardItemType[]) || [],
)
</script>

<template>
  <h1>{{ title }}</h1>
  <div class="card-grid">
    <CardItem
      v-for="(article, index) in articles"
      :key="index"
      v-bind="{
        ...article,
        variant: 'article',
        hover: false,
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
