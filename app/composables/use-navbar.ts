import type { SectionType } from '#shared/types/common/section'
import type { NavbarType } from '#shared/types/components/nav-bar'

export const useNavbar = () => {
  const route = useRoute()
  const localePath = useLocalePath()

  const navProps = useState<NavbarType>('navbar-props')
  const navData = useState<Record<string, unknown> | null>('navbar-data')

  const navItems = computed<SectionType[]>(
    () => (navData.value?.items as SectionType[]) || [],
  )

  const isCurrentRoute = (routePath?: string): boolean => {
    if (!routePath) return false
    // Resolve the locale-independent route to the current locale's URL
    // (e.g. '/' → '/de/' under strategy: 'prefix') before comparing against
    // route.path. Mirrors the pattern used in NavBar.vue `isCurrent`.
    // The `{ path } as any` cast is the project's convention to bypass
    // i18n's `typedPages` strict route-name typing for runtime path strings.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolved = localePath({ path: routePath } as any)
    return routePath === '/'
      ? route.path === resolved
      : route.path.startsWith(resolved)
  }

  const currentRoute = computed<SectionType | undefined>(() =>
    navItems.value.find(item => isCurrentRoute(item.route)),
  )

  // Localized label for the root/home breadcrumb. Sourced from the navbar's
  // `overview` item (DE: "Übersicht", EN: "Overview", FR: "Vue d'ensemble",
  // IT: "Panoramica") so the BreadcrumbList JSON-LD never emits a hardcoded
  // English "Home" on non-English locales — schema-org does not auto-
  // translate breadcrumb labels.
  // https://nuxtseo.com/docs/schema-org/api/define-breadcrumb
  const homeLabel = computed<string>(
    () => navItems.value.find(item => item.id === 'overview')?.label ?? '',
  )

  // Locale-resolved root path (e.g. `/de/` under strategy: 'prefix') for
  // use as the BreadcrumbList root `item`. Exposed here so per-page
  // breadcrumb call sites stay clean — only the composable needs the
  // typedPages `as any` workaround.
  const homePath = computed<string>(() =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    localePath({ path: '/' } as any),
  )

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
