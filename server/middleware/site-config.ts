import { queryCollection } from '@nuxt/content/server'
import { updateSiteConfig } from '#site-config/server/composables'

// Matches the `strategy: 'prefix'` locale prefix. Non-page requests
// (assets, `/api`, `/__nuxt_*`, `sitemap.xml`, `robots.txt`) never match
// this pattern, so they are skipped without further work.
const LOCALE_PREFIX = /^\/(de|en|fr|it)(?=\/|$)/

export default defineEventHandler(async (event) => {
  const path = event.path?.split('?')[0]
  const localeMatch = path?.match(LOCALE_PREFIX)
  if (!path || !localeMatch) return

  // Force the `@nuxt/content` fork to load the right locale variant of
  // the i18n-enabled `siteConfig` collection. `event.context.nuxtI18n`
  // is not populated yet at this point in the request lifecycle, so it
  // is seeded from the URL here.
  event.context.nuxtI18n = {
    ...event.context.nuxtI18n,
    locale: localeMatch[1],
  }

  const siteContent = await queryCollection(event, 'siteConfig')
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
