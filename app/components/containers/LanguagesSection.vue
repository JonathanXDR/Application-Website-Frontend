<template>
  <h1>{{ title }}</h1>

  <div class="graph">
    <template
      v-for="(language, index) in languages"
      :key="index"
    >
      <LanguageBar
        v-if="language"
        v-bind="{
          ...language,
          componentSize: viewport.isLessThan('tablet')
            ? 'small'
            : viewport.isLessThan('desktopMedium')
              ? 'medium'
              : 'large',
          width: viewport.isLessThan('tablet') ? 'full' : 'compact',
        }"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { LanguageBarType } from '#shared/types/common/language-bar'

defineProps<{
  title: string
}>()

const { tm, rt } = useI18n()
const viewport = useViewport()

const rawLanguages = computed<LanguageBarType[]>(() =>
  tm('components.containers.languages'),
)

const languages = computed<LanguageBarType[]>(() =>
  rawLanguages.value.map(lang => ({
    ...lang,
    label: rt(lang.label),
    description: rt(lang.description),
  })),
)
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
@media only screen and (max-width: 1023px) {
  .graph {
    grid-row-gap: 32px;
    row-gap: 32px;
  }
}
@media only screen and (max-width: 767px) {
  .graph {
    grid-column-gap: 20px;
    column-gap: 20px;
  }
}
</style>
