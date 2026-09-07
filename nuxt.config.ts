import { fileURLToPath } from 'node:url'
import { icons as sfSymbols } from '@jonathanxdr/iconify-json-sf-symbols'
import tailwindcss from '@tailwindcss/vite'

// Fail fast when the Infisical Vercel Secret Sync did not deliver a
// build-critical variable. Vercel builds run plain `nuxt build` without the
// Varlock wrapper, so the dotenv schema is never enforced there. The four
// variables below have no graceful fallback: a missing value silently
// prerenders wrong absolute URLs, empty SSR titles, or malformed GitHub
// requests instead of degrading. Credential secrets (NUXT_GITHUB_TOKEN, the
// Apple keys) are excluded because their endpoints degrade to an inert 404
// via `requireCredential` in `server/utils/credentials.ts`.
// The gate fires only when Vercel exposes its System Environment Variables,
// since VERCEL is itself one of them. Local dev and local builds have none,
// so the guard stays silent there.
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
    // `@nuxt/content` is pinned to a fork of upstream 3.x that adds i18n-key
    // support: collections marked `i18n: true` (see `content.config.ts`)
    // accept nested `i18n.<locale>:` YAML keys instead of per-locale files.
    // The package.json pin points at a fork branch that commits its built
    // `dist/`. Do not repoint that URL or branch without first building and
    // pushing a matching `dist/`, or translations silently stop resolving.
    // A symlinked `node_modules/@nuxt/content` is an opt-in dev override for
    // iterating on the fork, not the install source.
    '@nuxt/content',
    '@nuxt/scripts',
    // Session recorder. Loads in dev builds only by default and is absent
    // from production. `recordingToken` is a public client-side token.
    // https://app.meticulous.ai/docs/how-to/recorder-script?tab=Nuxt
    [
      '@alwaysmeticulous/recorder-plugin/nuxt',
      {
        recordingToken: '3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w',
        // `@nuxt/hints` flags third-party scripts without `crossorigin`. The
        // CDN serves the recorder with CORS, so anonymous mode gives full
        // cross-origin error reporting without sending credentials.
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
          // `key` lets the layout's randomly colored dev favicon replace
          // this static SSR default after hydration instead of stacking a
          // second `rel="icon"` tag next to it (unhead dedupes by key).
          {
            key: 'favicon',
            rel: 'icon',
            type: 'image/svg+xml',
            href: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20100%20100%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2220%22%20fill%3D%22%23f56300%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23ffffff%22%0A%20%20%20%20%20%20%20%20d%3D%22M26.30%2069.58Q21.90%2069.58%2018.71%2068.09Q15.52%2066.61%2013.76%2063.80L13.76%2063.80L19.64%2058.20Q22.17%2062.27%2026.41%2062.27L26.41%2062.27Q31.58%2062.27%2032.79%2056.27L32.79%2056.27L36.47%2037.57L23.00%2037.57L24.43%2030.42L46.76%2030.42L41.64%2055.83Q40.21%2063.20%2036.47%2066.39Q32.73%2069.58%2026.30%2069.58L26.30%2069.58ZM86.25%2042.36Q86.25%2047.75%2083.33%2051.59Q80.41%2055.45%2075.25%2057.04L75.25%2057.04L81.95%2068.92L72.55%2068.92L66.50%2058.14L58.91%2058.14L56.77%2068.92L47.80%2068.92L55.50%2030.42L71.17%2030.42Q78.32%2030.42%2082.28%2033.55Q86.25%2036.69%2086.25%2042.36L86.25%2042.36ZM67.88%2051.05Q72.33%2051.05%2074.78%2049.01Q77.22%2046.98%2077.22%2043.18L77.22%2043.18Q77.22%2040.43%2075.35%2039.06Q73.48%2037.68%2070.02%2037.68L70.02%2037.68L62.98%2037.68L60.28%2051.05L67.88%2051.05Z%22%3E%0A%20%20%20%20%3C%2Fpath%3E%0A%3C%2Fsvg%3E',
          },
          // Same-origin so it loads against `img-src 'self'`. Shares its
          // `key` with the layout variant for the reason above.
          {
            key: 'touch-icon',
            rel: 'apple-touch-icon',
            href: '/img/dev/favicon-dev-orange.png',
          },
        ],
      },
    },
    // Default for `nuxt dev` runs that bypass Varlock, so the dev badge and
    // dev favicon logic do not silently disable themselves.
    runtimeConfig: {
      public: {
        appEnvironment: 'development',
      },
    },
    // Safari on localhost and LAN-IP phone testing over plain http silently
    // drop a Secure cookie, breaking locale persistence in those dev setups.
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
  // Nuxt auto-imports only the top level of `shared/types/`, so the nested
  // dirs below must be listed. `~~` is rootDir, where `shared/` lives, not
  // the `app/` srcDir a bare entry assumes.
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
      // `app.head` is the canonical location and overrides the seo-utils
      // default `'%s %separator %siteName'`. `%separator` resolves without
      // `@nuxtjs/seo` because Nuxt itself registers unhead's
      // TemplateParamsPlugin.
      titleTemplate: 'JR %separator %s',
      // `apple-touch-icon` is per-environment, set in the blocks above.
      link: [{ rel: 'manifest', href: '/site.webmanifest' }],
    },
  },
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  // `site.name` and `site.url` are deliberately unset. nuxt-site-config
  // auto-populates them from NUXT_SITE_NAME and NUXT_SITE_URL at runtime, so
  // env changes take effect on redeploy without baked-in build values.
  // `defaultLocale` is a fallback so og:locale and inLanguage cannot empty
  // out if i18n init order ever changes.
  // https://nuxtseo.com/docs/site-config/guides/how-it-works
  site: {
    trailingSlash: true,
    defaultLocale: 'de-DE',
  },
  colorMode: {
    classSuffix: '',
  },
  // The error page cannot be prerendered (404s hit arbitrary URLs), so it is
  // the only route whose `@nuxt/content` queries run at runtime inside the
  // Vercel Lambda, where the default better-sqlite3 addon fails to load and
  // the default `./contents.sqlite` path is read-only. The 'native' connector
  // uses Node 24's built-in node:sqlite instead, and /tmp is the Lambda's only
  // writable directory.
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
      // TODO: enable these once the app surfaces build metadata.
      //       `scripts/check-build.sh` already derives the version and date
      //       but exports them into its own subshell, so that script or the
      //       Vercel build command has to emit NUXT_PUBLIC_APP_VERSION and
      //       NUXT_PUBLIC_APP_BUILD into the build environment first.
      // appName: '',
      // appBuild: '',
      // appVersion: '',
      // appIcon: '',
      // Every consumer checks `=== 'development'`, so a deploy that never
      // received NUXT_PUBLIC_APP_ENVIRONMENT renders as production rather
      // than an ambiguous empty string.
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
  // `app/assets/img/**` holds source images kept for future editing but never
  // imported, so ignoring them keeps them out of Nuxt's scan. Patterns match
  // the rootDir-relative path, so they must spell out `app/...`: a
  // `~`-prefixed pattern silently matches nothing.
  ignore: ['app/assets/drafts/**', 'app/assets/img/**'],
  // No `'/': { robots: false }` here, even though the unprefixed root is only
  // a meta-refresh interstitial. `@nuxtjs/robots` strips the locale prefix
  // before matching route rules, so the rule would bake `noindex, nofollow`
  // into every locale home page. `sitemap.exclude` handles the root instead.
  routeRules: {
    '/api/**': {
      // No `robots: false`: `@nuxtjs/robots` warns on `/api` disallows, and
      // listing them in robots.txt only advertises them. Neither module sets
      // `X-Robots-Tag` on `/api` paths, so the plain Nitro header below
      // carries the noindex signal.
      headers: {
        'X-Robots-Tag': 'noindex',
      },
      // The in-memory lruCache driver makes this per warm instance on Vercel,
      // resetting on cold starts. Best-effort only. Vercel WAF is the real
      // production backstop.
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
    // `@nuxt/scripts` proxies GA4 collect beacons under `/_scripts/p/**`.
    // nuxt-security's CSRF middleware 403s every POST without an
    // `x-csrf-token`, silently dropping every analytics event. Exempting the
    // prefix is safe: these endpoints take only beacon payloads that the GA4
    // client already authenticates with its own `cid`/`sid` tokens, and the
    // asset sub-route (`/_scripts/assets/**`) is GET-only.
    // https://nuxt-security.vercel.app/middleware/csrf
    // https://scripts.nuxt.com/docs/guides/first-party
    '/_scripts/**': {
      csurf: false,
      robots: false,
    },

    // `/__skew/health` is registered on every non-static build regardless of
    // `updateStrategy`, and pre-declaring the exemption keeps a switch to
    // `'sse'` or `'ws'` one-line here. The module mounts under `/__skew/`,
    // not `/_nuxt-skew/`.
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
    // module's output. That is the failure mode for the SEO stack, whose
    // auto-imports the app does not consume. Modules it does consume
    // (notably `@nuxt/content`) already fail loudly through
    // `typescript.typeCheck`. All 27 declared ranges are satisfied by nuxt
    // 4.5.2 today, so this is inert until a bump breaks one.
    enforceModuleCompatibility: true,
    // Editor-only: go-to-definition into Nitro handlers, plus runtimeConfig and
    // page-meta navigation. Installs nothing (`@dxup/nuxt` ships with nuxt) and
    // registers no build plugin unless `namedLayoutSlots` is enabled. `vue-tsc`
    // ignores `compilerOptions.plugins`, so `typescript.typeCheck` is
    // unaffected. Editor setup lives in `.vscode/settings.json`.
    typescriptPlugin: true,
  },
  compatibilityDate: '2026-03-21',
  nitro: {
    // Nitro never scans `shared/types`, so these need listing even though the
    // app side already covers them. Nitro's unimport does not resolve the
    // `~~` alias, hence the absolute paths.
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
    // Prerendering all four locale roots lets link-checker's build-time scan
    // exercise every page and gives nuxt-og-image and nuxt-sitemap
    // `zeroRuntime` modes static assets to serve.
    // Routes use the canonical trailing-slash form to match
    // `site.trailingSlash`. Without the slash the prerenderer follows an
    // internal 301 and double-writes the output. `/` is listed explicitly
    // because `crawlLinks` cannot discover it: under `strategy: 'prefix'` no
    // in-page link points back to the unprefixed root.
    prerender: {
      crawlLinks: true,
      routes: ['/', '/de/', '/en/', '/fr/', '/it/'],
      // Nitro's default `false` logs and skips a route that answers non-200,
      // shipping a deploy without it. Every page here is prerendered, so a
      // skipped route falls through to the SSR function, which 500s because
      // it cannot load `@nuxt/content`'s native SQLite binding in the Lambda.
      // Scope: only routes the prerenderer visits, which is the 16 pages
      // plus the OG images, sitemap, i18n messages, and `__nuxt_content`
      // dumps. Internal `$fetch` calls made while rendering a page (the
      // GitHub endpoints) never become prerender routes, so a GitHub outage
      // still degrades through `useFetch`'s error state.
      failOnError: true,
      // `crawlLinks` follows the `/_vercel/image?...` URLs `@nuxt/image`'s
      // vercel provider emits. That endpoint exists only at runtime on
      // Vercel's edge, so the build-time crawl 404s and, with `failOnError`,
      // aborts the prerender.
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
  // nuxt-security 2.6.0 sets `routeRules['/__nuxt_hints/**']` by direct
  // assignment (not defu) in its module setup when `@nuxt/hints` is present,
  // deleting the `csurf: false` and `robots: false` declared in `routeRules`
  // above. `nitro:config` fires after every module's setup, so re-merging
  // here restores both: `csurf: false` lets `@nuxt/hints` POSTs reach the dev
  // handler, which nuxt-csurf otherwise 403s with "CSRF Token Mismatch" (of
  // its three POST endpoints only `lazyLoad` is enabled below), and
  // `robots: false` keeps the internal devtool route out of robots.txt.
  // TODO: drop this hook once nuxt-security merges rather than assigns its
  //       auto-hints route rule.
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
    // TODO(nitro-vercel-trailing-slash-override): remove this hook and bump
    //   nitropack once the upstream fix ships.
    //   https://github.com/nitrojs/nitro/issues/4392
    //   https://github.com/nitrojs/nitro/pull/4412
    //   Both are open, and #4412 takes a different approach: it rewrites
    //   `{ path: 'de/' }` to `{ path: 'de' }` rather than dropping the
    //   override, so re-verify the deployed behavior before removing this.
    //   Still reproducible on the installed nitropack 2.13.4.
    //
    // Nitro's Vercel preset writes Build Output `overrides` whose `path`
    // keeps the route's trailing slash (`de/index.html` -> `{ path: 'de/' }`)
    // for our trailing-slash routes. Vercel does not serve the prerendered
    // file from such a path, so `/de/` falls through to the SSR function,
    // which then 500s because it cannot load `@nuxt/content`'s better-sqlite3
    // native addon in the Lambda. Confirmed on a minimal Vercel repro:
    // `{ path: 'x/' }` is served by the function, `{ path: 'x' }` statically.
    //
    // Workaround: once `.vercel/output` is written, drop every override whose
    // `path` ends with `/`. Vercel's directory index then serves
    // `<dir>/index.html` at both `/<dir>/` and `/<dir>` statically. Other
    // overrides (including the root `{ path: '' }`) are untouched, and this
    // is a no-op off Vercel.
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
  // Single source of truth for AI signal directives: the module pushes its
  // `Content-Signal` (Cloudflare) and `Content-Usage` (IETF) lines into the
  // `@nuxtjs/robots` `*` group at setup time. Tradeoff: `contentSignal` maps
  // only `aiTrain` onto `Content-Usage`, so granular IETF keys like
  // `search=y, ai-output=y` are lost. `Content-Usage` adoption is minimal
  // today, so the loss is small.
  // https://nuxtseo.com/docs/robots/guides/ai-directives
  //
  // Every route is prerendered, so `runtimeSync`, `cron`, and `database` stay
  // unset: pages are indexed once at prerender time, and with no runtime
  // feature asking for page storage the module keeps its SQLite driver out of
  // the Nitro bundle. Prerender indexing uses its own build-time database and
  // still writes llms.txt, llms-full.txt, and the `.md` twins.
  // https://nuxtseo.com/ai-ready
  aiReady: {
    contentSignal: {
      aiTrain: false,
      search: true,
      aiInput: true,
    },
    // Every collection in `content.config.ts` is `type: 'data'`, so the
    // content lookup can never match a route and only pulls
    // `minimark/stringify` into the Nitro bundle. Restore the default if a
    // `type: 'page'` collection is ever added.
    contentSource: false,
    llmsTxt: {
      markdownLinks: true,
    },
    // Despite the name this bites at build time: the prerenderer renders the
    // same `defineCachedFunction`-wrapped handler, so the 600 second default
    // persists a copy under `node_modules/.cache/nuxt/.nuxt/cache/ai-ready/`
    // and two builds inside that window ship the earlier build's llms.txt.
    // `0` is the documented off switch and costs nothing here, because the
    // route renders once per build and is static from then on.
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
      // Off by choice: it adds a source transform over every component in dev
      // in exchange for a hydration diff viewer this project does not use.
      hydration: false,
      // Needs `@nuxt/hints` >= 1.1.4, which fixed the dev-console 404 this
      // was once disabled for.
      // https://github.com/nuxt/hints/issues/359
      // https://github.com/nuxt/hints/pull/367
      lazyLoad: true,
      webVitals: true,
      // `@nuxt/hints` pipes every SSR response through `prettier.format`
      // before html-validate with no try/catch, and Prettier's HTML parser
      // throws on the SVG -> HTML namespace switch inside `<foreignObject>`
      // (the About-section portrait). Nitro awaits `render:response`
      // unguarded, so the throw surfaces as an HTTP 500 on that page. Still
      // reproducible on the installed 1.1.4.
      // https://github.com/nuxt/hints/issues/360
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
    // `strictSeo` throws when `baseUrl` is absent, and nuxt-site-config's
    // runtime propagation is best-effort, so it is set explicitly here.
    // Every route is prerendered, so hreflang URLs are baked at build time:
    // NUXT_SITE_URL must hold the final origin during the build, per
    // environment, because no runtime override can change a static tag.
    // https://nuxtseo.com/docs/site-config/guides/i18n
    baseUrl: process.env.NUXT_SITE_URL,
    trailingSlash: true,
    // `prefix`, not `prefix_except_default`: German lives at a stable `/de/`
    // and `/` redirects. Otherwise detectBrowserLanguage 302s non-German
    // visitors away from `/` and Googlebot can never index it as German.
    strategy: 'prefix',
    defaultLocale: 'de',
    // `strictSeo` hands hreflang, canonical, og:locale, and og:url to i18n
    // instead of seo-utils, and requires the `baseUrl` above.
    // `compactRoutes` collapses the per-locale routes into one regex route.
    // https://nuxt.com/modules/i18n#new-features
    experimental: {
      strictSeo: true,
      compactRoutes: true,
    },
    // `redirectOn: 'root'` keeps browser-language detection on `/` only, so
    // crawlers reach localized routes without 302 chains. The v10 migration
    // guide suggests `'all'` for `strategy: 'prefix'` to preserve v9 behavior,
    // which we deliberately reject. Unprefixed sub-paths like `/projects/`
    // 404 by design so they cannot compete with `/<locale>/projects/`.
    // https://i18n.nuxtjs.org/docs/guide/browser-language-detection
    // https://i18n.nuxtjs.org/docs/guide/migrating
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieSecure: true,
      // Must equal `defaultLocale`: the prerendered `/index.html` fires
      // without an Accept-Language header, and the sitemap and
      // `hreflang="x-default"` already point at `/de/`.
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
      // Prebuilt Iconify JSON from the private package. Passing the
      // parsed collection keeps 6984 SVG files out of this repository
      // and avoids the per-build directory scan that previously pushed
      // the prerender bundle past Node's default heap limit.
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
    // Only orders `<NuxtPicture>` `<source>` elements. The Vercel resizer
    // ignores it and negotiates from the request's `Accept` header, so
    // `vercel.formats` below repeats the AVIF-over-WebP preference.
    format: ['avif', 'webp'],
    vercel: {
      formats: ['image/avif', 'image/webp'],
      // Only applies to REMOTE sources. The provider default of 300 would
      // bill a fresh transformation every 5 minutes per remote image. Local
      // images are cached up to 31 days regardless, so this starts to matter
      // once `image.domains` gains remote sources.
      // https://vercel.com/docs/image-optimization#remote-image-cache-expiration
      minimumCacheTTL: 60 * 60 * 24 * 28,
    },
    // The Vercel provider only resizes to widths listed here, rounding an
    // unlisted width up to the next entry, and `densities: [1, 2]` means
    // every rendered width also needs its 2x variant. The `portrait-*`
    // entries cover `sizes="275px md:300px xl:350px"` in
    // `app/components/Section/About.global.vue`, plus their retina pairs.
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
      // Open Graph aspect (1200×630, 1.91:1). These modifiers only seed the
      // srcset aspect ratio and the upper-bound width the Vercel resizer
      // rounds up to. CLS is prevented by the explicit `height` on
      // `.card-cover` in CSS, not here. `fit: 'cover'` lives on the
      // component: the Vercel resizer URL carries only `url`, `w`, and `q`,
      // so it is a no-op here but is honored by IPX or Cloudinary if the
      // provider is ever swapped.
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
    // Nothing consumes these reports yet: with `report.publish` unset they
    // land in `.output/`, which Vercel discards. A broken link is reported
    // but never fails the build (`failOnError` defaults to `false`).
    report: {
      markdown: true,
      json: true,
      html: true,
    },
    excludeLinks: [
      // Remote URLs are never fetched (`fetchRemoteUrls` defaults to
      // `false`), so these only suppress local checks such as link text.
      /^https?:\/\/(www\.)?(x|twitter)\.com\//,
      /^https?:\/\/(www\.)?linkedin\.com\//,
      /^https?:\/\/(www\.)?instagram\.com\//,
      /^https?:\/\/(www\.)?threads\.net\//,
      /^https?:\/\/(www\.)?reddit\.com\//,
      '/__nuxt_hints/**',
      '/__link-checker__/**',
    ],
    // `strictNuxtContentPaths` is deliberately absent: nuxt-link-checker v5
    // defines it as a default but never reads or forwards it to runtime
    // config.
  },
  ogImage: {
    // Cuts the Nitro bundle ~81% (1.6 MB -> 306 KB) by prerendering every OG
    // image to a static asset. Safe because all 4 routes × 4 locales = 16 OG
    // images are fully static.
    zeroRuntime: true,
    buildCache: true,
    defaults: {
      // Matches the `@nuxt/image` `cover` preset (1200×630, Facebook/LinkedIn
      // 1.91:1 aspect). Module default is 1200×600 which gets cropped.
      width: 1200,
      height: 630,
    },
    // No `security` block. With `zeroRuntime: true` there is no runtime
    // endpoint to protect, and `strict` plus a signing secret would flip the
    // emitted og:image URLs from the prerendered `/_og/s/...` assets to
    // runtime `/_og/d/...` URLs that 404 in production.
  },
  // No `schemaOrg` block. Forcing `reactive` in production would ship the
  // resolver to every client and defeat tree-shaking, and crawlers only read
  // the SSR JSON-LD. Locale switches are full route navigations under
  // `strategy: 'prefix'`, so the graph re-renders server side per locale.
  // Person identity is registered in `app/app.vue` via
  // `useSchemaOrg`: defining it here would bake `process.env.NUXT_SITE_URL`
  // at build time (silently empty on Vercel preview deploys) and would miss
  // the per-locale description from nuxt-site-config.
  // https://nuxtseo.com/docs/schema-org/guides/setup-identity
  scripts: {
    defaultScriptOptions: {
      bundle: true,
    },
    // Without this gate, `@nuxt/scripts` emits a preload for `gtag/js?id`
    // with an empty ID and loads a broken script wherever
    // NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID is unset
    // (it is marked optional in `.env.schema`).
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
    // `strict: true` pulls in the module's hardened defaults, and the
    // top-level options below only declare deviations from them. The CSP and
    // permissions-policy blocks, however, re-declare every directive:
    // nuxt-security merges arrays with `defuReplaceArray`, so a user value
    // REPLACES the default array for that directive entirely. Being explicit
    // prevents silent drift when an upstream default changes.
    // https://nuxt-security.vercel.app/getting-started/configuration
    strict: true,
    csrf: true,
    // Strip `console.*` only in production so debug logs survive HMR.
    // Base default is `true` in every environment.
    removeLoggers: process.env.NODE_ENV === 'production',
    // Log CSP violations without enforcing them on preview deploys, so new
    // third-party scripts can be verified before promoting to production.
    // https://nuxt-security.vercel.app/headers/csp#report-only
    contentSecurityPolicyReportOnly: process.env.VERCEL_ENV === 'preview',
    ssg: {
      // Strict mode would turn this on, but hashing is pointless while
      // motion-v and lazy-hydrated styles keep `style-src` below on
      // 'unsafe-inline'.
      hashStyles: false,
    },
    headers: {
      // `require-corp` (from strict mode) breaks Apple MusicKit, the
      // Meticulous iframe, and Google Analytics beacons that carry no CORP
      // headers.
      // https://nuxt-security.vercel.app/headers/crossOriginEmbedderPolicy
      crossOriginEmbedderPolicy: 'credentialless',
      // Loosened from the `'no-referrer'` default so Vercel Analytics and
      // GA4 can attribute referers on cross-origin navigations.
      // https://developer.mozilla.org/docs/Web/HTTP/Headers/Referrer-Policy
      referrerPolicy: 'strict-origin-when-cross-origin',
      contentSecurityPolicy: {
        'base-uri': ['\'none\''],
        // 'self' rather than the OWASP-gold 'none': speculative
        // `<link rel="prefetch">` and preload hints fall under `default-src`
        // (the spec removed `prefetch-src`), so 'none' blocks the hints Nuxt
        // emits for lazy route chunks and costs the prefetch win. Every
        // meaningful sink stays locked by its own explicit directive below.
        // https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/prefetch-src
        'default-src': ['\'self\''],
        'connect-src': [
          '\'self\'',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://*.googletagmanager.com',
          'https://*.g.doubleclick.net',
          'https://*.google.com',
          // Meticulous's session recorder calls these internally, none from
          // app code: Cognito issues session credentials, S3 acceleration
          // takes the user-event uploads, and Sentry receives the telemetry
          // (Meticulous runs on Sentry). Removing any one breaks the
          // recorder before its snippet finishes bootstrapping.
          // https://app.meticulous.ai/docs/session-recording/csp-exceptions
          'https://cognito-identity.us-west-2.amazonaws.com',
          'https://user-events-v3.s3-accelerate.amazonaws.com',
          'https://*.sentry.io',
          // The Sentry SDK Meticulous loads fetches its own source map from
          // this CDN, which is a connect-src request. It needs no
          // `script-src` entry because 'strict-dynamic' extends trust through
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
          // Apple Music artwork (MusicKit catalog responses).
          'https://*.mzstatic.com',
        ],
        'manifest-src': ['\'self\''],
        'media-src': ['\'self\''],
        'object-src': ['\'none\''],
        // 'self' is a Level 1/2 fallback: older browsers ignore
        // 'strict-dynamic' and would otherwise refuse to load lazy chunks.
        // 'wasm-unsafe-eval' is required by `@nuxt/content`'s client-side
        // sqlite-wasm adapter and scopes the permission to WebAssembly, so
        // full `unsafe-eval` for JavaScript stays off.
        // https://nuxt-security.vercel.app/advanced/strict-csp#strict-dynamic-csp-level-3
        // https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_webassembly_execution
        'script-src': [
          '\'self\'',
          '\'strict-dynamic\'',
          '\'wasm-unsafe-eval\'',
          '\'nonce-{{nonce}}\'',
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
        // Not in the strict-mode default (the directive postdates it).
        // Added to keep analytics third parties out of the Topics API.
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
        // The one directive strict mode does not zero out: it defaults this
        // to `['self']`.
        'sync-xhr': [],
        'usb': [],
        'web-share': [],
        'xr-spatial-tracking': [],
      },
    },
  },

  seo: {
    // Without this gate, preview deploys at `*.vercel.app` 301 to the
    // canonical `NUXT_SITE_URL` and every navigation bounces off the preview
    // host. Preview hostnames are not indexed anyway.
    // https://nuxtseo.com/docs/seo-utils/api/config
    redirectToCanonicalSiteUrl: process.env.VERCEL_ENV === 'production',
    meta: {
      // `titleTemplate` is deliberately absent here. See the note on
      // `app.head.titleTemplate` above.
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
    // A single sitemap.xml instead of a per-locale index. Multi-sitemaps
    // target sites with 10k+ URLs and this one has 16.
    sitemaps: false,
    // The prerendered unprefixed root is a meta-refresh redirect page and
    // must not be listed. This must be a RegExp: under i18n strategy
    // 'prefix' a string '/' would be expanded per locale and remove every
    // locale home page from the sitemap as well.
    exclude: [/^\/$/],
    // Mirrors `ogImage.zeroRuntime` and shaves around 50 KB (5 KB gzip) off
    // the Nitro bundle. Safe because every URL is statically prerendered and
    // there are no dynamic sitemap sources.
    // https://nuxtseo.com/docs/sitemap/guides/zero-runtime
    zeroRuntime: true,
    // `defaults.lastmod` is deliberately unset, as is `autoLastmod: true`:
    // both stamp build time, and Google distrusts lastmod values that always
    // equal it. Once per-page edit dates exist (for example in
    // `@nuxt/content` frontmatter), set it per page via
    // `definePageMeta({ sitemap: { lastmod } })`.
    // https://nuxtseo.com/docs/sitemap/guides/best-practices
  },
  // Polls `_nuxt/builds/latest.json` and surfaces the headless
  // `<SkewNotification>` toast mounted in `app/layouts/default.vue`. Vercel's
  // native Skew Protection is plan-gated (Pro and Enterprise) and only
  // default-on for projects created after 19 November 2024, so it has to be
  // verified in the project settings rather than assumed.
  //
  // v1.5.0 added provider-aware defaults, but they cover less than the name
  // suggests, so all three options are pinned deliberately:
  //   * `bundleAssets` auto-defaults to `false` only when the build can PROVE
  //     native protection is live (both `VERCEL_SKEW_PROTECTION_ENABLED ===
  //     '1'` and `VERCEL_DEPLOYMENT_ID` set). Otherwise it falls back to
  //     `true` and mirrors previous builds' `_nuxt/` output back into the
  //     deployment through `node_modules/.cache`. Pinning `false` is what
  //     keeps the plan-gated case above safe.
  //   * `updateStrategy` unset resolves to `'sse'`, which registers
  //     `/__skew/sse` plus a client plugin holding a connection open against
  //     a Fluid Compute function. `'polling'` rides Nuxt's own
  //     `check-outdated-build.client` instead.
  //   * `reloadStrategy` is already the module default, pinned because
  //     `'immediate'` and `'idle'` call `reloadNuxtApp({ force: true })` out
  //     from under the user.
  //
  // KNOWN LIMITATION: the prompt never fires on this fully prerendered site.
  // `<SkewNotification>` early-returns on `payload.prerenderedAt`, and the
  // chunks-outdated trigger (which no longer requires `bundleAssets` since
  // v1.5.0) compares deleted chunks against a module list held in a plain
  // in-memory `Set` in the service worker (`/_nuxt-skew-sw.js`), which is
  // empty again once the browser evicts the worker (~30s), while under
  // `'polling'` `app:manifest:update` fires at most once per page load and no
  // sooner than `checkOutdatedBuildInterval` (1h default). The build-time
  // version manifest is no more durable: the default `fs` driver writes under
  // `node_modules/.cache`, which Vercel restores only on a build-cache hit
  // (keyed partly on git branch, capped at 1 GB, dropped after a month or on
  // any no-cache redeploy), and `bundleAssets: false` gates out the "No
  // previous versions found in storage" warning when it misses. Restoring
  // the prompt would need a durable storage driver (Upstash Redis per the
  // module docs), a shorter `experimental.checkOutdatedBuildInterval`, and
  // upstream persistence of the service-worker module list.
  // `bundleAssets: true` is NOT the fix. The alternative is dropping the
  // module for Nuxt's built-in chunk-reload recovery
  // (`experimental.emitRouteChunkError: 'automatic'`).
  //
  // On the `vercel` preset the module also stamps Vercel's `__vdpl` cookie on
  // document responses, which pins later navigations to that deployment
  // (working against this very prompt) and 404s once the deployment ages past
  // the Maximum Age (1 day default). It is inert for prerendered HTML, served
  // from the CDN without reaching Nitro, which is every route here except the
  // error page.
  // No `cookie` block: it is read only on paths this config never reaches.
  // https://vercel.com/docs/skew-protection
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
    // it, so this must name one of the custom names above. It equals the
    // module default in nuxt-viewport 2.6.1, but is pinned explicitly so a
    // future default change cannot point SSR at a name this config does not
    // define.
    fallbackBreakpoint: 'desktop',
  },
})
