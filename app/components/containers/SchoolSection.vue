<template>
  <h1>{{ title }}</h1>
  <div class="card-grid">
    <CardItem
      v-for="(card, index) in cards"
      :key="index"
      v-bind="{
        ...card,
        variant: 'article',
        hover: 'false',
        loading: false,
        componentSize: breakpoints.smaller('md').value ? 'small' : 'medium',
        icon: {
          ...card.icon,
          name: card.icon?.name || '',
          position: breakpoints.smaller('md').value ? 'top' : 'left',
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
import type { CardItemType } from "#shared/types/common/card-item";

defineProps<{
  title: string;
}>();

const { tm } = useI18n();
const breakpoints = useAppBreakpoints();
const cards = computed<CardItemType[]>(() =>
  tm("components.containers.school"),
);
</script>
