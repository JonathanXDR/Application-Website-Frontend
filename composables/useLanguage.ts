import { useI18n } from "vue-i18n";

export const useLanguage = () => {
  const { locale, setLocale } = useI18n();
  const currentLanguage = useState<string>("currentLanguage", () =>
    detectInitialLanguage()
  );
  const availableLanguages = useState<{ [key: string]: string }>(
    "availableLanguages",
    () => languageNames
  );

  const languageLocales: { [key: string]: string[] } = {
    en: [
      "en",
      "en-au",
      "en-ca",
      "en-in",
      "en-nz",
      "en-za",
      "en-gb-oxendict",
      "en-gb",
      "en-us",
    ],
    zh_CN: ["zh-cn"],
    zh_TW: ["zh-tw"],
    ja_JP: ["ja", "ja-jp"],
    ko_KR: ["ko", "ko-kr"],
    de_DE: ["de", "de-at", "de-de", "de-li", "de-ch"],
    es_lamr: [
      "es",
      "es-ar",
      "es-cl",
      "es-co",
      "es-cr",
      "es-hn",
      "es-419",
      "es-lamr",
      "es-mx",
      "es-pe",
      "es-es",
      "es-us",
      "es-uy",
      "es-ve",
    ],
    fr_FR: ["fr", "fr-ca", "fr-fr", "fr-ch"],
    it_IT: ["it", "it-it", "it-ch"],
    pt_BR: ["pt", "pt-br", "pt-pt"],
  };

  const languageNames: { [key: string]: string } = {
    en: "English",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
    "ja-JP": "日本語",
    "ko-KR": "한국어",
    "de-DE": "Deutsch",
    "es-lamr": "Español",
    "fr-FR": "Français",
    "it-IT": "Italiano",
    "pt-BR": "Português",
  };

  function detectInitialLanguage(): string {
    try {
      const storedLang = localStorage.getItem("userLanguage");
      const browserLang = navigator.language.slice(0, 2);
      return storedLang || (languageLocales[browserLang] ? browserLang : "en");
    } catch (error) {
      console.error("Error detecting initial language:", error);
      return "en";
    }
  }

  function setLanguage(lang: string) {
    try {
      currentLanguage.value = lang;
      locale.value = lang;
      setLocale(lang);
      localStorage.setItem("userLanguage", lang);
      document.documentElement.lang = lang;
    } catch (error) {
      console.error("Error setting language:", error);
    }
  }

  function generateLanguageOptions() {
    const pageLang = document.documentElement.lang;
    return Object.keys(languageNames)
      .filter((lang) => lang !== pageLang)
      .map((lang) => ({ lang, name: languageNames[lang] }));
  }

  return {
    currentLanguage,
    availableLanguages,
    setLanguage,
    generateLanguageOptions,
  };
};
