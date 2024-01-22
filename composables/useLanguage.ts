import { useState } from "#app";

export const useLanguage = () => {
  const currentLanguage = useState("currentLanguage", () => "en");
  const availableLanguages = useState("availableLanguages", () => ({
    en: "English",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano",
  }));

  const languageLocales = {
    en: ["en", "en-US", "en-GB"],
    de: ["de", "de-DE"],
    fr: ["fr", "fr-FR"],
    it: ["it", "it-IT"],
  };

  function setLanguage(lang: string) {
    currentLanguage.value = lang;
    const { i18n } = useNuxtApp();

    if (i18n) {
      i18n.locale = lang;
    }
  }

  function suggestLanguage() {
    const browserLang = navigator.language.slice(0, 2);
    if (Object.keys(languageLocales).includes(browserLang)) {
      setLanguage(browserLang);
    }
  }

  return {
    currentLanguage,
    availableLanguages,
    setLanguage,
    suggestLanguage,
  };
};
