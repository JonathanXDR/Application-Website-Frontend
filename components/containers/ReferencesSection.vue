<template>
  <h2>{{ title }}</h2>
  <ul class="grid">
    <CardItem
      variant="article"
      :loading="false"
      :size="windowWidth < 900 ? 'small' : 'medium'"
      v-for="(article, index) in articles"
      :key="index"
      :card="article"
      :iconPosition="windowWidth < 900 ? 'top' : 'left'"
      :dateFormatOptions="{
        year: 'numeric',
        month: 'long'
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
