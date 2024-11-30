import type { LocaleObject } from "@nuxtjs/i18n";

export const useLanguage = () => {
  const { locale, locales, setLocale } = useI18n();

  const availableLocales = computed(() => {
    return locales.value.filter((index) => index.code !== locale.value);
  });

  const isLocaleAvailable = (localeCode: string) =>
    locales.value.some((index) => index.code === localeCode);

  const changeLanguage = (localeNew: LocaleObject["code"]) => {
    if (isLocaleAvailable(localeNew)) {
      setLocale(localeNew);
    }
  };

  return {
    availableLocales,
    changeLanguage,
  };
};
