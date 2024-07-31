<template>
  <h2>{{ title }}</h2>
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
defineProps<{
  title: string;
}>();

const { tm } = useI18n();
const { windowWidth } = useWidth();
const articles = computed<CardItemType[]>(() =>
  tm("components.containers.references"),
);
</script>
