<template>
  <h2>{{ props.title }}</h2>
  <ul class="grid">
    <CardItem
      variant="article"
      :size="window.innerWidth < 900 ? 'small' : 'medium'"
      v-for="(article, index) in articles"
      :key="index"
      :card="article"
      :iconPosition="window.innerWidth < 900 ? 'top' : 'left'"
      :dateFormatOptions="{
        year: 'numeric',
        month: 'long',
      }"
    />
  </ul>
</template>

<script lang="ts">
import type { CardItemType } from "~/types/common/CardItem";

export default defineComponent({
  name: "ReferencesSection",
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
      default: undefined,
    },
  },
  setup(props) {
    const { tm } = useI18n();
    const articles: Ref<CardItemType[]> = computed(() =>
      tm("components.containers.references")
    );

    return {
      window,
      props,
      tm,
      articles,
    };
  },
});
</script>

<style scoped></style>
