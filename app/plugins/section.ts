export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("section", (element, binding) => {
    const { width } = useWindowSize();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) return;
          useSection().setCurrentSection(
            element.getAttribute("id"),
            element.getAttribute("name"),
            binding.value,
          );
        }
      },
      {
        rootMargin: `-${width.value < 1281 ? 48 : 52}px 0px -95% 0px`,
      },
    );
    observer.observe(element);
  });
});
