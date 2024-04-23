export const useLanguage = () => {
  const { locale, locales, setLocale } = useI18n()

  const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
  })

  const isLocaleAvailable = (localeCode: string) =>
    locales.value.some(i => i.code === localeCode)

  const changeLanguage = (newLocale: string) => {
    if (isLocaleAvailable(newLocale)) {
      setLocale(newLocale)
    }
  }

  return {
    availableLocales,
    changeLanguage,
  }
}
