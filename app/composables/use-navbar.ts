import type { NavigationCollectionItem } from '@nuxt/content'

export const useNavbar = () => {
  const route = useRoute()
  const localePath = useLocalePath()

  const navProps = useState<NavbarType>('navbar-props')
  const navData = useState<NavigationCollectionItem | null>('navbar-data')

  const navItems = computed<SectionType[]>(() => navData.value?.items ?? [])

  const isCurrentRoute = (routePath?: string): boolean => {
    if (!routePath) return false
    // Resolve the locale-independent route to the current locale's URL
    // (for example, '/' becomes '/de/' under `strategy: 'prefix'`) before
    // comparing against `route.path`. Mirrors the pattern used in
    // `NavBar.vue` `isCurrent`. The `{ path }` object form is typed for
    // runtime path strings via `RouteLocationI18nGenericPath`, so no cast
    // is needed.
    const resolved = localePath({ path: routePath })
    return routePath === '/'
      ? route.path === resolved
      : route.path.startsWith(resolved)
  }

  const currentRoute = computed<SectionType | undefined>(() =>
    navItems.value.find(item => isCurrentRoute(item.route)),
  )

  // Localised label for the root/home breadcrumb. Sourced from the navbar's
  // `overview` item (DE: "Übersicht", EN: "Overview", FR: "Vue d'ensemble",
  // IT: "Panoramica") so the BreadcrumbList JSON-LD never emits a
  // hardcoded English "Home" on non-English locales, because schema-org
  // does not auto-translate breadcrumb labels.
  // https://nuxtseo.com/docs/schema-org/api/define-breadcrumb
  const homeLabel = computed<string>(
    () => navItems.value.find(item => item.id === 'overview')?.label ?? '',
  )

  // Locale-resolved root path (for example, `/de/` under
  // `strategy: 'prefix'`) for use as the BreadcrumbList root `item`.
  const homePath = computed<string>(() => localePath({ path: '/' }))

  return {
    navProps,
    navItems,
    navData,
    currentRoute,
    homeLabel,
    homePath,
    isCurrentRoute,
  }
}
