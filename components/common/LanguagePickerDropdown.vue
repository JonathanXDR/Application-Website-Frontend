<template>
  <div class="DeveloperLanguagePicker DeveloperLanguagePicker_DeveloperLanguagePicker__RV16Y">
    <div class="language-dropdown dropdown-container legacy-form">
      <select class="I18nLanguageSelect_I18nLanguageSelect__f3ZyV">
        <option v-for="lang in languages" :key="lang.key" :value="lang.key">{{ lang.title }}</option>
      </select>
      <span class="DeveloperLanguagePicker_DropdownArrow__r29TD icon icon-chevrondown"></span>
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
/*! CSS Used from: https://developer.apple.com/assets/styles/dark-mode.css */
html body[data-color-scheme='dark'] .dropdown-container select,
html body[data-color-scheme='dark'] .dropdown-container {
  color: var(--glyph-blue);
}

html body[data-color-scheme='dark'] .dropdown-container select,
html body[data-color-scheme='dark'] .dropdown-container:hover * {
  color: var(--glyph-blue);
}

html body.dmf select {
  color: var(--glyph-gray);
}

html body.dmf .dropdown-container select,
html body.dmf .dropdown-container:hover * {
  color: var(--glyph-blue);
}

/*! CSS Used from: https://developer.apple.com/account/_next/static/css/f148b6570a351e02.css */
/*! @import https://developer.apple.com/assets/styles/globalnav.css */
select {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: "liga", "kern";
}

/*! end @import */
/*! @import https://developer.apple.com/assets/styles/global.dist.css */
:focus {
  outline: 4px solid rgba(0, 125, 250, 0.6);
  outline-offset: 1px;
}

select {
  font-synthesis: none;
  -moz-font-feature-settings: 'kern';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  direction: ltr;
  text-align: left;
}

.icon::before,
.icon::after {
  font-family: "SF Pro Icons";
  color: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: inherit;
  font-size: inherit;
  line-height: 1;
  text-decoration: underline;
  position: relative;
  z-index: 1;
  alt: '';
}

.icon::before,
.icon::after {
  text-decoration: none;
}

.icon::before {
  display: none;
}

.icon-chevrondown::before,
.icon-chevrondown::after {
  content: "";
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

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

.legacy-form select,
.legacy-form select:focus {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}

.legacy-form select:focus {
  border-color: #0088cc;
  outline: 0;
  box-shadow: 0 0 0 3px rgba(0, 136, 204, 0.3);
  z-index: 9;
}

/*! end @import */
/*! CSS Used from: https://developer.apple.com/account/_next/static/css/1f42f4c7b0eeb9b3.css */
.I18nLanguageSelect_I18nLanguageSelect__f3ZyV {
  color: #06c;
  font-weight: 600;
  line-height: 1.333333;
  display: inline;
  direction: rtl;
  width: auto;
  height: auto;
  padding: 0 .75rem 0 0;
  border-radius: 0;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

.DeveloperLanguagePicker_DeveloperLanguagePicker__RV16Y {
  display: inline-block;
  font-size: 12px;
}

.DeveloperLanguagePicker_DeveloperLanguagePicker__RV16Y>div {
  display: inline;
  position: relative;
  float: right;
  z-index: 2;
}

.DeveloperLanguagePicker_DeveloperLanguagePicker__RV16Y select {
  color: #06c;
  font-weight: 600;
  line-height: 1.333333;
  display: inline;
  direction: rtl;
  width: auto;
  height: auto;
  padding: 0 .75rem 0 0;
  border-radius: 0;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

.DeveloperLanguagePicker_DropdownArrow__r29TD {
  position: absolute;
  right: 0;
  line-height: 1.3;
  pointer-events: none;
}

/*! CSS Used from: https://developer.apple.com/account/_next/static/css/135353ed80c5a988.css */
.I18nLanguageSelect_I18nLanguageSelect__f3ZyV {
  color: #06c;
  font-weight: 600;
  line-height: 1.333333;
  display: inline;
  direction: rtl;
  width: auto;
  height: auto;
  padding: 0 .75rem 0 0;
  border-radius: 0;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

.DeveloperLanguagePicker_DeveloperLanguagePicker__RV16Y {
  display: inline-block;
  font-size: 12px;
}

.DeveloperLanguagePicker_DeveloperLanguagePicker__RV16Y>div {
  display: inline;
  position: relative;
  float: right;
  z-index: 2;
}

.DeveloperLanguagePicker_DeveloperLanguagePicker__RV16Y select {
  color: #06c;
  font-weight: 600;
  line-height: 1.333333;
  display: inline;
  direction: rtl;
  width: auto;
  height: auto;
  padding: 0 .75rem 0 0;
  border-radius: 0;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

.DeveloperLanguagePicker_DropdownArrow__r29TD {
  position: absolute;
  right: 0;
  line-height: 1.3;
  pointer-events: none;
}

/*! CSS Used from: https://developer.apple.com/assets/styles/globalnav.css?23182355271 */
select {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: "liga", "kern";
}

/*! CSS Used from: https://developer.apple.com/assets/styles/language-dropdown.css?23182355271 */
.dropdown-container {
  display: inline;
  position: relative;
  float: right;
  z-index: 2;
}

@media only screen and (max-width: 767px) {
  .dropdown-container {
    padding-top: 12px;
  }
}

.dropdown-container select {
  color: #0066CC;
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

  .dropdown-container select:active+span {
    display: none;
  }
}

.dropdown-container select:active,
.dropdown-container select:focus {
  border: none;
  outline: none;
}

.dropdown-container option {
  direction: ltr;
}

.dropdown-container:hover * {
  text-decoration: underline;
  color: #000;
}

.dropdown-container span {
  pointer-events: none;
  position: absolute;
}
</style>