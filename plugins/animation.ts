type AnimationOperations = {
  add?: string | string[];
  remove?: string | string[];
  toggle?: string | string[];
  onViewportChange?: (isInViewport: boolean, el: HTMLElement) => void;
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animation", {
    mounted(el: HTMLElement, binding: { value: AnimationOperations }) {
      const toArray = (input: string | string[] | undefined): string[] => {
        if (Array.isArray(input)) {
          return input;
        } else if (typeof input === "string") {
          return [input];
        } else {
          return [];
        }
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          const { add, remove, toggle, onViewportChange } = binding.value;
          const isInViewport = entry.isIntersecting;

          if (isInViewport) {
            toArray(add).forEach((className) => el.classList.add(className));
            toArray(remove).forEach((className) =>
              el.classList.remove(className),
            );
            toArray(toggle).forEach((className) => el.classList.add(className));
          } else {
            toArray(toggle).forEach((className) =>
              el.classList.remove(className),
            );
          }

          onViewportChange?.(isInViewport, el);
        });
      };

      const observerOptions = {
        threshold: 0.5,
        rootMargin: "-100px 0px -200px 0px",
      };

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions,
      );
      observer.observe(el);
    },
  });
});
