import routerOptions from "./router.options";

export default defineNuxtConfig({
  modules: [
    "@nuxt/scripts",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-security",
  ],

  css: ["~/assets/css/main.css"],

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
    },
    families: [
      {
        name: "system-ui",
        provider: "none",
        fallbacks: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    ],
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  typescript: {
    typeCheck: true,
    strict: true,
  },

  eslint: {
    config: {
      // stylistic: true,
      typescript: {
        strict: true,
      },
    },
  },

  ssr: true,

  compatibilityDate: "2024-07-03",

  future: {
    compatibilityVersion: 4,
  },

  schemaOrg: {
    identity: {
      type: "Person",
      name: process.env.SITE_NAME || "Jonathan Russ",
      url: process.env.SITE_URL,
      logo: process.env.SITE_LOGO,
    },
  },

  app: {
    seoMeta: {
      description: process.env.SITE_DESCRIPTION,
      ogImage: process.env.SITE_LOGO,
      ogSiteName: process.env.SITE_NAME,
    },
    head: {
      templateParams: {
        site: {
          name: process.env.SITE_NAME,
          url: process.env.SITE_URL,
          description: process.env.SITE_DESCRIPTION,
        },
      },
      link: [{ rel: "apple-touch-icon", href: process.env.SITE_LOGO }],
      meta: [
        { name: "title", content: process.env.SITE_NAME },
        {
          name: "description",
          content: process.env.SITE_DESCRIPTION,
        },
        { property: "og:image", content: process.env.SITE_LOGO },
        { property: "og:title", content: process.env.SITE_NAME },
        {
          property: "og:description",
          content: process.env.SITE_DESCRIPTION,
        },
        { property: "og:url", content: process.env.SITE_URL },
        {
          property: "twitter:image",
          content: process.env.SITE_LOGO,
        },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:title", content: process.env.SITE_NAME },
        {
          property: "twitter:description",
          content: process.env.SITE_DESCRIPTION,
        },
      ],
    },
  },

  $development: {
    security: {
      headers: {
        crossOriginEmbedderPolicy: "unsafe-none",
        contentSecurityPolicy: {
          "upgrade-insecure-requests": false,
        },
      },
    },

    app: {
      head: {
        link: [
          {
            rel: "icon",
            type: "image/svg+xml",
            href: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20100%20100%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2220%22%20fill%3D%22%23f56300%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23ffffff%22%0A%20%20%20%20%20%20%20%20d%3D%22M26.30%2069.58Q21.90%2069.58%2018.71%2068.09Q15.52%2066.61%2013.76%2063.80L13.76%2063.80L19.64%2058.20Q22.17%2062.27%2026.41%2062.27L26.41%2062.27Q31.58%2062.27%2032.79%2056.27L32.79%2056.27L36.47%2037.57L23.00%2037.57L24.43%2030.42L46.76%2030.42L41.64%2055.83Q40.21%2063.20%2036.47%2066.39Q32.73%2069.58%2026.30%2069.58L26.30%2069.58ZM86.25%2042.36Q86.25%2047.75%2083.33%2051.59Q80.41%2055.45%2075.25%2057.04L75.25%2057.04L81.95%2068.92L72.55%2068.92L66.50%2058.14L58.91%2058.14L56.77%2068.92L47.80%2068.92L55.50%2030.42L71.17%2030.42Q78.32%2030.42%2082.28%2033.55Q86.25%2036.69%2086.25%2042.36L86.25%2042.36ZM67.88%2051.05Q72.33%2051.05%2074.78%2049.01Q77.22%2046.98%2077.22%2043.18L77.22%2043.18Q77.22%2040.43%2075.35%2039.06Q73.48%2037.68%2070.02%2037.68L70.02%2037.68L62.98%2037.68L60.28%2051.05L67.88%2051.05Z%22%3E%0A%20%20%20%20%3C%2Fpath%3E%0A%3C%2Fsvg%3E",
          },
        ],
      },
    },

    scripts: {
      globals: {
        meticulousAi: {
          src: "https://snippet.meticulous.ai/v1/meticulous.js",
          ["data-project-id"]: "3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w",
          ["data-is-production-environment"]: false,
        },
      },
    },
  },

  $production: {
    seo: {
      redirectToCanonicalSiteUrl: true,
    },

    security: {
      headers: {
        crossOriginEmbedderPolicy: "require-corp",
        contentSecurityPolicy: {
          "upgrade-insecure-requests": true,
        },
      },
    },

    app: {
      head: {
        link: [
          { rel: "icon", type: "image/svg+xml", href: "/img/favicon.svg" },
        ],
      },
    },

    scripts: {
      globals: {
        meticulousAi: {
          src: "https://snippet.meticulous.ai/v1/meticulous.js",
          ["data-project-id"]: "3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w",
          ["data-is-production-environment"]: true,
        },
      },
    },
  },

  router: {
    options: routerOptions,
  },

  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      appBuild: process.env.APP_BUILD,
      appVersion: process.env.APP_VERSION,
      appIcon: process.env.APP_ICON,
      appEnvironment: process.env.NODE_ENV,

      appleMusicBaseUrl: process.env.APPLE_MUSIC_BASE_URL,
      githubRepoName: process.env.GITHUB_REPO_NAME,
      githubRepoOwner: process.env.GITHUB_REPO_OWNER,

      hypertuneToken: process.env.HYPERTUNE_TOKEN!,
    },

    githubToken: process.env.GITHUB_TOKEN,
    appleDeveloperPrivateKey: process.env.APPLE_DEVELOPER_PRIVATE_KEY,
    appleDeveloperKeyId: process.env.APPLE_DEVELOPER_KEY_ID,
    appleDeveloperTeamId: process.env.APPLE_DEVELOPER_TEAM_ID,
    appleMusicUserToken: process.env.APPLE_MUSIC_USER_TOKEN,
  },

  scripts: {
    defaultScriptOptions: {
      bundle: true,
    },
    registry: {
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID || "",
      },
      googleTagManager: {
        id: process.env.GOOGLE_TAG_MANAGER_ID || "",
      },
    },
    globals: {
      musicKit: {
        src: "https://js-cdn.music.apple.com/musickit/v3/musickit.js",
        async: true,
        "data-web-components": true,
      },
    },
  },

  components: {
    dirs: [
      {
        path: "~/components/containers",
        global: true,
      },
      "~/components/common",
    ],
  },

  colorMode: {
    classSuffix: "",
  },

  site: {
    url: process.env.SITE_URL,
    name: process.env.SITE_NAME,
    description: process.env.SITE_DESCRIPTION,
  },

  security: {
    strict: true,
    csrf: true,
    headers: {
      contentSecurityPolicy: {
        "default-src": ["'self'", process.env.SITE_URL || ""],
        "style-src": ["'self'", "'unsafe-inline'", process.env.SITE_URL || ""],
        "script-src": [
          "'self'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
          "https://*.googletagmanager.com",
          "https://snippet.meticulous.ai",
          "https://browser.sentry-cdn.com",
          "https://*.apple.com",
          process.env.SITE_URL || "",
        ],
        "img-src": [
          "'self'",
          "data:",
          "https://*.google-analytics.com",
          "https://*.analytics.google.com",
          "https://*.googletagmanager.com",
          "https://*.g.doubleclick.net",
          "https://*.google.com",
          "https://*.apple.com",
          process.env.SITE_URL || "",
        ],
        "connect-src": [
          "'self'",
          "https://*.google-analytics.com",
          "https://*.analytics.google.com",
          "https://*.googletagmanager.com",
          "https://*.g.doubleclick.net",
          "https://*.google.com",
          "https://cognito-identity.us-west-2.amazonaws.com",
          "https://user-events-v3.s3-accelerate.amazonaws.com",
          "*.sentry.io",
          "https://edge.hypertune.com",
          "https://gcp.fasthorse.workers.dev",
          "https://*.apple.com",
          process.env.SITE_URL || "",
        ],
      },
    },
  },

  i18n: {
    baseUrl: process.env.SITE_URL,
    vueI18n: "~/i18n.config.ts",
    // lazy: true,
    // langDir: 'lang',
    strategy: "prefix_and_default",
    defaultLocale: "de",
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
      cookieDomain: process.env.SITE_DOMAIN,
      cookieKey: "i18n_redirected",
      cookieSecure: true,
      fallbackLocale: "en",
      redirectOn: "root",
    },
    locales: [
      {
        code: "de",
        language: "de-DE",
        name: "Deutsch",
        // file: 'de.json'
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
        // file: 'en.json'
      },
      {
        code: "fr",
        language: "fr-FR",
        name: "Français",
        // file: 'fr.json'
      },
      {
        code: "it",
        language: "it-IT",
        name: "Italiano",
        // file: 'it.json'
      },
    ],
  },
});
