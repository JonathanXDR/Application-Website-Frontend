<template>
  <section class="lang-switcher-container">
    <span v-if="introText" class="language-switcher-text">
      {{ $t("components.common.FooterItem.chooseYourLanguage") }}:
    </span>
    <ul class="locale-lang language-picker-wrapper">
      <li v-for="locale in computedLocales" :key="locale.code">
        <input
          type="radio"
          @click="changeLanguage(locale.code)"
          name="language"
          :id="locale.code"
          :checked="currentLocale === locale.code"
        />
        <label :for="locale.code" class="link">
          {{ getLabel(locale) }}
        </label>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    introText?: boolean;
    shortForm?: boolean;
  }>(),
  {
    introText: () => true,
    shortForm: () => false,
  }
);

const { changeLanguage, initializeLanguage } = useLanguage();
const { locale: currentLocale, locales } = useI18n({ useScope: "global" });

console.log("Locales from i18n:", locales.value);

const computedLocales = computed(() =>
  locales.value.map((locale) => {
    if (typeof locale === "string") {
      return { code: locale, name: locale };
    }
    return locale;
  })
);

const getLabel = (locale: { code: string; name?: string }) => {
  const label = locale.name || locale.code;
  return props.shortForm ? locale.code.toUpperCase() : label;
};

onMounted(() => {
  initializeLanguage();
});
</script>

<style scoped>
/* ------------------------- lang-switcher-container ------------------------ */

.lang-switcher-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* ---------------------------------- language-switcher-text  ---------------------------------- */

.lang-switcher-container .language-switcher-text {
  padding-right: 10px;
}

/* ------------------------- language-picker-wrapper ------------------------ */

.lang-switcher-container .language-picker-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.language-picker-wrapper li > input[type="radio"] {
  display: none;
}

/* ----------------------------------- li ----------------------------------- */

.lang-switcher-container .language-picker-wrapper li {
  padding-right: 10px;
  margin-right: 10px;
  border-right: 1px solid var(--color-fill-gray-secondary);
}

.lang-switcher-container .language-picker-wrapper li:last-of-type {
  border-right: none;
  padding-right: 10px;
  margin-right: 20px;
}

/* ---------------------------------- label --------------------------------- */

input[name="language"]:checked ~ label {
  color: var(--color-fill-gray-secondary) !important;
  pointer-events: none;
}
</style>
