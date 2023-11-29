// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  typescript: {
    typeCheck: true,
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Discover the work of Jonathan Russ and learn more about him, including his projects at Swisscom.',
        },
      ],
      title: 'Jonathan Russ',
    },
  },
  components: {
    dirs: [
      {
        path: '~/components/containers',
        global: true,
      },
      '~/components/common',
    ],
  },
});
