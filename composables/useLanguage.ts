import { useCookie } from "#app";
import { useI18n } from "vue-i18n";

export const useLanguage = () => {
  const { locale, locales, setLocale } = useI18n();
  const languageCookie = useCookie("i18n_redirected");
  const switchLocalePath = useSwitchLocalePath();

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
      languageCookie.value = newLocale;
    }
  };

  const initializeLanguage = () => {
    const preferredLanguage =
      languageCookie.value || window.navigator.language.split("-")[0];
    changeLanguage(preferredLanguage);
  };

  return {
    changeLanguage,
    initializeLanguage,
  };
};
