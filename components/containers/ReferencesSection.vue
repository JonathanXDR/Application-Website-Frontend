<template>
  <h2>{{ title }}</h2>
  <ul class="grid">
    <CardItem
      variant="article"
      windowWidth
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
const articles: Ref<CardItemType[]> = computed(() =>
  tm('components.containers.references')
)
const { width: windowWidth } = useWindowSize({ initialWidth: 0 })
</script>
