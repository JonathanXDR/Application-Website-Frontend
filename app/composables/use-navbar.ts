import type { SectionType } from '#shared/types/common/section'
import type { NavbarType } from '#shared/types/components/nav-bar'

const DEFAULT_NAVBAR_STATE: NavbarType = {
  autoHide: false,
  autoHideDelay: 2000,
  border: true,
  extensionAttached: false,
  scrim: true,
  position: 'fixed',
  open: false,
  hidden: false,
  transitioning: false,
}

export const useNavbar = () => {
  const route = useRoute()
  const { tm } = useI18n()

  const state = useState<NavbarType>('navbarState', () => ({
    ...DEFAULT_NAVBAR_STATE,
  }))

  const setState = (updates: Partial<NavbarType>): void => {
    state.value = { ...state.value, ...updates }
  }

  const navItems = computed<SectionType[]>(() =>
    tm('components.common.NavBar'),
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
    state,
    setState,
    navItems,
    currentRoute,
    isCurrentRoute,
  }
}
