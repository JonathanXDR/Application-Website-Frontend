<template>
  <div class="language-picker-dropdown" :style="{ fontSize: `${fontSize}px` }">
    <div class="dropdown-container legacy-form">
      <select
        v-model="selectedLocale"
        class="dropdown-select"
        aria-label="Language Dropdown"
        @change="changeLanguage(selectedLocale)"
      >
        <option
          v-for="computedLocale in computedLocales"
          :key="computedLocale.code"
          :value="computedLocale.code"
        >
          {{
            windowWidth < 900
              ? computedLocale.code.toUpperCase()
              : computedLocale.name
          }}
        </option>
      </select>
      <Symbol name="chevron.down" :class="`icon icon-${componentSize}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtendedSizeType } from "~/types/common/ExtendedSize";

const props = withDefaults(
  defineProps<{
    componentSize?: Exclude<ExtendedSizeType, "xlarge">;
  }>(),
  {
    componentSize: "small",
  },
);

const { changeLanguage } = useLanguage();
const { locale, locales } = useI18n();
const selectedLocale = ref(locale.value);
const { width: windowWidth } = useWindowSize({ initialWidth: 0 });

const computedLocales = computed(() =>
  locales.value.map((l) => {
    return typeof l === "string" ? { code: l, name: l } : l;
  }),
);

const fontSize = computed(() => {
  const sizes: Record<string, number> = {
    xsmall: 12,
    small: 14,
    medium: 16,
    large: 18,
  };
  return sizes[props.componentSize || "medium"];
});

watch(locale, (newLocale) => {
  selectedLocale.value = newLocale;
});
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
}

.language-picker-dropdown select {
  color: var(--color-figure-blue);
  font-weight: 600;
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
