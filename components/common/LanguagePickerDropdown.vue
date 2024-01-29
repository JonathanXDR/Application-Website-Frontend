<template>
  <div class="language-picker-dropdown">
    <div class="dropdown-container legacy-form">
      <select
        class="dropdown-select"
        v-model="selectedLocale"
        @change="changeLanguage(selectedLocale)"
      >
        <option
          v-for="locale in computedLocales"
          :key="locale.code"
          :value="locale.code"
        >
          {{ locale.name }}
        </option>
      </select>
      <Icon name="chevron.down" class="icon icon-xsmall" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { changeLanguage } = useLanguage();
const { locale, locales } = useI18n({ useScope: "global" });
const selectedLocale = ref(locale.value);

const computedLocales = computed(() =>
  locales.value.map((locale) => {
    if (typeof locale === "string") {
      return { code: locale, name: locale };
    }
    return locale;
  })
);
</script>

<style scoped>
.legacy-form select {
  background: transparent;
  width: 100%;
  height: 34px;
  padding: 0 2em 0 1em;
  font-size: 1em;
  font-family: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
  border-radius: 4px;
  border: none;
  margin: 0;
  cursor: pointer;
}

.dropdown-select {
  color: var(--color-figure-blue);
  font-weight: 600;
  line-height: 1.333333;
  display: inline;
  direction: rtl;
  width: auto;
  height: auto;
  padding: 0 0.75rem 0 0;
  border-radius: 0;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

.language-picker-dropdown {
  display: inline-block;
  font-size: 12px;
}

.language-picker-dropdown select {
  color: var(--color-figure-blue);
  font-weight: 600;
  line-height: 1.333333;
  display: inline;
  direction: rtl;
  width: auto;
  height: auto;
  padding: 0 0.75rem 0 0;
  border-radius: 0;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

.dropdown-arrow {
  position: absolute;
  right: 0;
  line-height: 1.3;
  pointer-events: none;
}

.dropdown-container {
  display: flex;
  align-items: center;
  color: var(--color-figure-blue);
}

.dropdown-container select {
  color: var(--color-figure-blue);
  font-weight: 600;
  line-height: 1.333333;
  display: inline;
  direction: rtl;
  width: initial;
  height: initial;
  padding: 0 0.75rem 0 0;
  border-radius: 0;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

@media (max-width: 850px) {
  .dropdown-container select:active {
    font-size: 16px;
    transform-origin: top left;
    transform: scale(0.719);
  }
}

.dropdown-container:hover * {
  text-decoration: underline;
}
</style>
