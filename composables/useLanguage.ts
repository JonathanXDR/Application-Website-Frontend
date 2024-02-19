import { useI18n } from 'vue-i18n'

export const useLanguage = () => {
  const { locale, locales, setLocale } = useI18n()

  const availableLocales = computed(() =>
    locales.value.filter(
      l => (typeof l === 'string' ? l : l.code) !== locale.value
    )
  )

  const isLocaleAvailable = (localeCode: string) =>
    availableLocales.value.some(
      l => (typeof l === 'string' ? l : l.code) === localeCode
    )

  const changeLanguage = (newLocale: string) => {
    if (isLocaleAvailable(newLocale)) {
      setLocale(newLocale)
    }
  }

  return {
    changeLanguage
  }
}
