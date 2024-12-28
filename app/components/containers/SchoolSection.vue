<template>
  <h1>{{ title }}</h1>
  <div class="card-grid">
    <CardItem
      v-for="(card, index) in cards"
      :key="index"
      v-bind="{
        ...card,
        variant: 'article',
        hover: false,
        loading: false,
        componentSize: viewport.isLessThan('tablet') ? 'small' : 'medium',
        icon: {
          ...card.icon,
          position: viewport.isLessThan('tablet') ? 'top' : 'left',
        },
        info: {
          ...card?.info,
          date: {
            ...card?.info?.date,
            formatOptions: () => ({
              weekday: 'long',
            }),
          },
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
const { tm, rt } = useI18n()

const rawCards = computed<CardItemType[]>(() =>
  tm('components.containers.school'),
)

const cards = computed<CardItemType[]>(() =>
  rawCards.value.map(c => ({
    ...c,
    title: rt(c.title),
    label: rt(c.label),
    description: rt(c.description),
  })),
)
</script>
