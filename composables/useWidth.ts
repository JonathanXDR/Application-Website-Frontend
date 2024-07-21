import { useWindowSize } from "@vueuse/core";

export default function useWidth() {
  const { width: windowWidthRef } = useWindowSize({ initialWidth: 0 });
  const windowWidth = ref(0);

  onMounted(() => {
    windowWidth.value = windowWidthRef.value;
    watch(windowWidthRef, (newWidth) => {
      windowWidth.value = newWidth;
    });
  });

  return {
    windowWidth,
  };
}
