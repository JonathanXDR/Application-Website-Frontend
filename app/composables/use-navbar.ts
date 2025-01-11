import type { NavbarType } from '#shared/types/common/nav-bar'
import type { SectionType } from '#shared/types/common/section'

interface NavbarState extends NavbarType {
  isOpen: boolean
  isHidden: boolean
  isTransitioning: boolean
}

const state = reactive<NavbarState>({
  autoHide: false,
  autoHideDelay: 2000,
  border: true,
  extensionAttached: false,
  scrim: true,
  position: 'fixed',
  isOpen: false,
  isHidden: false,
  isTransitioning: false,
})

export const useNavbar = () => {
  const setState = (newState: Partial<NavbarType>) => {
    Object.assign(state, newState)
  }

  const route = useRoute()
  const { tm } = useI18n()

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
    state: computed(() => state),
    setState,
    navItems,
    pageTitle,
  }
}
