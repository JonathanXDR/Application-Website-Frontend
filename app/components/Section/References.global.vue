<script setup lang="ts">
import type { ReferencesCollectionItem } from '@nuxt/content'

defineProps<{
  title: string
}>()

const viewport = useViewport()
const { data: refData }
  = await useQueryCollection<ReferencesCollectionItem>('references').all()
const articles = computed(() => refData.value ?? [])
</script>

<template>
  <h2>{{ title }}</h2>
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
