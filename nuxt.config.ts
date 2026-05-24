import './seo-route-rules.d.ts'
import tailwindcss from '@tailwindcss/vite'
import { definePerson } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@vercel/analytics',
    '@vercel/speed-insights',
    '@vueuse/nuxt',
    'nuxt-security',
    'nuxt-viewport',
    '@nuxt/hints',
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
          'crossorigin': 'anonymous',
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
          'crossorigin': 'anonymous',
          'data-project-id': '3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w',
          'data-is-production-environment': true,
        },
      },
    },
    security: {
      headers: {
        crossOriginEmbedderPolicy: 'require-corp',
      },
    },
    seo: {
      redirectToCanonicalSiteUrl: true,
    },
  },
  ssr: true,
  // imports: {
  //   dirs: [
  //     '#/shared/types/common',
  //     '#/shared/types/components',
  //     '#/shared/types/services/github',
  //   ],
  // },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  app: {
    head: {
      link: [
        { rel: 'apple-touch-icon', href: process.env.NUXT_PUBLIC_APP_LOGO },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  // `site.name` and `site.url` are intentionally NOT set here — they're
  // auto-populated from NUXT_SITE_NAME / NUXT_SITE_URL at runtime by
  // nuxt-site-config, which keeps them live to env changes on redeploy
  // without baking build-time values into the SSR config.
  // https://nuxtseo.com/docs/site-config/guides/how-it-works
  site: {
    trailingSlash: true,
  },
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      // TODO: Currently unused, uncomment when needed
      // appName: '',
      // appBuild: '',
      // appVersion: '',
      // appIcon: '',
      appEnvironment: '',
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
  routeRules: {
    '/api/**': {
      robots: false,
      security: {
        rateLimiter: {
          tokensPerInterval: 50,
          interval: 60000,
        },
      },
    },
    '/__nuxt_content/**': {
      csurf: false,
      robots: false,
      security: {
        rateLimiter: {
          tokensPerInterval: 500,
          interval: 10000,
        },
      },
    },
    '/__nuxt_hints/**': {
      csurf: false,
      robots: false,
      security: {
        requestSizeLimiter: false,
        rateLimiter: false,
      },
    },
  },
  future: {
    compatibilityVersion: 5,
  },
  experimental: {
    typedPages: true,
    sharedPrerenderData: true,
  },
  compatibilityDate: '2026-03-21',
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'motion-v',
        'dayjs/locale/de', // CJS
        'dayjs/locale/en', // CJS
        'dayjs/locale/fr', // CJS
        'dayjs/locale/it', // CJS
        'dayjs', // CJS
        'dayjs/plugin/relativeTime', // CJS
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'minimark/hast',
      ],
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
    // Customize app/server TypeScript config
    tsConfig: {
      compilerOptions: {
        strict: true,
        types: ['@types/musickit-js'],
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
  hints: {
    features: {
      hydration: false,
      lazyLoad: {
        logs: false,
        devtools: true,
      },
      webVitals: true,
      // @nuxt/hints pipes every SSR HTML response through `prettier.format`
      // before handing it to html-validate. Prettier's HTML parser cannot
      // handle the SVG → HTML namespace switch inside `<foreignObject>`
      // (used by the About-section portrait to get real `srcset` density
      // picking), and throws `Unexpected closing tag ":svg:foreignObject"`
      // on every render. Re-enable once @nuxt/hints wraps that call in
      // try/catch or stops formatting before validation.
      htmlValidate: false,
      thirdPartyScripts: {
        options: {
          ignoredDomains: ['va.vercel-scripts.com'],
        },
      },
    },
  },
  i18n: {
    baseUrl: process.env.NUXT_SITE_URL,
    trailingSlash: true,
    strategy: 'prefix_except_default',
    defaultLocale: 'de',
    // v10 experimental features that pair well with our setup:
    // - strictSeo: lets @nuxtjs/i18n manage hreflang/canonical/og:locale internally
    //   and aligns them with @nuxtjs/seo. We don't use useLocaleHead() anywhere,
    //   so this is safe.
    // - compactRoutes: collapses per-locale routes into a single :locale(en|fr|it)
    //   regex route. Compatible with prefix_except_default; reduces the route table.
    // https://nuxt.com/modules/i18n#new-features
    experimental: {
      strictSeo: true,
      compactRoutes: true,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
      cookieDomain: process.env.NUXT_PUBLIC_APP_DOMAIN,
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
    quality: 80,
    format: ['avif', 'webp'],
    screens: {
      '2xs': 320,
      'xs': 475,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
    densities: [1, 2],
    presets: {
      portrait: {
        modifiers: {
          width: 411,
          height: 411,
        },
      },
      // Open-Graph default aspect (1200×630, 1.91:1). The preset locks the
      // intrinsic ratio so the browser reserves space before the image loads
      // (no CLS). `fit` lives on the component because the Vercel provider's
      // type omits it from preset modifiers.
      cover: {
        modifiers: {
          width: 1200,
          height: 630,
        },
      },
    },
  },
  ogImage: {
    security: {
      // Strict mode requires a signing secret, disables the runtime `html`
      // template (SSRF guard), caps query string size, and restricts runtime
      // image generation to our own host. Prerendered images are unaffected.
      // Gated on the secret so `bun run typecheck` (which doesn't load
      // secrets through Varlock) doesn't crash at module init.
      secret: process.env.NUXT_OG_IMAGE_SECRET,
      strict: Boolean(process.env.NUXT_OG_IMAGE_SECRET),
    },
  },
  schemaOrg: {
    identity: definePerson({
      name: 'Jonathan Elias Russ',
      givenName: 'Jonathan',
      familyName: 'Russ',
      additionalName: 'Elias',

      image: `${process.env.NUXT_SITE_URL}/img/portrait.webp`,
      description: process.env.NUXT_PUBLIC_APP_DESCRIPTION,
      jobTitle: 'Software Engineer',

      email: 'contact@jonathan-russ.com',
      url: process.env.NUXT_SITE_URL,
      logo: process.env.NUXT_PUBLIC_APP_LOGO,
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
        trigger: 'onNuxtReady',
      },
    },
  },
  security: {
    strict: true,
    csrf: true,
    sri: true,
    ssg: {
      hashStyles: false,
    },
    headers: {
      crossOriginResourcePolicy: 'same-origin',
      crossOriginOpenerPolicy: 'same-origin',
      crossOriginEmbedderPolicy: 'credentialless',
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true,
      },
      xFrameOptions: 'DENY',
      contentSecurityPolicy: {
        'base-uri': ['\'none\''],
        'default-src': ['\'none\''],
        'connect-src': [
          '\'self\'',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://*.googletagmanager.com',
          'https://*.g.doubleclick.net',
          'https://*.google.com',
          'https://cognito-identity.us-west-2.amazonaws.com',
          'https://user-events-v3.s3-accelerate.amazonaws.com',
          'https://browser.sentry-cdn.com',
          'https://*.sentry.io',
          'https://*.apple.com',
          'https://vitals.vercel-insights.com',
          'https://va.vercel-scripts.com',
        ],
        'font-src': ['\'self\''],
        'form-action': ['\'self\''],
        'frame-ancestors': ['\'self\''],
        'frame-src': ['\'self\'', 'https://snippet.meticulous.ai'],
        'img-src': [
          '\'self\'',
          'data:',
          'blob:',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://*.googletagmanager.com',
          'https://*.g.doubleclick.net',
          'https://*.google.com',
          'https://*.apple.com',
          // Apple Music artwork (MusicKit catalog responses)
          'https://*.mzstatic.com',
        ],
        'manifest-src': ['\'self\''],
        'media-src': ['\'self\''],
        'object-src': ['\'none\''],
        // 'self' is retained as a Level 1/2 fallback: 'strict-dynamic'
        // supersedes it in CSP Level 3 browsers, but older browsers ignore
        // 'strict-dynamic' and would otherwise refuse to load lazy chunks.
        // https://nuxt-security.vercel.app/advanced/strict-csp#strict-dynamic-csp-level-3
        'script-src': [
          '\'self\'',
          '\'strict-dynamic\'',
          '\'nonce-{{nonce}}\'',
          '\'wasm-unsafe-eval\'',
        ],
        'script-src-attr': ['\'none\''],
        // Per nuxt-security maintainers: 'strict-dynamic' does not apply to
        // style-src and runtime-injected styles (motion-v, lazy hydration)
        // cannot carry per-request nonces.
        // https://nuxt-security.vercel.app/advanced/strict-csp#important-details
        'style-src': ['\'self\'', '\'unsafe-inline\''],
        'worker-src': ['\'self\''],
        'upgrade-insecure-requests': true,
      },
      permissionsPolicy: {
        'accelerometer': [],
        'autoplay': [],
        'camera': [],
        'display-capture': [],
        'encrypted-media': [],
        'fullscreen': [],
        'geolocation': [],
        'gyroscope': [],
        'magnetometer': [],
        'microphone': [],
        'midi': [],
        'payment': [],
        'picture-in-picture': [],
        'publickey-credentials-get': [],
        'screen-wake-lock': [],
        'sync-xhr': [],
        'usb': [],
        'web-share': [],
        'xr-spatial-tracking': [],
      },
    },
  },
  seo: {
    meta: {
      twitterCreator: '@JonathanXD12_',
      twitterSite: '@JonathanXD12_',
      author: 'Jonathan Russ',
      colorScheme: 'dark light',
    },
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
