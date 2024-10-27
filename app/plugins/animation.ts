import type { MaybeElementRef } from "@vueuse/core";
import type { DirectiveBinding } from "vue";

interface AnimationOperations {
  add?: string | string[];
  remove?: string | string[];
  toggle?: string | string[];
  key?: string;
  onEnter?: () => void;
  onViewportChange?: (isInViewport: boolean, element: HTMLElement) => void;
}

interface AnimationState {
  inViewport: boolean;
  wasInViewport: boolean;
}

const animationState = new WeakMap<HTMLElement, AnimationState>();

const toArray = (input?: string | string[]): string[] =>
  Array.isArray(input) ? input : input ? [input] : [];

const updateClasses = (
  element: HTMLElement,
  { add, remove, toggle, onViewportChange, onEnter }: AnimationOperations,
  isInViewport: boolean,
) => {
  const state = animationState.get(element) ?? {
    inViewport: false,
    wasInViewport: false,
  };

  if (isInViewport && !state.wasInViewport) {
    element.classList.add(...toArray(add));
    element.classList.remove(...toArray(remove));
    toArray(toggle).forEach((cls) => element.classList.toggle(cls));
    state.inViewport = true;
    state.wasInViewport = true;
    onEnter?.();
  } else if (!isInViewport) {
    toArray(toggle).forEach((cls) => element.classList.toggle(cls));
    state.inViewport = false;
  }

  animationState.set(element, state);
  onViewportChange?.(isInViewport, element);
};

const createObserver = (
  element: MaybeElementRef,
  options: AnimationOperations,
  rootMargin: string,
) => {
  return useIntersectionObserver(
    element,
    (entries) => {
      for (const entry of entries) {
        const resolvedElement = unref(element) as HTMLElement;
        updateClasses(resolvedElement, options, entry.isIntersecting);
      }
    },
    { threshold: 0.5, rootMargin },
  );
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animation", {
    mounted(
      element: HTMLElement,
      binding: DirectiveBinding<AnimationOperations>,
    ) {
      const { value } = binding;

      let { stop } = createObserver(element, value, "0px 0px -200px 0px");

      const updateObserver = () => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight;
        const rootMargin = isAtBottom
          ? "-100px 0px 0px 0px"
          : "0px 0px -200px 0px";

        stop();
        ({ stop } = createObserver(element, value, rootMargin));
      };

      useEventListener(window, "scroll", updateObserver, { passive: true });

      if (animationState.get(element)?.wasInViewport) {
        element.classList.add(...toArray(value.add));
      }
    },
    updated(
      element: HTMLElement,
      binding: DirectiveBinding<AnimationOperations>,
    ) {
      if (animationState.get(element)?.wasInViewport) {
        const { add, remove, toggle } = binding.value;
        element.classList.add(...toArray(add));
        element.classList.remove(...toArray(remove));
        toArray(toggle).forEach((cls) => element.classList.toggle(cls));
      }
    },
    unmounted(element: HTMLElement) {
      animationState.delete(element);
    },
  });
});
