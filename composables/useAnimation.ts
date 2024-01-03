import { ref } from "vue";

export const useAnimation = () => {
  const headerAnimations = ref<
    {
      element: HTMLElement;
      class: string;
      timeout: number;
    }[]
  >([]);

  function setHeaderAnimation(headerAnimation: {
    element: HTMLElement;
    class: string;
    timeout: number;
  }) {
    headerAnimations.value.push(headerAnimation);
  }

  return {
    headerAnimations,
    setHeaderAnimation,
  };
};
