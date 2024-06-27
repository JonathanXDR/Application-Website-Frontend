<template>
  <h2>{{ title }}</h2>

  <ul class="cardItemList">
    <CardItem
      v-for="(language, index) in languages"
      :key="index"
      v-bind="{
        ...language,
        icon: {
          ...language.icon,
          name: language.icon?.name || '',
          alignment: 'start',
          position: windowWidth < 930 ? 'top' : 'left',
        },
        loading: false,
        hover: 'false'
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
  </ul>

  <!-- <div class="graph-gallery-container">
    <ul class="tabnav-items">
      <li v-for="(language, index) in languages" :key="index" class="tabnav-item">
        <span class="tabnav-link current">{{ language.title }}</span>
      </li>
    </ul>

    <ul class="slide-container">
      <LanguageBar v-for="(language, index) in languages" :key="index" :language="language" />
    </ul>
  </div> -->
</template>

<script setup lang="ts">
import type { LanguageBarType } from '~/types/common/LanguageBar';

defineProps<{
  title: string;
}>();

// const items = reactive([
//   { id: 'productivity', label: 'Productivity' },
//   { id: 'gaming', label: 'Gaming' },
//   { id: 'production', label: 'Audio and video production' },
//   { id: 'development', label: 'Software development' },
// ])

const { tm } = useI18n();
const { width: windowWidth } = useWindowSize({ initialWidth: 0 });
const languages = computed<LanguageBarType[]>(() =>
  tm('components.containers.languages')
);
</script>

<style scoped>
.cardItemList {
  margin-top: 3em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* gap: 24px; */
  gap: 24px;
}
</style>
