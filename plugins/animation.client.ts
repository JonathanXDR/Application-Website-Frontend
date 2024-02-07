type AnimationOperations = {
  add?: string[];
  remove?: string[];
  toggle?: string[];
  onViewportChange?: (isInViewport: boolean, el: Element) => void;
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animation", {
    mounted(el: Element, binding: { value: AnimationOperations }) {
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          const { add, remove, toggle, onViewportChange } = binding.value;
          const isInViewport = entry.isIntersecting;

          if (isInViewport) {
            add?.forEach((className) => el.classList.add(className));
            remove?.forEach((className) => el.classList.remove(className));
            toggle?.forEach((className) => el.classList.toggle(className));
          }

          onViewportChange?.(isInViewport, el);
        });
      };

      const observerOptions = {
        threshold: 1,
        rootMargin: "-52px 0px 0px 0px",
      };

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      );
      observer.observe(el);
    },
  });
});
