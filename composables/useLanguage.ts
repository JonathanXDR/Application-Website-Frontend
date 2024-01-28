import { useI18n } from "vue-i18n";

export const useLanguage = () => {
  const { locale, locales, setLocale } = useI18n();

  const availableLocales = computed(() => {
    return locales.value.filter((i) => {
      if (typeof i === "string") {
        return i !== locale.value;
      } else {
        return i.code !== locale.value;
      }
    });
  });

  const isLocaleAvailable = (localeCode: string) => {
    return availableLocales.value.some((l) => {
      if (typeof l === "string") {
        return l === localeCode;
      } else {
        return l.code === localeCode;
      }
    });
  };

  const changeLanguage = (newLocale: string) => {
    if (isLocaleAvailable(newLocale)) {
      setLocale(newLocale);
    }
  };

  return {
    changeLanguage,
  };
};
