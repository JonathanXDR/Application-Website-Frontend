import type { NavbarType } from '#shared/types/common/nav-bar'
import type { SectionType } from '#shared/types/common/section'

const state = reactive<NavbarType>({})

export const useNavbar = () => {
  const setState = (newState: Partial<NavbarType>) =>
    Object.assign(state, newState)

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
