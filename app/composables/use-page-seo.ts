import type { SiteConfigCollectionItem } from '@nuxt/content'

// Duplicated from `server/middleware/site-config.ts`: importing it would
// pull that file's server-only imports into the client bundle.
const LOCALE_PREFIX = /^\/(de|en|fr|it)(?=\/|$)/

interface UsePageSeoOptions {
  /**
   * Emit a `BreadcrumbList` with the home page as the parent. Defaults
   * to `true`. Pass `false` on the home page, where a single-item
   * breadcrumb adds noise without SEO benefit.
   */
  breadcrumb?: boolean
}

/**
 * Descriptions come from `content/config/site.yml`: the top-level
 * `description`, or a `pages.<key>.description` override.
 *
 * The title is deliberately not set here. `app/layouts/default.vue` owns
 * it so scrolling between in-page sections on the home page can rotate
 * it. The title still reaches `defineOgImage`, since an OG image is a
 * per-page artifact rather than a per-section one.
 *
 * `server/middleware/site-config.ts` writes the same description into
 * `useSiteConfig()` for SSR, prerender and the OG image renderer, which
 * has no client JS. This re-derives it for SPA navigation.
 */
export const usePageSeo = async (options: UsePageSeoOptions = {}) => {
  // Plain `.ts` composables get no compiler-inserted async context
  // restoration, so after the awaited query the Nuxt instance is gone on the
  // server and the head and schema-org calls below would throw during SSR.
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
