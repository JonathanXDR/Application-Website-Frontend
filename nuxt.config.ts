import tailwindcss from '@tailwindcss/vite'
import { definePerson } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  modules: [
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    'nuxt-security',
    'nuxt-viewport',
  ],
  $development: {
    app: {
      head: {
        link: [
          {
            rel: 'icon',
            type: 'image/svg+xml',
            href: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20100%20100%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2220%22%20fill%3D%22%23f56300%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23ffffff%22%0A%20%20%20%20%20%20%20%20d%3D%22M26.30%2069.58Q21.90%2069.58%2018.71%2068.09Q15.52%2066.61%2013.76%2063.80L13.76%2063.80L19.64%2058.20Q22.17%2062.27%2026.41%2062.27L26.41%2062.27Q31.58%2062.27%2032.79%2056.27L32.79%2056.27L36.47%2037.57L23.00%2037.57L24.43%2030.42L46.76%2030.42L41.64%2055.83Q40.21%2063.20%2036.47%2066.39Q32.73%2069.58%2026.30%2069.58L26.30%2069.58ZM86.25%2042.36Q86.25%2047.75%2083.33%2051.59Q80.41%2055.45%2075.25%2057.04L75.25%2057.04L81.95%2068.92L72.55%2068.92L66.50%2058.14L58.91%2058.14L56.77%2068.92L47.80%2068.92L55.50%2030.42L71.17%2030.42Q78.32%2030.42%2082.28%2033.55Q86.25%2036.69%2086.25%2042.36L86.25%2042.36ZM67.88%2051.05Q72.33%2051.05%2074.78%2049.01Q77.22%2046.98%2077.22%2043.18L77.22%2043.18Q77.22%2040.43%2075.35%2039.06Q73.48%2037.68%2070.02%2037.68L70.02%2037.68L62.98%2037.68L60.28%2051.05L67.88%2051.05Z%22%3E%0A%20%20%20%20%3C%2Fpath%3E%0A%3C%2Fsvg%3E',
          },
        ],
      },
    },
    scripts: {
      globals: {
        meticulousAi: {
          'src': 'https://snippet.meticulous.ai/v1/meticulous.js',
          'data-project-id': '3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w',
          'data-is-production-environment': false,
        },
      },
    },
    security: {
      headers: {
        crossOriginEmbedderPolicy: 'unsafe-none',
        contentSecurityPolicy: {
          'upgrade-insecure-requests': false,
        },
      },
    },
  },
  $production: {
    app: {
      head: {
        link: [
          {
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/img/favicon.svg',
          },
        ],
      },
    },
    scripts: {
      globals: {
        meticulousAi: {
          'src': 'https://snippet.meticulous.ai/v1/meticulous.js',
          'data-project-id': '3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w',
          'data-is-production-environment': true,
        },
      },
    },
    security: {
      headers: {
        crossOriginEmbedderPolicy: 'require-corp',
        contentSecurityPolicy: {
          'upgrade-insecure-requests': true,
        },
      },
    },
    seo: {
      redirectToCanonicalSiteUrl: true,
      meta: {
        description: process.env.SITE_DESCRIPTION,
        twitterCreator: '@JonathanXD12_',
        twitterSite: '@JonathanXD12_',
        author: 'Jonathan Russ',
        colorScheme: 'dark light',
        applicationName: process.env.NUXT_PUBLIC_APP_NAME,
      },
    },
  },
  ssr: true,
  components: {
    dirs: [
      {
        path: '~/components/containers',
        global: true,
      },
      '~/components/common',
    ],
  },
  // imports: {
  //   dirs: [
  //     '#/shared/types/common',
  //     '#/shared/types/components',
  //     '#/shared/types/services/github',
  //   ],
  // },
  devtools: {
    enabled: false,
    timeline: {
      enabled: true,
    },
  },
  app: {
    head: {
      templateParams: {
        site: {
          name: process.env.SITE_NAME,
          url: process.env.SITE_URL,
        },
      },
      link: [{ rel: 'apple-touch-icon', href: process.env.SITE_LOGO }],
      meta: [
        { name: 'title', content: process.env.SITE_NAME },
        // { property: 'og:image', content: process.env.SITE_LOGO },
        { property: 'og:title', content: process.env.SITE_NAME },
        { property: 'og:url', content: process.env.SITE_URL },
        // {
        //   property: 'twitter:image',
        //   content: process.env.SITE_LOGO,
        // },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:title', content: process.env.SITE_NAME },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  site: {
    url: process.env.SITE_URL,
    name: process.env.SITE_NAME,
    trailingSlash: true,
  },
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      appName: '',
      appBuild: '',
      appVersion: '',
      appIcon: '',
      appEnvironment: '',
      appleMusicBaseUrl: '',
      githubRepoName: '',
      githubRepoOwner: '',
    },
    githubToken: '',
    appleDeveloperPrivateKey: '',
    appleDeveloperKeyId: '',
    appleDeveloperTeamId: '',
    appleMusicUserToken: '',
  },
  ignore: ['~/assets/drafts/**'],
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    typedPages: true,
    sharedPrerenderData: true,
    checkOutdatedBuildInterval: 1000 * 10,
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'bun',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    typeCheck: true,
    strict: true,
    // Customize app/server TypeScript config
    tsConfig: {
      compilerOptions: {
        strict: true,
      },
    },
    // Customize build-time TypeScript config
    nodeTsConfig: {
      compilerOptions: {
        strict: true,
      },
    },
  },
  eslint: {
    config: {
      tooling: true,
      stylistic: true,
      typescript: {
        strict: true,
      },
    },
  },
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
    families: [
      {
        name: 'system-ui',
        provider: 'none',
        fallbacks: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    ],
  },
  i18n: {
    baseUrl: process.env.SITE_URL,
    trailingSlash: true,
    // lazy: true,
    strategy: 'prefix_except_default',
    defaultLocale: 'de',
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
      cookieDomain: process.env.SITE_DOMAIN,
      cookieKey: 'i18n_redirected',
      cookieSecure: true,
      fallbackLocale: 'en',
      redirectOn: 'root',
    },
    locales: [
      {
        code: 'de',
        language: 'de-DE',
        name: 'Deutsch',
        isCatchallLocale: true,
        // file: 'de.json'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        // file: 'en.json'
      },
      {
        code: 'fr',
        language: 'fr-FR',
        name: 'Français',
        // file: 'fr.json'
      },
      {
        code: 'it',
        language: 'it-IT',
        name: 'Italiano',
        // file: 'it.json'
      },
    ],
  },

  icon: {
    componentName: 'NuxtIcon',
    serverBundle: {
      externalizeIconsJson: true,
    },
    clientBundle: {
      scan: true,
    },
    customCollections: [
      {
        prefix: 'sf-symbols',
        dir: './app/assets/icons/sf-symbols',
        normalizeIconName: false,
      },
      {
        prefix: 'simple-icons-extended',
        dir: './app/assets/icons/simple-icons-extended',
        normalizeIconName: false,
      },
    ],
  },
  image: {
    provider: 'vercel',
    screens: {
      '2xs': 320,
      'xs': 475,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
      'portrait': 411,
      'portrait2x': 822,
    },
    densities: [1, 2],
  },
  robots: {
    disallow: ['/de/**', '/en/**', '/fr/**', '/it/**'],
  },
  schemaOrg: {
    identity: definePerson({
      name: 'Jonathan Elias Russ',
      givenName: 'Jonathan',
      familyName: 'Russ',
      additionalName: 'Elias',

      image: `${process.env.SITE_URL}/img/portrait.jpg`,
      description: 'Software Engineer, Musician, and Creator',
      jobTitle: 'Software Engineer',

      email: 'contact@jonathan-russ.com',
      url: process.env.SITE_URL,
      logo: process.env.SITE_LOGO,
      sameAs: [
        'https://x.com/JonathanXD12_',
        'https://github.com/JonathanXDR',
        'https://linkedin.com/in/jonathan-russ-b7442a228',
        'https://www.instagram.com/jonathan_russ_',
        'https://www.threads.net/jonathan_russ_',
        'https://www.reddit.com/user/JonathanXD12',
      ],

      worksFor: {
        '@type': 'Organization',
        'name': 'Swisscom',
        'url': 'https://www.swisscom.ch',
      },
    }),
  },
  scripts: {
    defaultScriptOptions: {
      bundle: true,
    },
    registry: {
      googleAnalytics: {
        id: '',
      },
      googleTagManager: {
        id: '',
      },
    },
    // TODO: Implement once ready
    // globals: {
    //   musicKit: {
    //     src: 'https://js-cdn.music.apple.com/musickit/v3/musickit.js',
    //     async: true,
    //     'data-web-components': true,
    //   },
    // },
  },
  security: {
    strict: true,
    csrf: true,
    headers: {
      contentSecurityPolicy: {
        'default-src': ['\'self\'', process.env.SITE_URL || ''],
        'style-src': ['\'self\'', '\'unsafe-inline\'', process.env.SITE_URL || ''],
        'script-src': [
          '\'self\'',
          '\'strict-dynamic\'',
          '\'nonce-{{nonce}}\'',
          'https://*.googletagmanager.com',
          'https://snippet.meticulous.ai',
          'https://browser.sentry-cdn.com',
          'https://*.apple.com',
          process.env.SITE_URL || '',
        ],
        'img-src': [
          '\'self\'',
          'data:',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://*.googletagmanager.com',
          'https://*.g.doubleclick.net',
          'https://*.google.com',
          'https://*.apple.com',
          process.env.SITE_URL || '',
        ],
        'connect-src': [
          '\'self\'',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://*.googletagmanager.com',
          'https://*.g.doubleclick.net',
          'https://*.google.com',
          'https://cognito-identity.us-west-2.amazonaws.com',
          'https://user-events-v3.s3-accelerate.amazonaws.com',
          '*.sentry.io',
          'https://*.apple.com',
          process.env.SITE_URL || '',
        ],
      },
    },
  },
  sitemap: {
    defaults: {
      lastmod: process.env.NUXT_PUBLIC_APP_DATE || new Date().toISOString(),
    },
    exclude: ['/de/**', '/en/**', '/fr/**', '/it/**'],
  },
  viewport: {
    breakpoints: {
      mobile: 320,
      mobileMedium: 475,
      mobileWide: 640,
      tablet: 768,
      desktop: 1024,
      desktopMedium: 1280,
      desktopWide: 1536,
    },

    fallbackBreakpoint: 'lg',
  },
})
