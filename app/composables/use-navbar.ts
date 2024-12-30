import type { NavbarType } from '#shared/types/common/nav-bar'

const state = reactive<NavbarType>({
  autoHide: false,
  border: true,
  scrim: true,
  position: 'fixed',
  extensionAttached: false,
})

export const useNavbar = () => {
  const setState = (stateNew: Partial<NavbarType>) => {
    Object.assign(state, stateNew)
    if (stateNew.extensionAttached !== undefined) {
      const triggerPoint = stateNew.extensionAttached
        ? stateNew.extensionAttached
        : state.extensionAttached
      state.extensionAttached = triggerPoint
    }
  }

  return {
    state: computed(() => state),
    setState,
  }
}
