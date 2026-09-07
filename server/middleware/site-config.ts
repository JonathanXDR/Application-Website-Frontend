import { queryCollection } from '@nuxt/content/server'
import { updateSiteConfig } from '#site-config/server/composables'

// Matches the `strategy: 'prefix'` locale prefix. Assets, `/api`, and
// `/__nuxt_*` never match it, so they are skipped without further work.
const LOCALE_PREFIX = /^\/(de|en|fr|it)(?=\/|$)/

export default defineEventHandler(async (event) => {
  const path = event.path?.split('?')[0]
  const locale = path?.match(LOCALE_PREFIX)?.[1]
  if (!path || !locale) return

  // Skip locale-prefixed non-page requests such as `/de/_payload.json` from
  // client-side navigations. They render no head tags, so the query below
  // would be wasted.
  if (path.includes('.')) return

  // `event.context.nuxtI18n` is seeded only for downstream consumers. The
  // explicit `.locale()` below is what picks the `siteConfig` variant: the
  // `@nuxt/content` fork's automatic detection does not see the request
  // locale this early in the middleware lifecycle, which previously baked the
  // German description into every locale.
  event.context.nuxtI18n = {
    ...event.context.nuxtI18n,
    locale,
  }

  const siteContent = await queryCollection(event, 'siteConfig')
    .locale(locale, { fallback: 'de' })
    .stem('site')
    .first()

  if (!siteContent) return

  // `/de/projects/` becomes the `pages` key `projects`, and `/de/` becomes
  // `''`, which has no entry and falls back to the top-level description.
  const pageKey = path.replace(LOCALE_PREFIX, '').replace(/^\/|\/$/g, '')
  const description
    = (pageKey && siteContent.pages?.[pageKey]?.description)
      || siteContent.description

  if (description) {
    updateSiteConfig(event, { description })
  }
})
