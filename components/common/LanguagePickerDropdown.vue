<template>
  <div class="language-picker-dropdown">
    <div class="dropdown-container legacy-form">
      <select class="dropdown-select">
        <option v-for="lang in languages" :key="lang.key" :value="lang.key">
          {{ lang.title }}
        </option>
      </select>
      <Icon name="chevron.down" class="icon icon-xsmall" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "LanguagePickerDropdown",
  props: {
    introText: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: () => true,
    },
    shortForm: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: () => false,
    },
  },
  setup(props) {
    const { locale } = useI18n({ useScope: "global" });
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
      if (localStorage.getItem("language") === undefined) {
        const preferredLanguage = window.navigator.language;
        changeLang(preferredLanguage);
      } else {
        changeLang(localStorage.getItem("language") as string);
      }
    });

    return {
      languages,
      changeLang,
      getLabel,
    };
  },
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

@media only screen and (max-width: 767px) {
  .dropdown-container {
    padding-top: 12px;
  }
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
  .dropdown-container select {
    direction: ltr;
  }

  .dropdown-container select:active {
    font-size: 16px;
    transform-origin: top left;
    transform: scale(0.719);
  }

  .dropdown-container select:active + span {
    display: none;
  }
}

.dropdown-container option {
  direction: ltr;
}

.dropdown-container:hover * {
  text-decoration: underline;
}

.dropdown-container span {
  pointer-events: none;
  position: absolute;
}
</style>
