import { ref } from 'vue';
import type { AnimationItemType } from '~/types/common/AnimationItem';

export const useAnimation = () => {
  const headerAnimations = ref<AnimationItemType[]>([]);

  function setHeaderAnimation(headerAnimation: AnimationItemType) {
    headerAnimations.value.push(headerAnimation);
  }

  return {
    headerAnimations,
    setHeaderAnimation,
  };
};
