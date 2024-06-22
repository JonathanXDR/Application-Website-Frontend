import routerOptions from './router.options'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  plugins: ['~/plugins/api/github.server'],
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  typescript: {
    typeCheck: true,
    strict: true
  },
  eslint: {
    config: {
      // stylistic: true,
      typescript: {
        strict: true
      }
    }
  },
  ssr: true,
  future: {
    compatibilityVersion: 4
  },
  app: {
    head: {
      templateParams: {
        site: {
          name: 'JR',
          url: process.env.SITE_URL,
          description: process.env.SITE_DESCRIPTION
        }
      },
      titleTemplate: '%s %separator %siteName',
      meta: [
        { property: 'twitter:card', content: 'summary_large_image' },
        {
          property: 'twitter:description',
          content: process.env.SITE_DESCRIPTION
        },
        {
          property: 'og:description',
          content: process.env.SITE_DESCRIPTION
        },
        { property: 'og:url', content: 'https://jonathan-russ.com/en' },
        {
          name: 'description',
          content: process.env.SITE_DESCRIPTION
        }
      ],
      scripts: {
        defaultScriptOptions: {
          bundle: true
        },
        globals: [
          {
            src: 'https://js-cdn.music.apple.com/musickit/v1/musickit.js',
            async: true
          }
        ]
      }
    }
  },
  $development: {
    app: {
      head: {
        link: [
          {
            rel: 'icon',
            type: 'image/svg+xml',
            href: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20100%20100%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2220%22%20fill%3D%22%23f56300%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23ffffff%22%0A%20%20%20%20%20%20%20%20d%3D%22M26.30%2069.58Q21.90%2069.58%2018.71%2068.09Q15.52%2066.61%2013.76%2063.80L13.76%2063.80L19.64%2058.20Q22.17%2062.27%2026.41%2062.27L26.41%2062.27Q31.58%2062.27%2032.79%2056.27L32.79%2056.27L36.47%2037.57L23.00%2037.57L24.43%2030.42L46.76%2030.42L41.64%2055.83Q40.21%2063.20%2036.47%2066.39Q32.73%2069.58%2026.30%2069.58L26.30%2069.58ZM86.25%2042.36Q86.25%2047.75%2083.33%2051.59Q80.41%2055.45%2075.25%2057.04L75.25%2057.04L81.95%2068.92L72.55%2068.92L66.50%2058.14L58.91%2058.14L56.77%2068.92L47.80%2068.92L55.50%2030.42L71.17%2030.42Q78.32%2030.42%2082.28%2033.55Q86.25%2036.69%2086.25%2042.36L86.25%2042.36ZM67.88%2051.05Q72.33%2051.05%2074.78%2049.01Q77.22%2046.98%2077.22%2043.18L77.22%2043.18Q77.22%2040.43%2075.35%2039.06Q73.48%2037.68%2070.02%2037.68L70.02%2037.68L62.98%2037.68L60.28%2051.05L67.88%2051.05Z%22%3E%0A%20%20%20%20%3C%2Fpath%3E%0A%3C%2Fsvg%3E'
          },
          { rel: 'apple-touch-icon', href: '/img/dev/favicon-dev-orange.png' }
        ],
        meta: [
          {
            property: 'twitter:image',
            content: '/img/dev/favicon-dev-orange.png'
          },
          { property: 'twitter:title', content: 'Jonathan Russ | DEV' },
          { property: 'og:image', content: '/img/dev/favicon-dev-orange.png' },
          { property: 'og:title', content: 'Jonathan Russ | DEV' }
        ],
        scripts: {
          globals: [
            {
              src: 'https://snippet.meticulous.ai/v1/meticulous.js',
              ['data-project-id']: '3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w',
              ['data-is-production-environment']: false
            }
          ]
        }
      }
    }
  },
  $production: {
    app: {
      head: {
        link: [
          { rel: 'icon', type: 'image/svg+xml', href: '/img/favicon.svg' },
          { rel: 'apple-touch-icon', href: '/img/favicon.png' }
        ],
        meta: [
          { property: 'twitter:image', content: '/img/favicon.png' },
          { property: 'twitter:title', content: 'Jonathan Russ' },
          { property: 'og:image', content: '/img/favicon.png' },
          { property: 'og:title', content: 'Jonathan Russ' }
        ],
        scripts: {
          globals: [
            {
              src: 'https://snippet.meticulous.ai/v1/meticulous.js',
              ['data-project-id']: '3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w',
              ['data-is-production-environment']: true
            }
          ]
        }
      }
    }
  },
  router: {
    options: routerOptions
  },
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      appEnvironment: process.env.NODE_ENV,

      githubRepoName: process.env.GITHUB_REPO_NAME,
      githubRepoOwner: process.env.GITHUB_REPO_OWNER
    },

    githubToken: process.env.GITHUB_TOKEN,
    appleDeveloperToken: process.env.APPLE_DEVELOPER_TOKEN
  },
  components: {
    dirs: [
      {
        path: '~/components/containers',
        global: true
      },
      '~/components/common'
    ]
  },
  colorMode: {
    classSuffix: ''
  },
  seo: {
    redirectToCanonicalSiteUrl: true
  },
  site: {
    url: process.env.SITE_URL,
    name: process.env.SITE_NAME,
    description: process.env.SITE_DESCRIPTION
  },
  i18n: {
    baseUrl: process.env.SITE_URL,
    vueI18n: '~/i18n.config.ts',
    // lazy: true,
    // langDir: 'lang',
    strategy: 'prefix_and_default',
    defaultLocale: 'de',
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
      cookieDomain: 'jonathan-russ.com',
      cookieKey: 'i18n_redirected',
      cookieSecure: true,
      fallbackLocale: 'en',
      redirectOn: 'root'
    },
    locales: [
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch'
        // file: 'de.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English'
        // file: 'en.json'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français'
        // file: 'fr.json'
      },
      {
        code: 'it',
        iso: 'it-IT',
        name: 'Italiano'
        // file: 'it.json'
      }
    ]
  }
})
