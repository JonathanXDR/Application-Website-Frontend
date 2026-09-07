import type { NavigationCollectionItem } from '@nuxt/content'

export const useNavbar = () => {
  const route = useRoute()
  const localePath = useLocalePath()

  const navProps = useState<NavbarType>('navbar-props')
  const navData = useState<NavigationCollectionItem | null>('navbar-data')

  const navItems = computed<SectionType[]>(() => navData.value?.items ?? [])

  const isCurrentRoute = (routePath?: string): boolean => {
    if (!routePath) return false
    // The same comparison runs in `NavBar.vue` as `isCurrent`
    const resolved = localePath({ path: routePath })
    return routePath === '/'
      ? route.path === resolved
      : route.path.startsWith(resolved)
  }

  const currentRoute = computed<SectionType | undefined>(() =>
    navItems.value.find(item => isCurrentRoute(item.route)),
  )

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
