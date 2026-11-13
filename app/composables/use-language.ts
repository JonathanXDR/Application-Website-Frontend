import type { LocaleObject } from '@nuxtjs/i18n'

export const useLanguage = () => {
  const { locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()

  const isLocaleAvailable = (localeCode: string) =>
    locales.value.some(index => index.code === localeCode)

  const changeLanguage = (localeNew: LocaleObject['code']) => {
    if (isLocaleAvailable(localeNew)) {
      // A full page load serves the prerendered page of the new locale. A
      // client-side switch changes the locale before Nuxt applies the route
      // payload, so mounted components miss it and Nuxt Content queries its
      // WASM database in the browser instead.
      return navigateTo(switchLocalePath(localeNew), { external: true })
    }
  }

  return {
    changeLanguage,
  }
}
