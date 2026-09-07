import { fileURLToPath } from 'node:url'
import { icons as sfSymbols } from '@jonathanxdr/iconify-json-sf-symbols'
import tailwindcss from '@tailwindcss/vite'

// Vercel builds run plain `nuxt build` without the Varlock wrapper, so the
// dotenv schema is never enforced there. A missing value below silently
// prerenders wrong URLs or empty titles instead of degrading. Credential
// secrets are excluded: `requireCredential` degrades their endpoints to 404.
if (process.env.VERCEL) {
  const missing = [
    'NUXT_SITE_URL',
    'NUXT_SITE_NAME',
    'NUXT_PUBLIC_GITHUB_REPO_NAME',
    'NUXT_PUBLIC_GITHUB_REPO_OWNER',
  ].filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing build-critical environment variable(s) on this Vercel build: ${missing.join(', ')}. `
      + 'These are normally delivered by the Infisical Vercel Secret Sync. '
      + 'Check the sync configuration for this environment.',
    )
  }
}

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    // Pinned to a fork of upstream 3.x that adds i18n-key support:
    // collections marked `i18n: true` accept nested `i18n.<locale>:` YAML
    // keys instead of per-locale files. The fork branch commits its built
    // `dist/`, so repointing the package.json URL without pushing a matching
    // build silently stops translations from resolving.
    '@nuxt/content',
    '@nuxt/scripts',
    // `recordingToken` is a public client-side token, loaded in dev only
    [
      '@alwaysmeticulous/recorder-plugin/nuxt',
      {
        recordingToken: '3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w',
        // `@nuxt/hints` flags third-party scripts without `crossorigin`.
        // Anonymous mode reports cross-origin errors without credentials.
        attributes: { crossorigin: 'anonymous' },
      },
    ],
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
    'nuxt-skew-protection',
    'nuxt-ai-ready',
  ],
  $development: {
    app: {
      head: {
        link: [
          // `key` lets the layout's dev favicon replace this after
          // hydration instead of stacking a second `rel="icon"` next to it.
          {
            key: 'favicon',
            rel: 'icon',
            type: 'image/svg+xml',
            href: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20100%20100%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2220%22%20fill%3D%22%23f56300%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23ffffff%22%0A%20%20%20%20%20%20%20%20d%3D%22M26.30%2069.58Q21.90%2069.58%2018.71%2068.09Q15.52%2066.61%2013.76%2063.80L13.76%2063.80L19.64%2058.20Q22.17%2062.27%2026.41%2062.27L26.41%2062.27Q31.58%2062.27%2032.79%2056.27L32.79%2056.27L36.47%2037.57L23.00%2037.57L24.43%2030.42L46.76%2030.42L41.64%2055.83Q40.21%2063.20%2036.47%2066.39Q32.73%2069.58%2026.30%2069.58L26.30%2069.58ZM86.25%2042.36Q86.25%2047.75%2083.33%2051.59Q80.41%2055.45%2075.25%2057.04L75.25%2057.04L81.95%2068.92L72.55%2068.92L66.50%2058.14L58.91%2058.14L56.77%2068.92L47.80%2068.92L55.50%2030.42L71.17%2030.42Q78.32%2030.42%2082.28%2033.55Q86.25%2036.69%2086.25%2042.36L86.25%2042.36ZM67.88%2051.05Q72.33%2051.05%2074.78%2049.01Q77.22%2046.98%2077.22%2043.18L77.22%2043.18Q77.22%2040.43%2075.35%2039.06Q73.48%2037.68%2070.02%2037.68L70.02%2037.68L62.98%2037.68L60.28%2051.05L67.88%2051.05Z%22%3E%0A%20%20%20%20%3C%2Fpath%3E%0A%3C%2Fsvg%3E',
          },
          // Same-origin so it loads against `img-src 'self'`
          {
            key: 'touch-icon',
            rel: 'apple-touch-icon',
            href: '/img/dev/favicon-dev-orange.png',
          },
        ],
      },
    },
    // Default for `nuxt dev` runs that bypass Varlock, so the dev badge and
    // favicon logic do not silently disable themselves.
    runtimeConfig: {
      public: {
        appEnvironment: 'development',
      },
    },
    // Safari on localhost and LAN-IP phone testing over plain http silently
    // drop a Secure cookie, breaking locale persistence.
    i18n: {
      detectBrowserLanguage: {
        cookieSecure: false,
      },
    },
    security: {
      headers: {
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
            key: 'favicon',
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/img/favicon.svg',
          },
          {
            key: 'touch-icon',
            rel: 'apple-touch-icon',
            href: '/img/favicon.png',
          },
        ],
      },
    },
  },
  ssr: true,
  // Nuxt auto-imports only the top level of `shared/types/`. `~~` is rootDir,
  // where `shared/` lives, not the `app/` srcDir a bare entry assumes.
  // https://nuxt.com/docs/4.x/directory-structure/shared#how-files-are-scanned
  imports: {
    dirs: [
      '~~/shared/types/components',
      '~~/shared/types/services/github',
      '~~/shared/types/services/flick',
    ],
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  app: {
    head: {
      // Not under `seo.meta`: nuxt-seo-utils runs `unpackMeta()` over that,
      // which only handles `<meta>` tags and silently drops `titleTemplate`.
      titleTemplate: 'JR %separator %s',
      link: [{ rel: 'manifest', href: '/site.webmanifest' }],
    },
  },
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  // `site.name` and `site.url` are deliberately unset: nuxt-site-config reads
  // NUXT_SITE_NAME and NUXT_SITE_URL at runtime, so env changes take effect on
  // redeploy without baked-in build values. `defaultLocale` is a fallback so
  // og:locale and inLanguage cannot empty out if i18n init order changes.
  site: {
    trailingSlash: true,
    defaultLocale: 'de-DE',
  },
  colorMode: {
    classSuffix: '',
  },
  // The error page cannot be prerendered (404s hit arbitrary URLs), so it is
  // the only route whose `@nuxt/content` queries run inside the Vercel
  // Lambda, where the default better-sqlite3 addon fails to load and
  // `./contents.sqlite` is read-only. The 'native' connector uses Node 24's
  // built-in `node:sqlite`, and /tmp is the only writable directory.
  // https://content.nuxt.com/docs/deploy/serverless
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
    database: {
      type: 'sqlite',
      filename: '/tmp/contents.sqlite',
    },
  },
  runtimeConfig: {
    public: {
      // TODO: enable these once the build emits NUXT_PUBLIC_APP_VERSION and
      //       NUXT_PUBLIC_APP_BUILD. `scripts/check-build.sh` derives both
      //       but exports them into its own subshell.
      // appName: '',
      // appBuild: '',
      // appVersion: '',
      // appIcon: '',
      // Every consumer checks `=== 'development'`, so a missing
      // NUXT_PUBLIC_APP_ENVIRONMENT renders as production, not an empty
      // string.
      appEnvironment: 'production',
      githubRepoName: '',
      githubRepoOwner: '',
    },
    githubToken: '',
    appleDeveloperPrivateKey: '',
    appleDeveloperKeyId: '',
    appleDeveloperTeamId: '',
    appleMusicUserToken: '',
    flickApiKey: '',
  },
  // `app/assets/img/**` holds source images kept for editing but never
  // imported. Patterns are rootDir-relative, so they must spell out
  // `app/...`: a `~`-prefixed pattern silently matches nothing.
  ignore: ['app/assets/drafts/**', 'app/assets/img/**'],
  // No `'/': { robots: false }` here: `@nuxtjs/robots` strips the locale
  // prefix before matching route rules, so the rule would bake
  // `noindex, nofollow` into every locale home page. `sitemap.exclude`
  // handles the root instead.
  routeRules: {
    '/api/**': {
      // No `robots: false`: `@nuxtjs/robots` warns on `/api` disallows, and
      // listing them only advertises them, so the plain header below carries
      // the noindex signal instead.
      headers: {
        'X-Robots-Tag': 'noindex',
      },
      // The in-memory driver makes this per warm instance on Vercel, so it
      // is best-effort. Vercel WAF is the real production backstop.
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
    // nuxt-security clobbers `csurf` and `robots` on this entry. The
    // `nitro:config` hook below re-applies them.
    '/__nuxt_hints/**': {
      csurf: false,
      robots: false,
      security: {
        requestSizeLimiter: false,
        rateLimiter: false,
      },
    },
    // nuxt-security's CSRF middleware 403s every POST without an
    // `x-csrf-token`, silently dropping the GA4 collect beacons
    // `@nuxt/scripts` proxies under `/_scripts/p/**`. Exempting the prefix is
    // safe: those payloads carry only `cid`/`sid` tokens the GA4 client
    // authenticates itself, and `/_scripts/assets/**` is GET-only.
    '/_scripts/**': {
      csurf: false,
      robots: false,
    },

    // `/__skew/health` is registered on every non-static build regardless of
    // `updateStrategy`, so pre-declaring the exemption covers a later switch
    // to `'sse'` or `'ws'`.
    '/__skew/**': {
      csurf: false,
      robots: false,
    },
    '/__ai-ready/**': {
      csurf: false,
      robots: false,
      security: {
        rateLimiter: false,
      },
    },
  },
  future: {
    compatibilityVersion: 5,
  },
  experimental: {
    typedPages: true,
    // By default `@nuxt/kit` logs NUXT_B8013 and skips an incompatible
    // module's setup, so the build stays green while quietly losing that
    // module's output. That is the failure mode for the SEO stack: nothing
    // surfaces the loss, because the app never consumes its auto-imports.
    enforceModuleCompatibility: true,
    // Editor-only: registers no build plugin unless `namedLayoutSlots` is
    // enabled, and `vue-tsc` ignores `compilerOptions.plugins`, so
    // `typescript.typeCheck` is unaffected.
    typescriptPlugin: true,
  },
  compatibilityDate: '2026-03-21',
  nitro: {
    // Nitro never scans `shared/types`, and its unimport does not resolve
    // the `~~` alias, hence the absolute paths.
    imports: {
      dirs: [
        fileURLToPath(
          new URL('./shared/types/services/github', import.meta.url),
        ),
        fileURLToPath(
          new URL('./shared/types/services/flick', import.meta.url),
        ),
      ],
    },
    // The four locale roots feed link-checker's build-time scan and the
    // `zeroRuntime` og-image and sitemap assets. Trailing slashes match
    // `site.trailingSlash`. Without them the prerenderer follows an internal
    // 301 and double-writes the output. `/` is listed explicitly because
    // under `strategy: 'prefix'` no in-page link points back to the
    // unprefixed root for `crawlLinks` to find.
    prerender: {
      crawlLinks: true,
      routes: ['/', '/de/', '/en/', '/fr/', '/it/'],
      // Nitro's default `false` skips a route that answers non-200, and a
      // skipped route falls through to the SSR function, which 500s because
      // it cannot load `@nuxt/content`'s native SQLite binding in the Lambda.
      // Internal `$fetch` calls made while rendering (the GitHub endpoints)
      // never become prerender routes, so an outage there still degrades
      // through `useFetch`'s error state.
      failOnError: true,
      // `@nuxt/image`'s vercel provider emits `/_vercel/image?...` URLs that
      // `crawlLinks` follows. The endpoint exists only at runtime, so the
      // build-time crawl 404s and, with `failOnError`, aborts the prerender.
      ignore: [/^\/_vercel\b/],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@unhead/schema-org/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'dayjs', // CJS
        'minimark/hast',
        'motion-v',
      ],
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: {
      compilerOptions: {
        strict: true,
        types: ['@types/musickit-js'],
      },
    },
    nodeTsConfig: {
      compilerOptions: {
        strict: true,
      },
    },
  },
  // nuxt-security 2.6.0 assigns rather than merges
  // `routeRules['/__nuxt_hints/**']` in its setup, deleting the `csurf` and
  // `robots` entries declared above. `nitro:config` fires after every
  // module's setup, so re-merging here restores them. Without `csurf: false`
  // nuxt-csurf 403s the `@nuxt/hints` POSTs with "CSRF Token Mismatch".
  // TODO: drop this hook once nuxt-security merges its auto-hints route rule.
  //       https://github.com/Baroshem/nuxt-security/issues/732
  hooks: {
    'nitro:config'(nitroConfig) {
      nitroConfig.routeRules ??= {}
      nitroConfig.routeRules['/__nuxt_hints/**'] = {
        ...nitroConfig.routeRules['/__nuxt_hints/**'],
        csurf: false,
        robots: false,
      }
    },
    // Nitro's Vercel preset writes Build Output `overrides` whose `path`
    // keeps the route's trailing slash (`de/index.html` -> `{ path: 'de/' }`).
    // Vercel does not serve the prerendered file from such a path, so `/de/`
    // falls through to the SSR function, which then 500s in the Lambda.
    // TODO(nitro-vercel-trailing-slash-override): remove this hook and bump
    //   nitropack once the upstream fix ships. Still reproducible on 2.13.4,
    //   and https://github.com/nitrojs/nitro/pull/4412 takes a different
    //   approach, so re-verify the deployed behavior before removing this.
    //   https://github.com/nitrojs/nitro/issues/4392
    'nitro:init'(nitro) {
      nitro.hooks.hook('close', async () => {
        const { existsSync, readFileSync, writeFileSync }
          = await import('node:fs')
        const cfgPath = `${process.cwd()}/.vercel/output/config.json`
        if (!existsSync(cfgPath)) {
          return
        }
        const cfg = JSON.parse(readFileSync(cfgPath, 'utf8')) as {
          overrides?: Record<string, { path?: string }>
        }
        if (!cfg.overrides) {
          return
        }
        const kept = Object.entries(cfg.overrides).filter(
          ([, value]) => !value?.path?.endsWith('/'),
        )
        const stripped = Object.keys(cfg.overrides).length - kept.length
        if (stripped > 0) {
          cfg.overrides = Object.fromEntries(kept)
          writeFileSync(cfgPath, JSON.stringify(cfg))
          console.log(
            `[nitro-vercel-trailing-slash-override] stripped ${stripped} trailing-slash override(s) so Vercel serves prerendered HTML statically`,
          )
        }
      })
    },
  },
  // Tradeoff: `contentSignal` maps only `aiTrain` onto the IETF
  // `Content-Usage` line, losing granular keys like `search=y, ai-output=y`.
  //
  // Every route is prerendered, so `runtimeSync`, `cron`, and `database` stay
  // unset, which keeps the module's SQLite driver out of the Nitro bundle.
  // Prerender indexing still writes llms.txt and the `.md` twins.
  // https://nuxtseo.com/ai-ready
  aiReady: {
    contentSignal: {
      aiTrain: false,
      search: true,
      aiInput: true,
    },
    // Every collection in `content.config.ts` is `type: 'data'`, so the
    // content lookup can never match a route. Restore the default if a
    // `type: 'page'` collection is added.
    contentSource: false,
    llmsTxt: {
      markdownLinks: true,
    },
    // Despite the name this bites at build time: the prerenderer renders the
    // same `defineCachedFunction`-wrapped handler, so the 600 second default
    // makes two builds inside that window ship the earlier build's llms.txt.
    llmsTxtCacheSeconds: 0,
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
      // Adds a source transform over every component in dev, for a hydration
      // diff viewer this project does not use.
      hydration: false,
      // Needs `@nuxt/hints` >= 1.1.4, which fixed the dev-console 404 this
      // was once disabled for.
      // https://github.com/nuxt/hints/issues/359
      lazyLoad: true,
      webVitals: true,
      // `@nuxt/hints` pipes every SSR response through `prettier.format`
      // before html-validate with no try/catch, and Prettier's HTML parser
      // throws on the SVG -> HTML namespace switch inside `<foreignObject>`
      // (the About-section portrait), which Nitro surfaces as an HTTP 500.
      // Still reproducible on the installed 1.1.4.
      // TODO: re-enable once a release above 1.1.4 ships
      //       https://github.com/nuxt/hints/pull/377, which only wraps the
      //       call in try/catch, so the About page still gets no
      //       html-validate coverage.
      htmlValidate: false,
      thirdPartyScripts: {
        options: {
          ignoredDomains: ['va.vercel-scripts.com'],
        },
      },
    },
  },
  i18n: {
    // `strictSeo` throws without `baseUrl`, and nuxt-site-config's runtime
    // propagation is best-effort. Every route is prerendered, so NUXT_SITE_URL
    // must hold the final origin at build time: no runtime override can change
    // a baked hreflang tag.
    baseUrl: process.env.NUXT_SITE_URL,
    trailingSlash: true,
    // `prefix`, not `prefix_except_default`: otherwise detectBrowserLanguage
    // 302s non-German visitors away from `/` and Googlebot can never index it
    // as German.
    strategy: 'prefix',
    defaultLocale: 'de',
    // `strictSeo` hands hreflang, canonical, og:locale, and og:url to i18n
    // instead of seo-utils, and requires the `baseUrl` above.
    experimental: {
      strictSeo: true,
      compactRoutes: true,
    },
    // `redirectOn: 'root'` keeps detection on `/` only, so crawlers reach
    // localized routes without 302 chains. The v10 migration guide suggests
    // `'all'` for `strategy: 'prefix'`, which we deliberately reject:
    // unprefixed sub-paths like `/projects/` 404 by design.
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieSecure: true,
      // Must equal `defaultLocale`: the prerendered `/index.html` fires
      // without an Accept-Language header, and `hreflang="x-default"` already
      // points at `/de/`.
      fallbackLocale: 'de',
      redirectOn: 'root',
    },
    locales: [
      {
        code: 'de',
        language: 'de-DE',
        name: 'Deutsch',
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
      },
      {
        code: 'fr',
        language: 'fr-FR',
        name: 'Français',
      },
      {
        code: 'it',
        language: 'it-IT',
        name: 'Italiano',
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
      // Passing the parsed collection keeps 6984 SVG files out of this
      // repository and avoids the per-build directory scan that pushed the
      // prerender bundle past Node's default heap limit.
      sfSymbols,
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
    // Only orders `<source>` elements. The Vercel resizer ignores it and
    // negotiates from the request's `Accept` header, so `vercel.formats`
    // repeats the preference.
    format: ['avif', 'webp'],
    vercel: {
      formats: ['image/avif', 'image/webp'],
      // Remote sources only, so inert until `image.domains` gains one. The
      // provider default of 300 bills a fresh transformation every 5 minutes
      // per remote image.
      // https://vercel.com/docs/image-optimization#remote-image-cache-expiration
      minimumCacheTTL: 60 * 60 * 24 * 28,
    },
    // The Vercel provider only resizes to widths listed here, rounding up to
    // the next entry, and `densities: [1, 2]` needs a 2x variant of each. The
    // `portrait-*` entries cover `sizes="275px md:300px xl:350px"` in
    // `app/components/Section/About.global.vue`.
    // https://image.nuxt.com/providers/vercel#sizes
    screens: {
      'portrait-1x-base': 275,
      'portrait-1x-md': 300,
      '2xs': 320,
      'portrait-1x-xl': 350,
      'xs': 475,
      'portrait-2x-base': 550,
      'portrait-2x-md': 600,
      'sm': 640,
      'portrait-2x-xl': 700,
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
      // Open Graph aspect (1200×630). These only seed the srcset aspect ratio
      // and the upper-bound width the Vercel resizer rounds up to. CLS is
      // prevented by the explicit `height` on `.card-cover` in CSS.
      cover: {
        modifiers: {
          width: 1200,
          height: 630,
        },
      },
    },
  },
  linkChecker: {
    showLiveInspections: true,
    // Inert for now: with `report.publish` unset the reports land in
    // `.output/`, which Vercel discards.
    report: {
      markdown: true,
      json: true,
      html: true,
    },
    excludeLinks: [
      // Remote URLs are never fetched (`fetchRemoteUrls` defaults to `false`),
      // so these only suppress local checks such as link text.
      /^https?:\/\/(www\.)?(x|twitter)\.com\//,
      /^https?:\/\/(www\.)?linkedin\.com\//,
      /^https?:\/\/(www\.)?instagram\.com\//,
      /^https?:\/\/(www\.)?threads\.net\//,
      /^https?:\/\/(www\.)?reddit\.com\//,
      '/__nuxt_hints/**',
      '/__link-checker__/**',
    ],
    // `strictNuxtContentPaths` is absent: nuxt-link-checker v5 defines it as a
    // default but never reads it.
  },
  ogImage: {
    // Cuts the Nitro bundle ~81% (1.6 MB -> 306 KB). Safe because all 16 OG
    // images (4 routes × 4 locales) are static.
    zeroRuntime: true,
    buildCache: true,
    defaults: {
      // The module default of 1200×600 is cropped to 1.91:1 by Facebook and
      // LinkedIn.
      width: 1200,
      height: 630,
    },
    // No `security` block: with `zeroRuntime` there is no runtime endpoint to
    // protect, and enabling it flips the emitted og:image URLs from the
    // prerendered `/_og/s/...` assets to runtime `/_og/d/...` URLs that 404 in
    // production.
  },
  // No `schemaOrg` block: crawlers only read the SSR JSON-LD, and forcing
  // `reactive` in production would ship the resolver to every client. Person
  // identity is registered in `app/app.vue` instead, because defining it here
  // would bake `process.env.NUXT_SITE_URL` at build time (silently empty on
  // Vercel preview deploys) and miss the per-locale description.
  // https://nuxtseo.com/docs/schema-org/guides/setup-identity
  scripts: {
    defaultScriptOptions: {
      bundle: true,
    },
    // Ungated, `@nuxt/scripts` preloads `gtag/js?id` with an empty ID and
    // loads a broken script wherever
    // NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID is unset.
    ...(process.env.NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID
      ? {
          registry: {
            googleAnalytics: {
              trigger: 'onNuxtReady',
            },
          },
        }
      : {}),
  },
  security: {
    // The options below declare deviations from the strict defaults, but the
    // CSP and permissions-policy blocks re-declare every directive:
    // nuxt-security merges arrays with `defuReplaceArray`, so a user value
    // replaces that directive's default array entirely.
    // https://nuxt-security.vercel.app/getting-started/configuration
    strict: true,
    csrf: true,
    // The base default strips `console.*` in development too
    removeLoggers: process.env.NODE_ENV === 'production',
    contentSecurityPolicyReportOnly: process.env.VERCEL_ENV === 'preview',
    ssg: {
      // Pointless while `style-src` below needs 'unsafe-inline'
      hashStyles: false,
    },
    headers: {
      // `require-corp` breaks Apple MusicKit, the Meticulous iframe, and the
      // Google Analytics beacons, none of which carry CORP headers.
      crossOriginEmbedderPolicy: 'credentialless',
      // Loosened from the `'no-referrer'` default so Vercel Analytics and GA4
      // can attribute referers.
      referrerPolicy: 'strict-origin-when-cross-origin',
      contentSecurityPolicy: {
        'base-uri': ['\'none\''],
        // 'self' rather than 'none': the spec removed `prefetch-src`, so the
        // prefetch and preload hints Nuxt emits for lazy route chunks fall
        // under `default-src`. Every real sink stays locked by its own
        // directive below.
        // https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/prefetch-src
        'default-src': ['\'self\''],
        'connect-src': [
          '\'self\'',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://*.googletagmanager.com',
          'https://*.g.doubleclick.net',
          'https://*.google.com',
          // Called by Meticulous's recorder, never from app code: Cognito
          // issues session credentials, S3 takes the user-event uploads,
          // Sentry receives the telemetry. Removing any one breaks the
          // recorder during bootstrap.
          // https://app.meticulous.ai/docs/session-recording/csp-exceptions
          'https://cognito-identity.us-west-2.amazonaws.com',
          'https://user-events-v3.s3-accelerate.amazonaws.com',
          'https://*.sentry.io',
          // Source-map fetch by the Sentry SDK, hence connect-src. No
          // `script-src` entry needed: 'strict-dynamic' extends trust through
          // the nonce'd snippet that injects it.
          'https://browser.sentry-cdn.com',
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
          // Apple Music artwork
          'https://*.mzstatic.com',
        ],
        'manifest-src': ['\'self\''],
        'media-src': ['\'self\''],
        'object-src': ['\'none\''],
        // 'self' is a Level 1/2 fallback: older browsers ignore
        // 'strict-dynamic' and would refuse the lazy chunks. 'wasm-unsafe-eval'
        // is required by `@nuxt/content`'s sqlite-wasm adapter and keeps full
        // `unsafe-eval` off.
        'script-src': [
          '\'self\'',
          '\'strict-dynamic\'',
          '\'wasm-unsafe-eval\'',
          '\'nonce-{{nonce}}\'',
        ],
        'script-src-attr': ['\'none\''],
        // 'strict-dynamic' does not apply to style-src, and runtime-injected
        // styles (motion-v, lazy hydration) cannot carry per-request nonces.
        // https://nuxt-security.vercel.app/advanced/strict-csp#important-details
        'style-src': ['\'self\'', '\'unsafe-inline\''],
        'worker-src': ['\'self\''],
        'upgrade-insecure-requests': true,
      },
      permissionsPolicy: {
        'accelerometer': [],
        'autoplay': [],
        // Added beyond the strict-mode default to keep analytics out of Topics
        'browsing-topics': [],
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
        // The one directive strict mode does not zero out (`['self']`)
        'sync-xhr': [],
        'usb': [],
        'web-share': [],
        'xr-spatial-tracking': [],
      },
    },
  },

  seo: {
    // Ungated, preview deploys 301 to the canonical `NUXT_SITE_URL` and every
    // navigation bounces off the preview host.
    redirectToCanonicalSiteUrl: process.env.VERCEL_ENV === 'production',
    meta: {
      twitterCreator: '@JonathanXD12_',
      twitterSite: '@JonathanXD12_',
      author: 'Jonathan Russ',
      colorScheme: 'dark light',
      applicationName: 'Jonathan Russ',
      themeColor: [
        { content: '#18181b', media: '(prefers-color-scheme: dark)' },
        { content: '#ffffff', media: '(prefers-color-scheme: light)' },
      ],
    },
  },
  sitemap: {
    // A per-locale index would be overkill: multi-sitemaps target 10k+ URLs
    sitemaps: false,
    // The unprefixed root is a meta-refresh redirect page. Must stay a RegExp:
    // under i18n strategy 'prefix' a string '/' expands per locale and would
    // drop every locale home page too.
    exclude: [/^\/$/],
    // Shaves around 50 KB (5 KB gzip) off the Nitro bundle. Safe because every
    // URL is prerendered and there are no dynamic sitemap sources.
    zeroRuntime: true,
    // `defaults.lastmod` and `autoLastmod` stay unset: both stamp build time,
    // and Google distrusts lastmod values that always equal it. Once per-page
    // edit dates exist, set it via `definePageMeta({ sitemap: { lastmod } })`.
  },
  // Vercel's native Skew Protection is plan-gated, so this module polls
  // `_nuxt/builds/latest.json` and drives the `<SkewNotification>` toast in
  // `app/layouts/default.vue`. All three options are pinned because the
  // provider-aware defaults added in v1.5.0 cover less than they suggest:
  // `bundleAssets` only defaults to `false` when the build can prove native
  // protection is live, otherwise it mirrors previous builds' `_nuxt/` output
  // into the deployment through `node_modules/.cache`. `updateStrategy`
  // resolves to `'sse'`, holding a connection open against a Fluid Compute
  // function. The `'immediate'` and `'idle'` reload strategies call
  // `reloadNuxtApp({ force: true })` out from under the user.
  //
  // Known limitation: the prompt never fires on this fully prerendered site.
  // `<SkewNotification>` early-returns on `payload.prerenderedAt`, and the
  // chunks-outdated trigger compares against a module list held in an
  // in-memory `Set` in the service worker, gone once the browser evicts it
  // (~30s), while the version manifest lives under `node_modules/.cache`,
  // which Vercel restores only on a build-cache hit. Restoring the prompt
  // needs a durable storage driver and upstream fixes, not
  // `bundleAssets: true`. The alternative is dropping the module for
  // `experimental.emitRouteChunkError: 'automatic'`.
  // https://nuxtseo.com/skew-protection
  skewProtection: {
    updateStrategy: 'polling',
    reloadStrategy: 'prompt',
    bundleAssets: false,
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

    // `breakpoints` replaces the module's built-in set rather than extending
    // it, so a future change to the module's own fallback could point SSR at a
    // name this config does not define.
    fallbackBreakpoint: 'desktop',
  },
})
