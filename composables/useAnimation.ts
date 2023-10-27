import { ref } from 'vue';

export const useAnimation = () => {
  interface HeaderAnimation {
    element: HTMLElement;
    class: string;
    timeout: number;
  }

  const headerAnimations = ref<HeaderAnimation[]>([]);

  function setHeaderAnimation(headerAnimation: HeaderAnimation) {
    headerAnimations.value.push(headerAnimation);
  }

  return {
    headerAnimations,
    setHeaderAnimation,
  };
};
