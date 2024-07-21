type AnimationOperations = {
  add?: string | string[];
  remove?: string | string[];
  toggle?: string | string[];
  onViewportChange?: (isInViewport: boolean, el: HTMLElement) => void;
};

const animationState = new WeakMap<
  HTMLElement,
  { inViewport: boolean; wasInViewport: boolean }
>();
const toArray = (input: string | string[] | undefined): string[] => {
  if (Array.isArray(input)) {
    return input;
  } else if (typeof input === "string") {
    return [input];
  } else {
    return [];
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animation", {
    mounted(el: HTMLElement, binding: { value: AnimationOperations }) {
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          const { add, remove, toggle, onViewportChange } = binding.value;
          const isInViewport = entry.isIntersecting;

          if (!animationState.has(el)) {
            animationState.set(el, { inViewport: false, wasInViewport: false });
          }

          const state = animationState.get(el)!;

          if (isInViewport) {
            toArray(add).forEach((className) => el.classList.add(className));
            toArray(remove).forEach((className) =>
              el.classList.remove(className),
            );
            toArray(toggle).forEach((className) => el.classList.add(className));
            state.inViewport = true;
            state.wasInViewport = true;
          } else {
            toArray(toggle).forEach((className) =>
              el.classList.remove(className),
            );
            state.inViewport = false;
          }

          animationState.set(el, state);
          onViewportChange?.(isInViewport, el);
        });
      };

      const createObserver = (rootMargin: string) => {
        return new IntersectionObserver(observerCallback, {
          threshold: 0.5,
          rootMargin: rootMargin,
        });
      };

      let observer = createObserver("0px 0px -200px 0px");
      observer.observe(el);

      const updateObserver = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        const isAtTop = scrollTop === 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight;

        let newRootMargin = "0px 0px -200px 0px";

        if (isAtTop) {
          newRootMargin = "0px 0px -200px 0px";
        } else if (isAtBottom) {
          newRootMargin = "-100px 0px 0px 0px";
        }

        observer.disconnect();
        observer = createObserver(newRootMargin);
        observer.observe(el);
      };

      window.addEventListener("scroll", updateObserver);

      const state = animationState.get(el);
      if (state?.wasInViewport) {
        toArray(binding.value.add).forEach((className) =>
          el.classList.add(className),
        );
      }
    },
    updated(el: HTMLElement, binding: { value: AnimationOperations }) {
      const state = animationState.get(el);
      if (state?.wasInViewport) {
        toArray(binding.value.add).forEach((className) =>
          el.classList.add(className),
        );
        toArray(binding.value.remove).forEach((className) =>
          el.classList.remove(className),
        );
        toArray(binding.value.toggle).forEach((className) =>
          el.classList.add(className),
        );
      }
    },
  });
});
