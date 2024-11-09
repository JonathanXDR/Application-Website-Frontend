import type { NavBarType } from "#shared/types/common/nav-bar";

const state = reactive<NavBarType>({
  autoHide: false,
  border: true,
  scrim: true,
  position: "fixed",
  extensionAttached: false,
});

export const useNavbar = () => {
  const setState = (stateNew: Partial<NavBarType>) => {
    Object.assign(state, stateNew);
  };

  return {
    state: computed(() => state),
    setState,
  };
};
