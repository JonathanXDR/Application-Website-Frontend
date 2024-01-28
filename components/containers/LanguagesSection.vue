<template>
  <h2>{{ title }}</h2>

  <TabList />

  <LanguageBarV2
    v-for="(language, index) in languages"
    :key="index"
    :language="language"
  />

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
import type { LanguageBarType } from "~/types/common/LanguageBar";

defineProps<{
  title: string;
}>();

const { tm } = useI18n();
const languages: Ref<LanguageBarType[]> = computed(() =>
  tm("components.containers.languages"),
);
</script>
