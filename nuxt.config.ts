import { fileURLToPath } from 'node:url'
import { icons as sfSymbols } from '@jonathanxdr/iconify-json-sf-symbols'
import tailwindcss from '@tailwindcss/vite'

// Fail fast when the Infisical Vercel Secret Sync did not deliver a
// build-critical variable. On Vercel the build runs plain `nuxt build`
// without the varlock wrapper, so the .env.schema is never enforced
// there. The variables below have no graceful fallback. A missing value
// silently prerenders broken output instead of degrading, so a loud build
// failure is the lesser evil.
//   NUXT_SITE_URL drives the i18n strictSeo baseUrl, the site config
//   canonical origin, and the llms.txt host. Absent, every absolute URL
//   across the prerendered pages is wrong.
//   NUXT_SITE_NAME feeds SSR titles, og:site_name, and the schema.org
//   publisher. Absent, they render empty.
//   NUXT_PUBLIC_GITHUB_REPO_NAME and NUXT_PUBLIC_GITHUB_REPO_OWNER pin the
//   repository the GitHub API layer is allowed to read. Absent, every
//   GitHub endpoint builds malformed requests.
// Credential secrets (NUXT_GITHUB_TOKEN, the Apple keys) are intentionally
// excluded. Their endpoints degrade to an inert 404 via requireCredential
// in server/utils/credentials.ts, so failing the build for them would be
// worse than the graceful runtime behavior they already have.
// The process.env.VERCEL gate fires only when Vercel exposes its System
// Environment Variables, since VERCEL itself is one of them. Confirm that
// setting in the Vercel project rather than inferring it from skew
// protection, because this project runs nuxt-skew-protection in polling
// mode, which reads _nuxt/builds/latest.json and does not depend on it.
// Local dev and local builds have no VERCEL set, so the guard correctly
// stays silent there.
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
    // `@nuxt/content` is pinned to a local fork that extends upstream 3.x
    // with i18n-key support: collections marked `i18n: true` (see
    // content.config.ts) accept nested `i18n.<locale>:` YAML keys instead
    // of requiring per-locale files.
    //
    // Install source (production and CI, including Vercel): the
    // `release/better-i18n` branch of github.com/JonathanXDR/content,
    // pinned in package.json as
    // `github:JonathanXDR/content#release/better-i18n`. That branch
    // commits the built `dist/` so `bun install` can use it directly
    // without running `nuxt-module-build` during install.
    //
    // Dev override (opt-in): a local symlink from
    // /Users/taarujo6/Developer/Git/GitHub/content into node_modules
    // for fast iteration on the fork itself. Reinstall workflow lives in
    // ~/.claude/projects/<this-project>/memory/project_local_content_setup.md
    //
    // Do not change the GitHub URL or branch in package.json without first
    // building and pushing matching `dist/` to that branch on the fork, or
    // translations will silently stop resolving.
    '@nuxt/content',
    '@nuxt/scripts',
    // Meticulous session recorder, native Nuxt plugin. It injects the
    // recorder as the first <head> script with no async or defer so it can
    // capture every network request. By default the recorder loads in dev
    // builds only and is absent from production. The token is a public
    // client side recording token, the same value the previous
    // @nuxt/scripts global used.
    // https://app.meticulous.ai/docs/how-to/recorder-script?tab=Nuxt
    [
      '@alwaysmeticulous/recorder-plugin/nuxt',
      {
        recordingToken: '3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w',
        // @nuxt/hints flags third-party scripts without crossorigin. The
        // recorder is served with CORS by the Meticulous CDN, so anonymous
        // mode gives full cross-origin error reporting without sending
        // credentials. The plugin merges these onto the injected script tag.
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
    // Listed explicitly BEFORE nuxt-ai-ready. Scanned modules from the
    // modules/ directory install after every module in this array, but
    // nuxt-ai-ready fires its `ai-ready:llms-txt` hook during its own
    // setup, so the hook listener must be registered before that. Without
    // this entry the per-locale page sections never reach llms.txt.
    './modules/llms-txt-sections',
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
          // Same-origin so it loads against `img-src 'self'` when the dev
          // server runs on localhost. Shares its `key` with the layout's
          // randomly colored variant for the same replace-not-stack reason
          // as the icon above.
          {
            key: 'touch-icon',
            rel: 'apple-touch-icon',
            href: '/img/dev/favicon-dev-orange.png',
          },
        ],
      },
    },
    // Sensible default for `nuxt dev` runs that bypass varlock, so the
    // dev badge and dev favicon logic do not silently disable themselves.
    // NUXT_PUBLIC_APP_ENVIRONMENT still overrides this at runtime.
    runtimeConfig: {
      public: {
        appEnvironment: 'development',
      },
    },
    // The locale cookie is marked Secure in production. Chrome treats
    // localhost as a secure context, but Safari on localhost and LAN-IP
    // phone testing over plain http would silently drop it, breaking
    // locale persistence across visits in those dev setups.
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
          // Same-origin PNG used as the iOS home-screen icon. A relative
          // path is sufficient because Safari resolves apple-touch-icon
          // against the current document origin, so no extra `img-src`
          // allowlist entries are needed.
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
  // Nuxt auto-imports only the top level of `shared/types/`, so `schemas.ts`
  // resolves without help, but the nested dirs below must be added here. `~~`
  // is rootDir, where `shared/` lives, not the `app/` srcDir a bare entry assumes.
  // https://nuxt.com/docs/4.x/directory-structure/shared#how-files-are-scanned
  imports: {
    dirs: [
      '~~/shared/types/components',
      '~~/shared/types/services/github',
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
      // `titleTemplate` lives here rather than under `seo.meta` because
      // nuxt-seo-utils' `extendNuxtConfigAppHeadSeoMeta` runs `unpackMeta()`
      // over `seo.meta`, which only handles `<meta>` tags and silently drops
      // `titleTemplate`. Setting it on `app.head` is the canonical Nuxt
      // location and overrides the seo-utils default `'%s %separator %siteName'`.
      titleTemplate: 'JR %separator %s',
      // `apple-touch-icon` lives in the `$development` and `$production`
      // blocks above, not here. Both point at same-origin paths so CSP
      // `img-src 'self'` is enough.
      link: [{ rel: 'manifest', href: '/site.webmanifest' }],
    },
  },
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  // `site.name` and `site.url` are intentionally NOT set here. They are
  // auto-populated from NUXT_SITE_NAME and NUXT_SITE_URL at runtime by
  // nuxt-site-config, which keeps them live to env changes on redeploy
  // without baking build-time values into the SSR config.
  // `defaultLocale` is a belt-and-braces fallback so that, if i18n init
  // order ever changes, og:locale and inLanguage do not silently empty out.
  // https://nuxtseo.com/docs/site-config/guides/how-it-works
  site: {
    trailingSlash: true,
    defaultLocale: 'de-DE',
  },
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      // TODO: enable these once the app surfaces build metadata.
      // appName: '',
      // appBuild: '',
      // appVersion: '',
      // appIcon: '',
      // Fail-safe default. Every consumer checks `=== 'development'`, so a
      // deploy that never received NUXT_PUBLIC_APP_ENVIRONMENT renders as
      // production (no dev badge) rather than an ambiguous empty string.
      // Local dev overrides this via the `$development` block above.
      appEnvironment: 'production',
      githubRepoName: '',
      githubRepoOwner: '',
    },
    githubToken: '',
    appleDeveloperPrivateKey: '',
    appleDeveloperKeyId: '',
    appleDeveloperTeamId: '',
    appleMusicUserToken: '',
  },
  // `app/assets/img/**` holds source images such as the original portrait
  // jpg. They stay in the repository for future editing but are never
  // imported, and the ignore entry keeps them out of Nuxt's scanning so
  // nothing from that directory can ship by accident. The patterns are
  // matched against the rootDir-relative path, so they must use the real
  // `app/...` path, not the `~` srcDir alias, which @nuxt/kit's ignore
  // matcher does not resolve (a `~`-prefixed pattern silently matches
  // nothing).
  ignore: ['app/assets/drafts/**', 'app/assets/img/**'],
  // No `'/': { robots: false }` route rule here, even though the
  // unprefixed root is a meta-refresh interstitial. @nuxtjs/robots strips
  // the locale prefix before matching route rules, so a rule on `/` would
  // bake `noindex, nofollow` into every locale home page and drop all four
  // from the sitemap. The root is excluded from the sitemap via
  // `sitemap.exclude` below instead.
  routeRules: {
    '/api/**': {
      // No `robots: false`. @nuxtjs/robots (v6+) warns on `/api` disallows
      // because APIs are not crawled anyway, and listing them in robots.txt
      // advertises their existence. Neither nuxt-security nor the robots
      // module sets X-Robots-Tag on /api paths (the robots middleware skips
      // them entirely), so the plain Nitro header below provides the
      // noindex signal in a module-independent way.
      headers: {
        'X-Robots-Tag': 'noindex',
      },
      // The rate limiter uses the in-memory lruCache driver, so on Vercel
      // the limit is per warm instance and resets on cold starts. That is
      // acceptable best-effort protection for this site. Platform-level
      // controls (Vercel WAF) are the real production backstop.
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
    // `csurf: false` and `robots: false` are re-applied via the
    // `nitro:config` hook below: nuxt-security 2.6.0 unconditionally
    // overwrites this entry with assignment (not defu) in its module setup
    // when @nuxt/hints is installed, clobbering both fields. The hook runs
    // after that assignment and re-merges them.
    // https://github.com/Baroshem/nuxt-security/blob/main/src/module.ts
    '/__nuxt_hints/**': {
      csurf: false,
      robots: false,
      security: {
        requestSizeLimiter: false,
        rateLimiter: false,
      },
    },
    // @nuxt/scripts proxies third-party telemetry (GA4 collect beacons) under
    // `/_scripts/p/<host>/<path>`. nuxt-security's `csrf` middleware rejects
    // every POST without an `x-csrf-token` header with a 403 CSRF mismatch,
    // which silently drops every analytics event. Disabling CSRF on this
    // prefix is safe: the proxied endpoints accept only beacon payloads that
    // the GA4 client already authenticates with its own `cid`/`sid` tokens.
    // The asset sub-route (`/_scripts/assets/**`) is GET-only and benefits
    // from the same exemption.
    // https://nuxt-security.vercel.app/middleware/csrf
    // https://scripts.nuxt.com/docs/guides/first-party
    '/_scripts/**': {
      csurf: false,
      robots: false,
    },

    // Defensive: with `updateStrategy: 'polling'` no SSE/WS handler is
    // registered, but pre-declaring the exemption keeps a future strategy
    // switch (`'sse'` or `'ws'`) one-line on the nuxt-security side. The
    // module registers its server routes under `/__skew/` (sse, ws,
    // health, subscribe-stats, route, admin/stats), not `/_nuxt-skew/`.
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
    sharedPrerenderData: true,
  },
  compatibilityDate: '2026-03-21',
  nitro: {
    // Nitro never scans `shared/types`, so the server route's
    // MinimalRepositoryCard needs this entry even though the app side already
    // covers it. An absolute path is required because Nitro's unimport, unlike
    // the app's, does not resolve the `~~` alias.
    imports: {
      dirs: [
        fileURLToPath(new URL('./shared/types/services/github', import.meta.url)),
      ],
    },
    // Prerender all four locale roots so that:
    //   * link-checker's build-time scan exercises every page.
    //   * nuxt-og-image and nuxt-sitemap `zeroRuntime` modes have static
    //     assets to serve from the Vercel CDN instead of cold-starting
    //     Fluid Compute.
    //
    // Routes use the canonical trailing-slash form to match
    // `site.trailingSlash: true` and `i18n.trailingSlash: true`. Without
    // the slash, the prerenderer follows an internal 301 to the canonical
    // URL and double-writes the output. `/` is listed explicitly so the
    // `detectBrowserLanguage.redirectOn: 'root'` meta-refresh page is
    // emitted as `dist/index.html`, because `crawlLinks` cannot discover
    // it (no in-page link points back to the unprefixed root under
    // `strategy: 'prefix'`).
    prerender: {
      crawlLinks: true,
      routes: ['/', '/de/', '/en/', '/fr/', '/it/'],
      // `crawlLinks: true` follows every `<img src>` it finds, including
      // the Vercel image-optimizer URLs emitted by `@nuxt/image`'s vercel
      // provider (`/_vercel/image?url=…&w=…&q=…`). That endpoint only
      // exists at runtime on Vercel's edge, so the build-time crawl 404s
      // and aborts the prerender step. Skip the entire `/_vercel/` prefix
      // to keep the crawl focused on real, ours-to-render routes.
      ignore: [/^\/_vercel\b/],
    },
    // `@nuxt/image`'s vercel provider hard-codes `minimumCacheTTL: 60 * 5`
    // (5 minutes) into `nitro.vercel.config.images` with no module-level
    // override hook. `defu` runs at module-setup time and lets first-arg
    // (our config) win, so this raises the floor without losing the
    // module-generated `domains`, `sizes`, and `formats`. Local images
    // cache up to 31 days on Vercel regardless, so this only matters
    // once remote sources (such as repo covers) are added to
    // `image.domains`.
    // TODO: drop this override once `@nuxt/image`'s vercel provider
    //       exposes a `minimumCacheTTL` config option (track upstream).
    // https://vercel.com/docs/image-optimization#remote-image-cache-expiration
    vercel: {
      config: {
        images: {
          minimumCacheTTL: 60 * 60 * 24 * 28,
        },
      },
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
        'dayjs/locale/de', // CJS
        'dayjs/locale/en', // CJS
        'dayjs/locale/fr', // CJS
        'dayjs/locale/it', // CJS
        'dayjs/plugin/relativeTime', // CJS
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
  // nuxt-security 2.6.0 sets `nuxt.options.routeRules['/__nuxt_hints/**']`
  // by direct assignment in its module setup when @nuxt/hints is present
  // (node_modules/nuxt-security/dist/module.mjs:20-28), which deletes the
  // `csurf: false` and `robots: false` declared in `routeRules` above.
  // `nitro:config` fires after every module's setup, so re-merging here
  // restores both:
  //   - `csurf: false` lets @nuxt/hints' POSTs to `/__nuxt_hints/hydration`
  //     reach the dev handler. Without it, nuxt-csurf 403s every report
  //     with "CSRF Token Mismatch". The lazy-load feature also POSTed here
  //     before it was disabled via `hints.features.lazyLoad` below.
  //   - `robots: false` keeps the internal devtool route out of robots.txt.
  // @nuxt/hints 1.1.2's lazy-load `postHandler` ends with
  // `setResponseStatus(event, 201)` yet returns `undefined`, so h3 lets the
  // POST fall through to Nuxt's page renderer and the browser logs a `404
  // Page not found` even though the payload was received and stored. That
  // upstream bug is why the lazy-load hint is off above: it POSTed on every
  // render and produced recurring 404s. The hydration postHandler returns a
  // body in 1.1.2, so hydration reports do not 404.
  // TODO: drop this hook once nuxt-security uses `defuReplaceArray` for its
  //       auto-hints route rule, and re-enable lazyLoad once @nuxt/hints'
  //       postHandler returns a body (track both upstream).
  hooks: {
    'nitro:config'(nitroConfig) {
      nitroConfig.routeRules ??= {}
      nitroConfig.routeRules['/__nuxt_hints/**'] = {
        ...nitroConfig.routeRules['/__nuxt_hints/**'],
        csurf: false,
        robots: false,
      }
    },
    // TODO(nitro-vercel-trailing-slash-override): remove this whole `nitro:init`
    //   hook and bump nitropack/nuxt once the upstream fix ships. Track:
    //   https://github.com/nitrojs/nitro/issues/<FILE-ME> (file using the repro:
    //   https://github.com/JonathanXDR/repro-nuxt-vercel-trailing-slash-override).
    //
    // Nitro's Vercel preset (src/presets/vercel/utils.ts) writes Build Output
    // `overrides` whose `path` keeps the route's trailing slash, e.g.
    // `de/index.html` -> { path: 'de/' }, for our trailing-slash routes
    // (site/i18n `trailingSlash: true`). Vercel does NOT serve the prerendered
    // static file from a trailing-slash override path, so `/de/` falls through to
    // the SSR function (and there 500s, because that function also can't load
    // @nuxt/content's better-sqlite3 native addon in the Lambda). Empirically
    // confirmed on a minimal repro deployed to Vercel: a `{ path: 'x/' }`
    // override is served by the function (cache MISS, body re-renders per
    // request) while `{ path: 'x' }` is served statically (cache HIT, frozen).
    //
    // Workaround: after `.vercel/output` is written, drop every override whose
    // `path` ends with `/`. Vercel's default directory-index then serves the
    // `<dir>/index.html` file at both `/<dir>/` and `/<dir>` statically, which
    // is exactly the last-known-good behavior. Non-trailing-slash overrides
    // (incl. the root `{ path: '' }`) are left untouched. No-op off Vercel
    // (the file does not exist), so local `nuxt dev`/`build` are unaffected.
    'nitro:init'(nitro) {
      nitro.hooks.hook('close', async () => {
        const { existsSync, readFileSync, writeFileSync } = await import('node:fs')
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
        let stripped = 0
        for (const [key, value] of Object.entries(cfg.overrides)) {
          if (value?.path?.endsWith('/')) {
            delete cfg.overrides[key]
            stripped += 1
          }
        }
        if (stripped > 0) {
          writeFileSync(cfgPath, JSON.stringify(cfg))
          console.log(
            `[nitro-vercel-trailing-slash-override] stripped ${stripped} trailing-slash override(s) so Vercel serves prerendered HTML statically`,
          )
        }
      })
    },
  },
  // Single source of truth for AI signal directives. The module pushes its
  // own `Content-Signal` (Cloudflare) and `Content-Usage` (IETF) lines into
  // the @nuxtjs/robots `*` group at module setup time.
  // Trade-off note: AI Ready's `contentSignal` only maps `aiTrain` onto
  // `Content-Usage`, so granular IETF keys like `search=y, ai-output=y` do
  // not survive (Cloudflare's `Content-Signal` keeps all three: `ai-train`,
  // `search`, `ai-input`). Adoption of `Content-Usage` is currently minimal
  // so the loss is small.
  // https://nuxtseo.com/docs/robots/guides/ai-directives
  // Prerender-driven: `runtimeSync` and `cron` stay off because every one of
  // the 16 routes is statically prerendered, so the on-disk SQLite is built
  // once at prerender time and never touched at runtime. `database` and
  // `indexNow` stay at their defaults. Revisit once we want IndexNow
  // submissions or a runtime-indexed >100-route site.
  // https://nuxtseo.com/ai-ready
  aiReady: {
    autoI18n: true,
    contentSignal: {
      aiTrain: false,
      search: true,
      aiInput: true,
    },
    markdownCacheHeaders: {
      maxAge: 3600,
      swr: true,
    },
    llmsTxtCacheSeconds: 600,
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
      // Disabled. Its client plugin POSTed lazy-load telemetry to
      // /__nuxt_hints/lazy-load on every render, and an upstream postHandler
      // bug (detailed at the nitro:config hook above) turned each POST into a
      // dev-console 404. The hint data is cosmetic, so the feature is off.
      lazyLoad: false,
      webVitals: true,
      // @nuxt/hints pipes every SSR HTML response through `prettier.format`
      // before handing it to html-validate. Prettier's HTML parser cannot
      // handle the SVG → HTML namespace switch inside `<foreignObject>`
      // (used by the About-section portrait to get real `srcset` density
      // picking), and throws `Unexpected closing tag ":svg:foreignObject"`
      // on every render.
      // TODO: re-enable once @nuxt/hints wraps the prettier call in
      //       try/catch or stops formatting before validation.
      htmlValidate: false,
      thirdPartyScripts: {
        options: {
          ignoredDomains: ['va.vercel-scripts.com'],
        },
      },
    },
  },
  i18n: {
    // `baseUrl` must be set explicitly under `experimental.strictSeo: true`.
    // The strict path throws on absence and the throw propagates out of the
    // `app:rendered` hook, so a missing value fails renders rather than
    // silently dropping tags. nuxt-site-config's runtime
    // `site-config:resolve` propagation is best-effort and cannot be relied
    // on here.
    // Because every route is prerendered, hreflang URLs are baked at build
    // time, so NUXT_SITE_URL must hold the final origin during the build.
    // Per-environment origins come from the value of NUXT_SITE_URL in each
    // Infisical environment, not from a separate runtime override, because a
    // runtime change cannot alter tags that are already static.
    // https://nuxtseo.com/docs/site-config/guides/i18n
    baseUrl: process.env.NUXT_SITE_URL,
    trailingSlash: true,
    // `prefix` (not `prefix_except_default`) so the German page lives at a
    // stable `/de/` and `/` becomes a redirect. Avoids the foot-gun where
    // detectBrowserLanguage permanently 302s non-German visitors away from `/`
    // and Googlebot can never index `/` as German.
    strategy: 'prefix',
    defaultLocale: 'de',
    // v10 experimental features:
    //   * strictSeo: i18n owns hreflang, canonical, og:locale, and og:url
    //     (seo-utils becomes a low-priority fallback). Requires `baseUrl`
    //     above.
    //   * compactRoutes: collapses per-locale routes into a single
    //     `:locale(de|en|fr|it)` regex route.
    // https://nuxt.com/modules/i18n#new-features
    experimental: {
      strictSeo: true,
      compactRoutes: true,
    },
    // `redirectOn: 'root'` follows the SEO best-practices doc
    // (https://i18n.nuxtjs.org/docs/guide/browser-language-detection).
    // Browser-language detection runs only on `/`, so crawlers index
    // localized routes (`/de/projects/`, `/en/projects/`, and so on)
    // directly without 302 redirects. The v10 migration guide
    // (https://i18n.nuxtjs.org/docs/guide/migrating) suggests
    // `redirectOn: 'all'` for `strategy: 'prefix'` to preserve v9 behavior
    // where unprefixed sub-paths also got auto-redirected, but that
    // creates 302 chains for crawlers and dilutes crawl budget. We
    // deliberately keep `'root'`. Unprefixed sub-paths like `/projects/`
    // 404 by design so they cannot compete with `/<locale>/projects/`.
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieSecure: true,
      // Must equal `defaultLocale` so the prerendered static `/index.html`
      // (which fires without an Accept-Language header) meta-refreshes to
      // `/de/` instead of `/en/`. The sitemap and `hreflang="x-default"`
      // already point to `/de/`, so this aligns the actual landing page
      // with both, ensuring crawlers and language-agnostic visitors agree.
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
  // The error page cannot be prerendered (404s hit arbitrary URLs), so it is
  // the only route whose @nuxt/content queries run at runtime inside the
  // Vercel Lambda, where the default better-sqlite3 addon fails to load and
  // the default ./contents.sqlite path is read-only. The 'native' connector
  // uses Node 24's built-in node:sqlite instead, and /tmp is the Lambda's only
  // writeable directory.
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
    // `format` configures `<NuxtPicture>` `<source>` ordering only.
    // `<NuxtImg>` and the Vercel resizer ignore it, because the served
    // format is negotiated from the request's `Accept` header. We mirror
    // this ordering in `vercel.formats` so the platform-level negotiation
    // also prefers AVIF over WebP.
    format: ['avif', 'webp'],
    vercel: {
      formats: ['image/avif', 'image/webp'],
    },
    // The Vercel provider only resizes to widths listed here. Unlisted
    // widths silently round up to the next bigger entry. With
    // `densities: [1, 2]` below, each rendered width also needs its 2x
    // variant declared. The `portrait-*` entries cover the 275, 300, and
    // 350 CSS sizes from `app/components/Section/About.global.vue`
    // (`sizes="275px md:300px xl:350px"`) and their retina pairs.
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
      // Open-Graph default aspect (1200×630, 1.91:1). `width` and `height`
      // here only seed the responsive srcset aspect ratio and the
      // upper-bound width the Vercel resizer rounds up to (1280 in
      // `screens`). CLS is prevented by `.card-cover` having an
      // explicit `height` in CSS, not by these modifiers.
      // `fit: 'cover'` lives on the component because Vercel's resizer
      // URL only carries `url`, `w`, and `q`, so the prop is a no-op on
      // Vercel today but still surfaces intent and is honored by
      // non-Vercel providers (IPX, Cloudinary) if we ever swap.
      cover: {
        modifiers: {
          width: 1200,
          height: 630,
        },
      },
    },
  },
  linkChecker: {
    // Surface broken links as red/yellow squiggles directly in the dev view.
    showLiveInspections: true,
    // `strictNuxtContentPaths` was removed. It is a dead option in the
    // installed nuxt-link-checker v5, defined as a default but never read
    // or forwarded to runtime config.
    // Markdown / JSON reports for CI artifacts and PR comments. `failOnError`
    // stays false until #1 lands and signal-quality is verified.
    report: {
      markdown: true,
      json: true,
      html: true,
    },
    excludeLinks: [
      // Remote URLs are never fetched (`fetchRemoteUrls` defaults to
      // false), so these entries only suppress local inspections such as
      // link-text checks on outbound social links in dev.
      /^https?:\/\/(www\.)?(x|twitter)\.com\//,
      /^https?:\/\/(www\.)?linkedin\.com\//,
      /^https?:\/\/(www\.)?instagram\.com\//,
      /^https?:\/\/(www\.)?threads\.net\//,
      /^https?:\/\/(www\.)?reddit\.com\//,
      // Internal devtool routes that shouldn't be crawled.
      '/__nuxt_hints/**',
      '/__link-checker__/**',
    ],
  },
  ogImage: {
    // Zero-runtime mode: every OG image is prerendered to a static asset
    // and served from the Vercel CDN. Cuts the Nitro bundle ~81% (1.6 MB →
    // 306 KB) and removes cold-start latency for the social card endpoint.
    // Safe because all 4 routes × 4 locales = 16 OG images are fully static.
    zeroRuntime: true,
    // Caches rendered OG images by component+props hash so CI re-runs skip
    // regeneration when content hasn't changed. Auto-pruned after 7 days.
    buildCache: true,
    defaults: {
      // Matches the @nuxt/image `cover` preset (1200×630, Facebook/LinkedIn
      // 1.91:1 aspect). Module default is 1200×600 which gets cropped.
      width: 1200,
      height: 630,
    },
    // No `security` block. With `zeroRuntime: true` there is no production
    // runtime generation endpoint to protect, and enabling `strict` plus a
    // signing secret flips the emitted og:image URLs from the prerendered
    // static `/_og/s/...` assets to runtime `/_og/d/...` URLs that 404 in
    // production. Re-add the block only if zeroRuntime is ever turned off.
  },
  // No `schemaOrg.reactive` override. The module default already enables
  // client-side reactivity in dev for in-browser debugging, while forcing
  // it in production would ship the schema-org resolver to every client
  // and defeat tree-shaking. Crawlers only read the SSR JSON-LD anyway,
  // and locale switches are full route navigations under strategy
  // 'prefix', which re-render the graph server-side per locale.
  // Person identity is registered in app/app.vue via `useSchemaOrg`. Defining
  // it here would bake `process.env.NUXT_SITE_URL` at build time (failing
  // silently when the env is missing on Vercel preview deploys) and would not
  // pick up the per-locale description from nuxt-site-config.
  // https://nuxtseo.com/docs/schema-org/guides/setup-identity
  scripts: {
    defaultScriptOptions: {
      bundle: true,
    },
    // Only register Google Analytics when a measurement ID is configured.
    // Without this gate, @nuxt/scripts still emits a preload for
    // `gtag/js?id` with an empty ID and loads a broken script in
    // environments where NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID is unset
    // (it is marked optional in .env.schema).
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
    // Verified against node_modules/nuxt-security/dist/defaultConfig.mjs (v2.6.0).
    //
    // Base defaults (active regardless of `strict`):
    //   * crossOriginResourcePolicy: 'same-origin'
    //   * crossOriginOpenerPolicy: 'same-origin'
    //   * crossOriginEmbedderPolicy: 'credentialless' in prod, 'unsafe-none' in dev
    //   * referrerPolicy: 'no-referrer' (overridden below for analytics)
    //   * nonce: true, sri: true
    //   * removeLoggers: true (overridden below to be prod-only)
    //   * ssg.hashStyles: false (docs-recommended for inline-style apps)
    //
    // `strict: true` upgrades:
    //   * crossOriginEmbedderPolicy: 'require-corp' in prod, 'unsafe-none' in dev
    //     (overridden below to 'credentialless' for cross-origin compatibility)
    //   * strictTransportSecurity: { maxAge: 31536000, includeSubdomains, preload }
    //   * xFrameOptions: 'DENY' (base default is 'SAMEORIGIN')
    //   * permissionsPolicy: 19 directives `'[]'` EXCEPT `sync-xhr: ['self']`
    //     (overridden below to `[]`)
    //   * ssg.hashStyles: true (overridden below to `false` for motion-v)
    //   * locked-down CSP (overridden below).
    //
    // Top-level options only declare deviations from the defaults above.
    // The CSP and permissions-policy blocks, however, re-declare every
    // directive, because nuxt-security merges arrays via `defuReplaceArray`
    // (node_modules/nuxt-security/dist/utils/merge.mjs), so a user value
    // for a directive REPLACES the default array entirely. Making each
    // directive explicit prevents silent drift if an upstream strict-mode
    // default changes a value our app implicitly relied on.
    // https://nuxt-security.vercel.app/getting-started/configuration
    strict: true,
    csrf: true,
    // Strip `console.*` only in production so debug logs survive HMR.
    // Base default is `true` in every environment.
    removeLoggers: process.env.NODE_ENV === 'production',
    // Log CSP violations without enforcing them on Vercel preview deploys so
    // we can verify new third-party scripts before promoting to production.
    // Dev and prod enforce normally. `VERCEL_ENV` is only set on Vercel.
    // https://nuxt-security.vercel.app/headers/csp#report-only
    contentSecurityPolicyReportOnly: process.env.VERCEL_ENV === 'preview',
    ssg: {
      // motion-v and lazy-hydrated styles can't carry per-request nonces,
      // so we keep style-src 'unsafe-inline' below and skip the SSG hash
      // generation that strict mode would otherwise turn on.
      hashStyles: false,
    },
    headers: {
      // `require-corp` (from strict mode) breaks Apple MusicKit, the Meticulous
      // iframe, and Google Analytics beacons that don't carry CORP headers.
      // `credentialless` is the non-strict default and is recommended by the
      // nuxt-security docs for "maximum compatibility" with third-party assets.
      // https://nuxt-security.vercel.app/headers/crossOriginEmbedderPolicy
      crossOriginEmbedderPolicy: 'credentialless',
      // Base default is `'no-referrer'` (strictest). Loosening to
      // `'strict-origin-when-cross-origin'` so Vercel Analytics and GA4 can
      // attribute referers on cross-origin navigations. Same-origin
      // navigations still send the full URL, cross-origin navigations send
      // origin-only, and downgrades (https → http) send nothing.
      // https://developer.mozilla.org/docs/Web/HTTP/Headers/Referrer-Policy
      referrerPolicy: 'strict-origin-when-cross-origin',
      contentSecurityPolicy: {
        'base-uri': ['\'none\''],
        // 'self' rather than the OWASP-gold 'none': browsers govern speculative
        // <link rel="prefetch"> / preload hints under default-src (the spec
        // removed the prefetch-src directive), and Nuxt emits those hints in the
        // document head for lazy route chunks and their CSS. With 'none' they
        // are reported/blocked, costing the prefetch perf win even though actual
        // execution succeeds via script-src/style-src. 'self' lets same-origin
        // prefetch resolve while every meaningful sink stays locked by its own
        // explicit directive below (script-src, style-src, img-src, connect-src,
        // object-src 'none', frame-ancestors, form-action, base-uri 'none').
        // https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/prefetch-src
        'default-src': ['\'self\''],
        'connect-src': [
          '\'self\'',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://*.googletagmanager.com',
          'https://*.g.doubleclick.net',
          'https://*.google.com',
          // Meticulous's session recorder calls these origins internally,
          // none are referenced by app code directly. Cognito identity
          // pools issue unauthenticated session credentials, S3 transfer
          // acceleration uploads user-event payloads, and Sentry receives
          // the recorder telemetry, because Meticulous runs on Sentry under
          // the hood. Removing any one breaks the recorder before its
          // snippet finishes bootstrapping. Full list of required origins:
          // https://app.meticulous.ai/docs/session-recording/csp-exceptions
          'https://cognito-identity.us-west-2.amazonaws.com',
          'https://user-events-v3.s3-accelerate.amazonaws.com',
          'https://*.sentry.io',
          // The Sentry SDK that Meticulous loads fetches its own source map
          // from the Sentry CDN, which is a connect-src request. The script
          // itself needs no script-src host entry because 'strict-dynamic'
          // extends trust to it through the nonce'd Meticulous snippet that
          // injects it.
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
          // Apple Music artwork (MusicKit catalog responses)
          'https://*.mzstatic.com',
        ],
        'manifest-src': ['\'self\''],
        'media-src': ['\'self\''],
        'object-src': ['\'none\''],
        // 'self' is retained as a Level 1/2 fallback. 'strict-dynamic'
        // supersedes it in CSP Level 3 browsers, but older browsers ignore
        // 'strict-dynamic' and would otherwise refuse to load lazy chunks.
        // 'wasm-unsafe-eval' is required by @nuxt/content's client-side
        // sqlite-wasm adapter (loaded via `queryContentSqlClientWasm` on
        // pages that hydrate content queries). It scopes the permission to
        // WebAssembly only, so full `unsafe-eval` for JavaScript stays off.
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
        // Disables Google's Topics API for this origin. Not in the
        // strict-mode default (the directive postdates that list), so
        // added here so that analytics-adjacent third parties cannot
        // read browsing-topics signals from page contexts they are
        // loaded into.
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
        'sync-xhr': [],
        'usb': [],
        'web-share': [],
        'xr-spatial-tracking': [],
      },
    },
  },

  seo: {
    // Production-only canonical redirect. Without this gate, Vercel preview
    // deploys at `*.vercel.app` 301 to the canonical `NUXT_SITE_URL`, which
    // breaks preview testing (every navigation bounces off the preview host).
    // The Lighthouse/preview-traffic duplicate-URL concern is moot because
    // Vercel's robots.txt blocks indexing of preview hostnames anyway.
    // https://nuxtseo.com/docs/seo-utils/api/config
    redirectToCanonicalSiteUrl: process.env.VERCEL_ENV === 'production',
    meta: {
      // `titleTemplate` is intentionally NOT set here. nuxt-seo-utils
      // unpacks `seo.meta` through `unpackMeta()`, which only handles
      // `<meta>` tags and silently drops `titleTemplate`. The template
      // lives in `app.head` above instead.
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
    // Collapses the per-locale sitemap_index.xml into a single sitemap.xml.
    // Multi-sitemaps are intended for sites with 10k+ URLs. This site has
    // 4 routes × 4 locales = 16 URLs.
    sitemaps: false,
    // The prerendered unprefixed root is a meta-refresh redirect page and
    // must not be listed. This must be a RegExp: under i18n strategy
    // 'prefix' a string '/' would be expanded per locale and remove every
    // locale home page from the sitemap as well.
    exclude: [/^\/$/],
    // Static `sitemap.xml` prerendered at build time and served by the
    // Vercel CDN. Mirrors `ogImage.zeroRuntime` and shaves around 50 KB
    // (5 KB gzip) off the Nitro bundle. Safe because every URL is
    // statically prerendered and there are no dynamic sitemap sources.
    // https://nuxtseo.com/docs/sitemap/guides/zero-runtime
    zeroRuntime: true,
    // `defaults.lastmod` is intentionally NOT set. Stamping
    // `new Date().toISOString()` at build time is functionally the same
    // anti-pattern as `autoLastmod: true`, because Google distrusts
    // lastmod values that always equal build time. Omitting lastmod is
    // the documented recommendation in the absence of a real per-URL edit
    // timestamp. When per-page edit dates become available (for example,
    // via @nuxt/content frontmatter), prefer per-page lastmod via
    // `definePageMeta({ sitemap: { lastmod } })` (a v8 feature).
    // https://nuxtseo.com/docs/sitemap/guides/best-practices
  },
  // Vercel native Skew Protection is plan-gated (Pro and Enterprise) and
  // only default-on for projects created after late 2024, so it must be
  // verified in the Vercel project settings rather than assumed. The
  // module's intended role here is a proactive update prompt: poll
  // `_nuxt/builds/latest.json` and surface the headless `<SkewNotification>`
  // toast (mounted in `app/layouts/default.vue`).
  // KNOWN LIMITATION: on this fully prerendered site the prompt currently
  // never fires in production. The module suppresses the app-outdated
  // check on prerendered pages (`payload.prerenderedAt`), and the only
  // other trigger requires `bundleAssets`, which is off. Restoring the
  // prompt properly needs `bundleAssets: true` plus a durable storage
  // driver (Upstash Redis on Vercel per the module docs). The alternative
  // is removing the module and relying on Nuxt's built-in chunk-reload
  // recovery (`experimental.emitRouteChunkError: 'automatic'`).
  // https://vercel.com/docs/skew-protection
  // https://nuxtseo.com/skew-protection
  // `multiTab: true` is the module default and is left implicit. The
  // `cookie` block was removed: the module only reads it on the
  // `bundleAssets` code path, so with `bundleAssets: false` it was inert.
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

    // Must name one of the custom breakpoints above. The module default
    // 'lg' belongs to its built-in breakpoint set and does not exist here,
    // which made SSR fall back to an unknown breakpoint when the device
    // could not be detected from the user agent.
    fallbackBreakpoint: 'desktop',
  },
})
