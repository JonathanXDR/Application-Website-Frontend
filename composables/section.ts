import { useSectionStore } from '@/stores/section'
import type { App } from 'vue'

export function useSectionDirective(app: App) {
  app.directive('section', (el, binding) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            useSectionStore().setCurrentSection(el.getAttribute('name'), binding.value)
          }
        })
      },
      {
        rootMargin: '-52px 0px -94% 0px'
      }
    )
    observer.observe(el)
  })
}
