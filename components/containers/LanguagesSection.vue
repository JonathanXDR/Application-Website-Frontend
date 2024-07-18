<template>
  <h2>{{ title }}</h2>

  <div class="graph">
    <template v-for="(language, index) in languages" :key="index">
      <LanguageBar
        v-if="language"
        v-bind="{
          ...language,
          componentSize:
            windowWidth < 769
              ? 'small'
              : windowWidth < 1281
                ? 'medium'
                : 'large',
          width: windowWidth < 769 ? 'full' : 'compact',
        }"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { LanguageBarType } from "~/types/common/LanguageBar";

defineProps<{
  title: string;
}>();

const { tm } = useI18n();
const { width: windowWidth } = useWindowSize({ initialWidth: 0 });
const languages = computed<LanguageBarType[]>(() =>
  tm("components.containers.languages"),
);
</script>

<style scoped>
.graph {
  margin-top: 3em;
  display: grid;
  /* align-items: flex-end; */
  /* grid-template-columns: 1fr auto; */
  /* grid-auto-rows: 1fr; */
  grid-row-gap: 48px;
  row-gap: 48px;
  grid-column-gap: 90px;
  -moz-column-gap: 90px;
  column-gap: 90px;
}
@media only screen and (max-width: 1025px) {
  .graph {
    grid-row-gap: 32px;
    row-gap: 32px;
  }
}
@media only screen and (max-width: 769px) {
  .graph {
    grid-column-gap: 20px;
    column-gap: 20px;
  }
}
</style>
