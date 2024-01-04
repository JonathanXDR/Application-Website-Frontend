<template>
  <h2>{{ props.title }}</h2>
  <ul class="grid">
    <!-- <ArticleItem v-for="(article, index) in articles" :key="index" :article="article" /> -->
    <CardItem
      variant="article"
      :size="window.innerWidth < 900 ? 'small' : 'medium'"
      v-for="(article, index) in articles"
      :key="index"
      :card="article"
      :iconPosition="window.innerWidth < 900 ? 'top' : 'left'"
      :dateFormatOptions="{
        weekday: 'long',
      }"
    />
  </ul>
</template>

<script lang="ts">
import CardItem from "~/components/common/CardItem/CardItem.vue";

import { computed, defineComponent, type PropType, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import LinkCollection from "~/components/common/LinkCollection.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner.vue";
import RibbonBar from "~/components/common/RibbonBar.vue";
import ShareSheet from "~/components/common/ShareSheet.vue";
import TimeLine from "~/components/common/TimeLine/TimeLine.vue";
import type { CardItemType } from "~/types/common/CardItem";

export default defineComponent({
  name: "OtherSection",
  components: {
    LoadingSpinner,
    RibbonBar,
    LinkCollection,
    ShareSheet,
    CardItem,
    TimeLine,
  },
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
      tm("components.containers.other")
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
