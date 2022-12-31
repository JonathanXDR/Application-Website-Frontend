import { defineStore } from 'pinia';

export const useAnimationStore = defineStore({
  id: 'headerAnimations',
  state: () => ({
    headerAnimations: [] as Array<{
      element: HTMLElement;
      class: string;
      timeout: number;
    }>,
  }),
  actions: {
    setHeaderAnimation(headerAnimation: {
      element: HTMLElement;
      class: string;
      timeout: number;
    }) {
      this.headerAnimations.push(headerAnimation);
    },
  },
});

export default useAnimationStore;
