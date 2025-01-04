import type { NavbarType } from '#shared/types/common/nav-bar'
import type { SectionType } from '#shared/types/common/section'

const state = reactive<NavbarType>({})

export const useNavbar = () => {
  const setState = (stateNew: Partial<NavbarType>) => {
    Object.assign(state, stateNew)
  }

  const route = useRoute()
  const { tm } = useI18n()

  const navItems = computed<SectionType[]>(() =>
    tm('components.common.NavBar'),
  )
  const pageTitle = computed(() => {
    const currentNavItem = navItems.value.find((item) => {
      if (item.route === '/') return false
      return route.path.startsWith(item.route)
    })
    return currentNavItem?.label
  })

  return {
    state: computed(() => state),
    setState,
    navItems,
    pageTitle,
  }
}
