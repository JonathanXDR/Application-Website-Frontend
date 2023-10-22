import { defaultLocale, fallbackLocale, languages } from "./src/assets/lang";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: [
    { src: '~/plugins/font-awesome.ts' },
  ],
  modules: [
    [
      '@nuxtjs/i18n',
      {
        locales: languages,
        defaultLocale: defaultLocale,
        vueI18n: {
          fallbackLocale: fallbackLocale,
          messages: languages
        }
      }
    ]
  ]
})
