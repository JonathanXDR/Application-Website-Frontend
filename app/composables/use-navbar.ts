import type { NavbarType } from '#shared/types/common/nav-bar'
import type { SectionType } from '#shared/types/common/section'

export const useNavbar = () => {
  const route = useRoute()
  const { tm } = useI18n()

  const navState = useState<NavbarType>('navbarState', () => ({
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

  const navItems = computed<SectionType[]>(() =>
    tm('components.common.NavBar'),
  )

  const pageTitle = computed(() => {
    return navItems.value.find((item) => {
      return route.path === '/'
        ? item.route === '/'
        : item.route !== '/' && route.path.startsWith(item.route)
    })?.label
  })

  return {
    navState,
    navItems,
    pageTitle,
  }
}
