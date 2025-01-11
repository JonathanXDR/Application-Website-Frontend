<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'

const props = withDefaults(
  defineProps<{
    introText?: boolean
    shortForm?: boolean
  }>(),
  {
    introText: true,
    shortForm: false,
  },
)

const { changeLanguage } = useLanguage()
const { t, locale, locales } = useI18n()

const computedLocales = computed<LocaleObject[]>(() =>
  locales.value.map((l: string | LocaleObject): LocaleObject => {
    if (typeof l === 'string') {
      return { code: l as LocaleObject['code'], name: l }
    }
    else {
      return { code: l.code as LocaleObject['code'], name: l.name }
    }
  }),
)

const getLabel = (locale: { code: string, name?: string }) => {
  const label = locale.name || locale.code
  return props.shortForm ? locale.code.toUpperCase() : label
}
</script>

<template>
  <section class="lang-switcher-container">
    <span
      v-if="introText"
      class="language-switcher-text"
    >
      {{ t("components.common.LanguagePickerBar.chooseYourLanguage") }}:
    </span>
    <ul class="locale-lang language-picker-wrapper">
      <li
        v-for="computedLocale in computedLocales"
        :key="computedLocale.code"
      >
        <input
          :id="computedLocale.code"
          type="radio"
          name="language"
          :checked="locale === computedLocale.code"
          @click="changeLanguage(computedLocale.code)"
        >
        <label
          :for="computedLocale.code"
          class="link"
        >
          {{ getLabel(computedLocale) }}
        </label>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.lang-switcher-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.lang-switcher-container .language-switcher-text {
  padding-right: 10px;
}

.lang-switcher-container .language-picker-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.language-picker-wrapper li > input[type="radio"] {
  display: none;
}

.lang-switcher-container .language-picker-wrapper li {
  padding-right: 10px;
  margin-right: 10px;
  border-right: 1px solid var(--color-figure-gray-secondary);
}

.lang-switcher-container .language-picker-wrapper li:last-of-type {
  border-right: none;
  padding-right: 0;
  margin-right: 0;
}

input[name="language"]:checked ~ label {
  color: var(--color-figure-gray-secondary) !important;
  pointer-events: none;
}
</style>
