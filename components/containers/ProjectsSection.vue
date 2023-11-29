<template>
  <h3 class="typography-magical-headline">
    {{ title }}
  </h3>
  <div class="timeline-wrapper">
    <TimeLine />

    <ul ref="ul" class="timeline">
      <ArticleItem
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { ArticleItemType } from '~/types/common/ArticleItem';

defineProps({
  title: {
    type: String,
    required: true,
    default: undefined,
  },
});

const { tm } = useI18n();
const articles = computed(
  () => tm('components.containers.projects') as ArticleItemType[]
);
</script>

<style scoped>
/* ---------------------------- timeline-wrapper ---------------------------- */

.timeline-wrapper {
  padding: 100px 0 50px 0;
}

@media screen and (min-width: 900px) {
  .timeline-wrapper {
    padding: 150px 0 100px 0;
  }
}

@media screen and (min-width: 1250px) {
  .timeline-wrapper {
    display: flex;
    justify-content: center;
  }
}

/* -------------------------------- timeline -------------------------------- */

.timeline {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 48px;
  transition: all 250ms ease;
  margin: 0 auto;
}

@media screen and (min-width: 900px) {
  .timeline {
    gap: 64px;
  }
}

@media screen and (min-width: 1250px) {
  .timeline {
    align-items: flex-start !important;
  }
}

/* ------------------------------- timeline li ------------------------------ */

.timeline li {
  width: 90%;
}

@media screen and (min-width: 1250px) {
  .timeline li {
    width: 40%;
  }

  .timeline li:nth-child(even) {
    align-self: flex-end;
  }
}
</style>
