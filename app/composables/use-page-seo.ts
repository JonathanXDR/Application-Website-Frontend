import type { SiteConfigCollectionItem } from '@nuxt/content'
// Mirror of the locale prefix regex used in `server/middleware/site-config.ts`.
// Kept literal here rather than imported, because the middleware lives in
// a different layer and importing across the app and server boundary
// would leak Nitro types into the client bundle.
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
 * Centralises the per-page SEO wiring that all four routes share:
 *   - computes `pageTitle` from the navbar's localised label
 *   - computes `pageDescription` from `content/config/site.yml` (top-level
 *     description, or the per-page `pages.<key>.description` override)
 *   - sets `<meta name="description">` via `useSeoMeta`
 *   - registers the `Overview` OG image template
 *   - emits a `BreadcrumbList` JSON-LD for non-home pages
 *
 * Title is intentionally NOT set here. `app/layouts/default.vue` owns it
 * so that scrolling between in-page sections on the home page can rotate
 * the title reactively. The page title (`currentRoute.value?.label`) is
 * still passed to `defineOgImage`, because OG images are a per-page
 * artefact rather than a per-section one.
 *
 * The server middleware (`server/middleware/site-config.ts`) writes the
 * same `pageDescription` into `useSiteConfig()` for SSR and prerender,
 * so search crawlers and the OG image renderer (which has no client JS)
 * see the right value. This composable re-derives it on the client to
 * keep the description in sync during SPA navigation.
 */
export const usePageSeo = async (options: UsePageSeoOptions = {}) => {
  // Plain .ts composables get no compiler-inserted async context
  // restoration, unlike top-level awaits in <script setup>. After the
  // awaited query below, the Nuxt instance is gone on the server and
  // useSeoMeta, defineOgImage, and useSchemaOrg would throw during SSR.
  // Capture the instance here and re-enter it via runWithContext.
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

    // The third argument carries image options. `alt` there emits
    // og:image:alt and twitter:image:alt, which were previously missing.
    defineOgImage(
      'Overview',
      {
        title: pageTitle.value,
        description: pageDescription.value,
      },
      {
        alt: `${pageTitle.value} | ${pageDescription.value}`,
      },
    )

    if (options.breadcrumb ?? true) {
      useSchemaOrg([
        defineBreadcrumb({
          itemListElement: () => [
            { name: homeLabel.value, item: homePath.value },
            { name: pageTitle.value, item: route.path },
          ],
        }),
      ])
    }
  })

  return { pageTitle, pageDescription }
}
