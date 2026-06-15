import { useInView, type UseInViewOptions } from 'motion-v'
import type { DirectiveBinding, EffectScope } from 'vue'

interface AnimationOperations {
  add?: string | string[]
  remove?: string | string[]
  toggle?: string | string[]
  key?: string
  onEnter?: () => void
}

interface AnimationState {
  inViewport: boolean
  wasInViewport: boolean
}

const animationState = new WeakMap<HTMLElement, AnimationState>()
const animationScopes = new WeakMap<HTMLElement, EffectScope>()

const toArray = (input?: string | string[]): string[] =>
  Array.isArray(input) ? input : input ? [input] : []

const updateClasses = (
  element: HTMLElement,
  { add, remove, toggle, onEnter }: AnimationOperations,
  isInViewport: boolean,
) => {
  const state = animationState.get(element) ?? {
    inViewport: false,
    wasInViewport: false,
  }

  if (isInViewport && !state.wasInViewport) {
    element.classList.add(...toArray(add))
    element.classList.remove(...toArray(remove))
    toArray(toggle).forEach(cls => element.classList.toggle(cls))
    state.inViewport = true
    state.wasInViewport = true
    onEnter?.()
  }
  else if (!isInViewport) {
    toArray(toggle).forEach(cls => element.classList.toggle(cls))
    state.inViewport = false
  }

  animationState.set(element, state)
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animation', {
    mounted(
      element: HTMLElement,
      binding: DirectiveBinding<AnimationOperations>,
    ) {
      const { value } = binding
      const elementRef = ref(element)

      // Apply the animation immediately for elements already in the
      // viewport on mount, without adding the hidden state first. This
      // prevents a needless LCP delay.
      const bounds = element.getBoundingClientRect()
      const isInitiallyVisible
        = bounds.top < window.innerHeight && bounds.bottom > 0

      if (!isInitiallyVisible) {
        // Only hide elements that are below the fold.
        element.classList.add(...toArray(value.remove))
      }
      else {
        updateClasses(element, value, true)
      }

      // Directive hooks run outside any component effect scope, so the
      // observer and watcher created below would never be disposed on
      // unmount. An explicit scope lets unmounted stop them.
      const scope = effectScope(true)

      scope.run(() => {
        const isInView = useInView(elementRef, {
          amount: 0.1,
          margin: '0px 0px -10% 0px',
        } as UseInViewOptions)

        watch(
          isInView,
          (inView) => {
            updateClasses(element, value, inView)
          },
          { immediate: !isInitiallyVisible },
        )
      })

      animationScopes.set(element, scope)

      if (!isInitiallyVisible && document.readyState !== 'complete') {
        window.addEventListener(
          'load',
          () => {
            const loadBounds = element.getBoundingClientRect()
            if (loadBounds.top < window.innerHeight && loadBounds.bottom > 0) {
              updateClasses(element, value, true)
            }
          },
          { once: true },
        )
      }

      if (!animationState.get(element)?.wasInViewport) return
      element.classList.add(...toArray(value.add))
    },
    updated(
      element: HTMLElement,
      binding: DirectiveBinding<AnimationOperations>,
    ) {
      if (!animationState.get(element)?.wasInViewport) return
      const { add, remove, toggle } = binding.value
      element.classList.add(...toArray(add))
      element.classList.remove(...toArray(remove))
      toArray(toggle).forEach(cls => element.classList.toggle(cls))
    },
    unmounted(element: HTMLElement) {
      animationScopes.get(element)?.stop()
      animationScopes.delete(element)
      animationState.delete(element)
    },
  })
})
