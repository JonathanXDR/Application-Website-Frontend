<template>
  <h2>{{ title }}</h2>

  <!-- <div class="cardItemList">
    <CardItem
      v-for="(language, index) in languages"
      :key="index"
      v-bind="{
        ...language,
        colors: {
          primary: `var(--color-fill-tertiary)`,
          secondary: `var(--color-fill-tertiary)`,
          tertiary: `var(--color-fill-gray-secondary)`,
          quaternary: `var(--color-fill-gray-secondary)`,
        },
        icon: {
          ...language.icon,
          name: language.icon?.name || '',
          alignment: 'start',
          position: windowWidth < 930 ? 'top' : 'left',
        },
        loading: false,
      }"
    >
      <LanguageBarV2
        v-if="language"
        :title="language.title"
        :progress="language.progress"
        :status="language.status"
        style="width: 100%"
      />
    </CardItem>
  </div> -->

  <div class="graph">
    <template v-for="(language, index) in languages" :key="index">
      <LanguageBarV3
        v-if="language"
        v-bind="{
          ...language,
          divider: {
            direction: 'left',
          },
          componentSize:
            windowWidth < 900
              ? 'small'
              : windowWidth < 1250
                ? 'medium'
                : 'large',
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
@media only screen and (max-width: 1068px) {
  .graph {
    grid-row-gap: 32px;
    row-gap: 32px;
  }
}
@media only screen and (max-width: 734px) {
  .graph {
    grid-column-gap: 20px;
    column-gap: 20px;
  }
}
</style>
