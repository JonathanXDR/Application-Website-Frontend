import type { NavigationCollectionItem } from '@nuxt/content'

export const useNavbar = () => {
  const route = useRoute()
  const localePath = useLocalePath()

  const navProps = useState<NavbarType>('navbar-props')
  const navData = useState<NavigationCollectionItem | null>('navbar-data')

  const navItems = computed<SectionType[]>(() => navData.value?.items ?? [])

  const isCurrentRoute = (routePath?: string): boolean => {
    if (!routePath) return false
    // Resolve to the current locale's URL (`/` becomes `/de/` under
    // `strategy: 'prefix'`) before comparing against `route.path`. The
    // `{ path }` object form is typed for runtime path strings via
    // `RouteLocationI18nGenericPath`, so no cast is needed. The same
    // comparison runs in `NavBar.vue` `isCurrent`.
    const resolved = localePath({ path: routePath })
    return routePath === '/'
      ? route.path === resolved
      : route.path.startsWith(resolved)
  }

  const currentRoute = computed<SectionType | undefined>(() =>
    navItems.value.find(item => isCurrentRoute(item.route)),
  )

  // Localized root breadcrumb label, taken from the navbar's `overview`
  // item. schema-org does not translate breadcrumb labels, so the
  // `BreadcrumbList` JSON-LD would otherwise emit a hardcoded English
  // "Home" on every non-English locale.
  // https://nuxtseo.com/docs/schema-org/api/define-breadcrumb
  const homeLabel = computed<string>(
    () => navItems.value.find(item => item.id === 'overview')?.label ?? '',
  )

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
