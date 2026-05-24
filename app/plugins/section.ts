const stoppers = new WeakMap<HTMLElement, () => void>()

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, number>('section', {
    mounted(element, binding) {
      const topOffset = window.innerWidth < 1281 ? 48 : 52
      const { stop } = useIntersectionObserver(
        element,
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            useSection().setCurrentSection(
              element.getAttribute('id') ?? '',
              element.getAttribute('name') ?? '',
              binding.value,
            )
          }
        },
        { rootMargin: `-${topOffset}px 0px -95% 0px` },
      )

      stoppers.set(element, stop)
    },
    unmounted(element) {
      stoppers.get(element)?.()
      stoppers.delete(element)
    },
  })
})
