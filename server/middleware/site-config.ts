import { queryCollection } from '@nuxt/content/server'
import { updateSiteConfig } from '#site-config/server/composables'

// Matches the `strategy: 'prefix'` locale prefix. Non-page requests
// (assets, `/api`, `/__nuxt_*`, `sitemap.xml`, `robots.txt`) never match
// this pattern, so they are skipped without further work.
const LOCALE_PREFIX = /^\/(de|en|fr|it)(?=\/|$)/

export default defineEventHandler(async (event) => {
  const path = event.path?.split('?')[0]
  const locale = path?.match(LOCALE_PREFIX)?.[1]
  if (!path || !locale) return

  // Skip non-page requests that carry a locale prefix, such as
  // /de/_payload.json from client-side navigations. They never render
  // head tags, so the site-config description query would be wasted.
  if (path.includes('.')) return

  // Force the `@nuxt/content` fork to load the right locale variant of
  // the i18n-enabled `siteConfig` collection. The explicit `.locale()`
  // call is required: the fork's automatic locale detection does not see
  // the request locale at this point in the middleware lifecycle, which
  // previously baked the German description into every locale's site
  // config. `event.context.nuxtI18n` is still seeded for any downstream
  // consumer that relies on it.
  event.context.nuxtI18n = {
    ...event.context.nuxtI18n,
    locale,
  }

  const siteContent = await queryCollection(event, 'siteConfig')
    .locale(locale, { fallback: 'de' })
    .stem('site')
    .first()

  if (!siteContent) return

  // Map the request path to a `pages.<key>.description` lookup key.
  // `/de/projects/` becomes `projects`, `/de/` becomes `''` (no entry
  // in `pages`, which falls back to the top-level description).
  const pageKey = path.replace(LOCALE_PREFIX, '').replace(/^\/|\/$/g, '')
  const description
    = (pageKey && siteContent.pages?.[pageKey]?.description)
      || siteContent.description

  if (description) {
    updateSiteConfig(event, { description })
  }
})
