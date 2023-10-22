import { defaultLocale, fallbackLocale, languages } from "./assets/lang";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    [
      "@nuxtjs/i18n",
      {
        locales: languages,
        defaultLocale: defaultLocale,
        vueI18n: {
          fallbackLocale: fallbackLocale,
          messages: languages,
        },
      },
    ],
  ],
});
