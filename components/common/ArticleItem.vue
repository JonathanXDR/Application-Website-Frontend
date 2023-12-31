<template>
  <li
    class="row-full nr-scroll-animation nr-scroll-animation--off"
    v-animation="{
      add: ['nr-scroll-animation--on'],
      remove: ['nr-scroll-animation--off'],
    }"
  >
    <div v-if="article.icon" class="padding-right padding-block-small">
      <Icon
        :name="article.icon.name"
        :colors="article.icon.colors"
        class="icon-article"
      />
    </div>

    <div>
      <h2>{{ article.title }}</h2>
      <p class="article-date">{{ article.date }}</p>
      <p>
        {{ article.description }}
      </p>
      <LinkCollection :links="article.links" />
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { ArticleItemType } from "~/types/common/ArticleItem";

defineProps({
  article: {
    type: Object as PropType<ArticleItemType>,
    required: true,
    default: () => ({}),
  },
});
</script>

<style scoped>
/* -------------------------------- row-full -------------------------------- */

.row-full {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.row-full h2 {
  font-size: 19px;
  line-height: 1.25;
  font-weight: 500;
}

@media screen and (min-width: 900px) {
  .row-full {
    flex-direction: row !important;
  }

  .row-full h2 {
    font-size: 24px !important;
  }
}

@media screen and (min-width: 1250px) {
  .row-full h2 {
    font-size: 28px !important;
  }
}

/* ---------------------------------- grid ---------------------------------- */

.row.header-row {
  margin-bottom: 2em;
}

.padding-block-small {
  padding-block: 0.25em;
}

.padding-right {
  padding-right: 1.5em;
}

.article-date {
  color: var(--color-sub-text);
  margin: 0.5em 0 0.4em 0;
  font-size: 0.875em;
}
</style>
