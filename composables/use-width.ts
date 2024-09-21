import { useWindowSize } from "@vueuse/core";

export default function useWidth() {
  const { width: windowWidthReference } = useWindowSize({ initialWidth: 0 });
  const windowWidth = ref(0);

  onMounted(() => {
    windowWidth.value = windowWidthReference.value;
    watch(windowWidthReference, (newWidth) => {
      windowWidth.value = newWidth;
    });
  });

  return {
    windowWidth,
  };
}
