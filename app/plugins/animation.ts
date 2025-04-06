import { useInView } from 'motion-v'
import type { DirectiveBinding } from 'vue'

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

      const isInView = useInView(elementRef, {
        amount: 0.1,
        margin: '0px 0px -10% 0px',
      })

      watch(
        isInView,
        (inView) => {
          updateClasses(element, value, inView)
        },
        { immediate: true },
      )

      if (document.readyState === 'complete') {
        const bounds = element.getBoundingClientRect()

        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          updateClasses(element, value, true)
        }
      }
      else {
        window.addEventListener(
          'load',
          () => {
            const bounds = element.getBoundingClientRect()
            if (bounds.top < window.innerHeight && bounds.bottom > 0) {
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
      animationState.delete(element)
    },
  })
})
