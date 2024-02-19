import { useI18n } from 'vue-i18n'

export const useLanguage = (): {
  changeLanguage: (newLocale: string) => void
} => {
  const { locale, locales, setLocale } = useI18n()

  const availableLocales = computed(() =>
    locales.value.filter(
      l => (typeof l === 'string' ? l : l.code) !== locale.value
    )
  )

  const isLocaleAvailable = (localeCode: string): boolean =>
    availableLocales.value.some(
      l => (typeof l === 'string' ? l : l.code) === localeCode
    )

  const changeLanguage = async (newLocale: string): Promise<void> => {
    if (isLocaleAvailable(newLocale)) {
      await setLocale(newLocale)
    }
  }

  return {
    changeLanguage
  }
}
