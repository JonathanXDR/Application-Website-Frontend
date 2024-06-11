<template>
  <h2>{{ title }}</h2>
  <ul class="grid">
    <CardItem
      v-for="(article, index) in articles"
      :key="index"
      variant="article"
      :loading="false"
      :size="windowWidth < 900 ? 'small' : 'medium'"
      :card="article"
      :icon-position="windowWidth < 900 ? 'top' : 'left'"
      :date-format-options="{
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
