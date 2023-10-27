import { fallbackLocale, languages, locale } from './assets/lang/index';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  typescript: {
    typeCheck: true,
  },
  ssr: false,
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: ['de', 'en', 'fr', 'it'],
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: languages,
  },
});
