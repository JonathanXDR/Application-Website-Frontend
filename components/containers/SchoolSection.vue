<template>
  <h2>{{ title }}</h2>
  <div class="card-grid">
    <CardItem
      v-for="(card, index) in cards"
      :key="index"
      v-bind="{
        ...card,
        variant: 'article',
        hover: 'false',
        loading: false,
        componentSize: windowWidth < 769 ? 'small' : 'medium',
        icon: {
          ...card.icon,
          name: card.icon?.name || '',
          position: windowWidth < 769 ? 'top' : 'left',
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
import type { CardItemType } from "~/types/common/CardItem";

defineProps<{
  title: string;
}>();

const { tm } = useI18n();
const { windowWidth } = useWidth();
const cards = computed<CardItemType[]>(() =>
  tm("components.containers.school"),
);
</script>
