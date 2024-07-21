import type { DirectiveBinding } from "vue";

interface AnimationOperations {
  add?: string | string[];
  remove?: string | string[];
  toggle?: string | string[];
  onViewportChange?: (isInViewport: boolean, el: HTMLElement) => void;
}

interface AnimationState {
  inViewport: boolean;
  wasInViewport: boolean;
}

const animationState = new WeakMap<HTMLElement, AnimationState>();

const toArray = (input?: string | string[]): string[] =>
  Array.isArray(input) ? input : input ? [input] : [];

const updateClasses = (
  el: HTMLElement,
  { add, remove, toggle, onViewportChange }: AnimationOperations,
  isInViewport: boolean,
) => {
  const state = animationState.get(el) ?? {
    inViewport: false,
    wasInViewport: false,
  };

  if (isInViewport) {
    toArray(add).forEach((className) => el.classList.add(className));
    toArray(remove).forEach((className) => el.classList.remove(className));
    toArray(toggle).forEach((className) => el.classList.toggle(className));
    state.inViewport = true;
    state.wasInViewport = true;
  } else {
    toArray(toggle).forEach((className) => el.classList.toggle(className));
    state.inViewport = false;
  }

  animationState.set(el, state);
  onViewportChange?.(isInViewport, el);
};

const createObserver = (
  el: HTMLElement,
  options: AnimationOperations,
  rootMargin: string,
): IntersectionObserver => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        updateClasses(el, options, entry.isIntersecting),
      );
    },
    { threshold: 0.5, rootMargin },
  );
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animation", {
    mounted(el: HTMLElement, binding: DirectiveBinding<AnimationOperations>) {
      const { value } = binding;
      let observer = createObserver(el, value, "0px 0px -200px 0px");
      observer.observe(el);

      const updateObserver = () => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight;
        const rootMargin = isAtBottom
          ? "-100px 0px 0px 0px"
          : "0px 0px -200px 0px";

        observer.disconnect();
        observer = createObserver(el, value, rootMargin);
        observer.observe(el);
      };

      window.addEventListener("scroll", updateObserver, { passive: true });

      if (animationState.get(el)?.wasInViewport) {
        toArray(value.add).forEach((className) => el.classList.add(className));
      }
    },
    updated(el: HTMLElement, binding: DirectiveBinding<AnimationOperations>) {
      if (animationState.get(el)?.wasInViewport) {
        const { add, remove, toggle } = binding.value;
        toArray(add).forEach((className) => el.classList.add(className));
        toArray(remove).forEach((className) => el.classList.remove(className));
        toArray(toggle).forEach((className) => el.classList.toggle(className));
      }
    },
    unmounted(el: HTMLElement) {
      window.removeEventListener("scroll", () => {});
      animationState.delete(el);
    },
  });
});
