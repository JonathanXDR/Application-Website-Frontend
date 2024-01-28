export const useLanguage = () => {
  const { locale, locales, setLocale } = useI18n();
  const currentLanguage = useState<string>("currentLanguage", () =>
    detectInitialLanguage(),
  );

  const availableLanguages = () => {
    return locales.value.map((l) => ({ code: l, name: l }));
  };

  const detectInitialLanguage = () => {
    const storedLang = localStorage.getItem("userLanguage");
    return storedLang || locale.value;
  };

  const setLanguage = (lang: string) => {
    setLocale(lang);
    localStorage.setItem("userLanguage", lang);
  };

  return {
    currentLanguage,
    availableLanguages,
    setLanguage,
  };
};
