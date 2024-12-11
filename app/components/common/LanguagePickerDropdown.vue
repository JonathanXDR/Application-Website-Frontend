<template>
  <div
    class="language-picker-dropdown"
    :style="{ fontSize: `${fontSize}px` }"
  >
    <div class="dropdown-container legacy-form">
      <select
        id="language-picker-dropdown"
        v-model="selectedLocale"
        class="dropdown-select"
        name="language"
        aria-label="Language Dropdown"
        @change="changeLanguage(selectedLocale)"
      >
        <option
          v-for="computedLocale in computedLocales"
          :key="computedLocale.code"
          :value="computedLocale.code"
        >
          {{
            breakpoints.greaterOrEqual('lg').value
              ? computedLocale.name
              : computedLocale.code.toUpperCase()
          }}
        </option>
      </select>
      <SFSymbol
        name="chevron.down"
        :class="`icon icon-${componentSize}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtendedSizeType } from '#shared/types/common/extended-size'

const properties = withDefaults(
  defineProps<{
    componentSize?: Exclude<ExtendedSizeType, 'xlarge'>
  }>(),
  {
    componentSize: 'small',
  }
)

const breakpoints = useAppBreakpoints()
const { changeLanguage } = useLanguage()
const { locale, locales } = useI18n()
const selectedLocale = ref(locale.value)

const computedLocales = computed(() =>
  locales.value.map((l) => {
    return typeof l === 'string' ? { code: l, name: l } : l
  })
)

const fontSize = computed(() => {
  const sizes: Record<string, number> = {
    xsmall: 12,
    small: 14,
    medium: 16,
    large: 18,
  }
  return sizes[properties.componentSize || 'medium']
})

watch(locale, (localeNew) => {
  selectedLocale.value = localeNew
})
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

.dropdown-container:hover * {
  text-decoration: underline;
}
</style>
