import type { NavbarType } from '#shared/types/common/nav-bar'
import type { SectionType } from '#shared/types/common/section'

export const useNavbar = () => {
  const route = useRoute()
  const { tm } = useI18n()

  const state = useState<NavbarType>('navbarState', () => ({
    autoHide: false,
    autoHideDelay: 2000,
    border: true,
    extensionAttached: false,
    scrim: true,
    position: 'fixed',
    open: false,
    hidden: false,
    transitioning: false,
  }))

  const setState = (updates: Partial<NavbarType>) => {
    Object.assign(state.value, updates)
  }

  const navItems = computed<SectionType[]>(() =>
    tm('components.common.NavBar'),
  )

  const currentRoute = computed(() => {
    return navItems.value.find((item) => {
      if (!item.route) return false
      return route.path === '/'
        ? item.route === '/'
        : item.route !== '/' && route.path.startsWith(item.route)
    })
  })

  return {
    state,
    setState,
    navItems,
    currentRoute,
  }
}
