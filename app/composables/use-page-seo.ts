import type { SiteConfigCollectionItem } from '@nuxt/content'

// Mirrors the regex in `server/middleware/site-config.ts`. Importing it
// would pull Nitro types across the app and server boundary into the
// client bundle.
const LOCALE_PREFIX = /^\/(de|en|fr|it)(?=\/|$)/

interface UsePageSeoOptions {
  /**
   * Emit a `BreadcrumbList` JSON-LD with the home page as the parent.
   * Defaults to `true`. Pass `false` on the home page itself, where a
   * single-item breadcrumb adds noise without SEO benefit.
   */
  breadcrumb?: boolean
}

/**
 * Centralizes the per-page SEO wiring that all four routes share,
 * sourcing descriptions from `content/config/site.yml` (the top-level
 * `description`, or a per-page `pages.<key>.description` override).
 *
 * Title is intentionally NOT set here. `app/layouts/default.vue` owns it
 * so scrolling between in-page sections on the home page can rotate the
 * title reactively. The page title is still passed to `defineOgImage`,
 * because OG images are a per-page artifact rather than a per-section
 * one.
 *
 * The server middleware (`server/middleware/site-config.ts`) writes the
 * same `pageDescription` into `useSiteConfig()` for SSR and prerender,
 * so search crawlers and the OG image renderer (which has no client JS)
 * see the right value. This composable re-derives it on the client to
 * keep the description in sync during SPA navigation.
 */
export const usePageSeo = async (options: UsePageSeoOptions = {}) => {
  // Plain `.ts` composables get no compiler-inserted async context
  // restoration, unlike a top-level await in `<script setup>`. After the
  // awaited query below the Nuxt instance is gone on the server, so the
  // head and schema-org calls would throw during SSR. Capture the Nuxt
  // instance here and re-enter it via `runWithContext`.
  // https://nuxt.com/docs/4.x/guide/concepts/auto-imports#vue-and-nuxt-composables
  const nuxtApp = useNuxtApp()
  const route = useRoute()
  const { currentRoute, homeLabel, homePath } = useNavbar()
  const { data: siteContent }
    = await useQueryCollection<SiteConfigCollectionItem>('siteConfig')
      .stem('site')
      .first()

  const pageKey = computed(() =>
    route.path.replace(LOCALE_PREFIX, '').replace(/^\/|\/$/g, ''),
  )

  const pageTitle = computed(() => currentRoute.value?.label ?? '')

  const pageDescription = computed(
    () =>
      (pageKey.value
        && siteContent.value?.pages?.[pageKey.value]?.description)
      || siteContent.value?.description
      || '',
  )

  nuxtApp.runWithContext(() => {
    useSeoMeta({ description: () => pageDescription.value })

    // `alt` here emits `og:image:alt` and `twitter:image:alt`.
    defineOgImage(
      'Overview',
      {
        title: pageTitle.value,
        description: pageDescription.value,
      },
      {
        alt: `${pageTitle.value}. ${pageDescription.value}`,
      },
    )

    if (options.breadcrumb ?? true) {
      useSchemaOrg([
        defineBreadcrumb({
          itemListElement: [
            { name: () => homeLabel.value, item: () => homePath.value },
            { name: () => pageTitle.value, item: () => route.path },
          ],
        }),
      ])
    }
  })

  return { pageTitle, pageDescription }
}
