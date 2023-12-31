<template>
  <section class="lang-switcher-container">
    <span v-if="introText" class="language-switcher-text">
      {{ $t("components.common.FooterItem.chooseYourLanguage") }}:
    </span>
    <ul class="locale-lang language-picker-wrapper">
      <li v-for="lang in languages" :key="lang.key">
        <input
          type="radio"
          @click="changeLang(lang.key)"
          name="language"
          :id="lang.key"
          class="hideRadio"
          :checked="$i18n.locale === lang.key"
        />
        <label :for="lang.key" class="link">
          {{ getLabel(lang) }}
        </label>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps({
  introText: {
    type: Boolean,
    required: false,
    default: () => true,
  },
  shortForm: {
    type: Boolean,
    required: false,
    default: () => false,
  },
});

const { locale } = useI18n();
const languages = reactive([
  { title: "Deutsch", key: "de", abbr: "DE" },
  { title: "English", key: "en", abbr: "EN" },
  { title: "Français", key: "fr", abbr: "FR" },
  { title: "Italiano", key: "it", abbr: "IT" },
]);

const changeLang = (lang: string) => {
  const localStorageLocale = ["de", "en", "fr", "it"].includes(lang)
    ? lang
    : "de";
  localStorage.setItem("language", localStorageLocale);
  locale.value = localStorageLocale;
};

const getLabel = (lang: { abbr: string; title: string }) => {
  return props.shortForm ? lang.abbr : lang.title;
};

onMounted(() => {
  if (localStorage.getItem("language") === null) {
    const preferredLanguage = window.navigator.language;
    changeLang(preferredLanguage);
  } else {
    changeLang(localStorage.getItem("language") as string);
  }
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

/* ----------------------------------- li ----------------------------------- */

.lang-switcher-container .language-picker-wrapper li {
  padding-right: 10px;
  margin-right: 10px;
  border-right: 1px solid var(--color-fill-gray-tertiary);
}

.lang-switcher-container .language-picker-wrapper li:last-of-type {
  border-right: none;
  padding-right: 10px;
  margin-right: 20px;
}

/* -------------------------------- hideRadio ------------------------------- */

.hideRadio {
  display: none;
}

/* ---------------------------------- label --------------------------------- */

input[name="language"]:checked ~ label {
  color: var(--color-fill-gray-secondary) !important;
  pointer-events: none;
}
</style>
