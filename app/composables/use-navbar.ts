import type { SectionType } from '#shared/types/common/section'
import type { NavbarType } from '#shared/types/components/nav-bar'

export const useNavbar = () => {
  const route = useRoute()

  const navProps = useState<NavbarType>('navbar-props')
  const navData = useState<Record<string, unknown> | null>('navbar-data')

  const navItems = computed<SectionType[]>(
    () => (navData.value?.items as SectionType[]) || [],
  )

  const isCurrentRoute = (routePath?: string): boolean => {
    if (!routePath) return false
    return route.path === '/'
      ? routePath === '/'
      : routePath !== '/' && route.path.startsWith(routePath)
  }

  const currentRoute = computed<SectionType | undefined>(() =>
    navItems.value.find(item => isCurrentRoute(item.route)),
  )

  return {
    navProps,
    navItems,
    navData,
    currentRoute,
    isCurrentRoute,
  }
}
