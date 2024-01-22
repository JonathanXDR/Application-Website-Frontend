export const useLanguage = () => {
  const { locale, setLocale, locales } = useI18n();
  const currentLanguage = useState<string>("currentLanguage", () =>
    detectInitialLanguage()
  );

  const availableLanguages = computed(() =>
    locales.value.map((l) => (typeof l === "string" ? l : l.code))
  );

  function detectInitialLanguage(): string {
    const storedLang = localStorage.getItem("userLanguage");
    return storedLang || locale.value;
  }

  function setLanguage(lang: string) {
    currentLanguage.value = lang;
    setLocale(lang);
    updateStorage(lang);
  }

  function updateStorage(lang: string) {
    localStorage.setItem("userLanguage", lang);
  }

  return {
    currentLanguage,
    availableLanguages,
    setLanguage,
  };
};
