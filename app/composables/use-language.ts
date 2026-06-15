import type { LocaleObject } from '@nuxtjs/i18n'

export const useLanguage = () => {
  const { locales, setLocale } = useI18n()

  const isLocaleAvailable = (localeCode: string) =>
    locales.value.some(index => index.code === localeCode)

  const changeLanguage = (localeNew: LocaleObject['code']) => {
    if (isLocaleAvailable(localeNew)) {
      setLocale(localeNew)
    }
  }

  return {
    changeLanguage,
  }
}
