<template>
  <h2>{{ title }}</h2>

  <CardItem
    v-for="(language, index) in languages"
    :key="index"
    :card="language"
    iconAlignment="center"
    :badge="language.badge"
  >
    <LanguageBarV2 :key="index" :language="language" style="width: 100%" />
  </CardItem>

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
import type { LanguageBarType } from '~/types/common/LanguageBar'

defineProps<{
  title: string
}>()

const items = reactive([
  { id: 'productivity', label: 'Productivity' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'production', label: 'Audio and video production' },
  { id: 'development', label: 'Software development' }
])

const { tm } = useI18n()
const languages: Ref<LanguageBarType[]> = computed(() =>
  tm('components.containers.languages')
)
</script>
