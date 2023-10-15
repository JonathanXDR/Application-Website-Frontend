import type { App } from 'vue'

export function useAnimationDirective(app: App) {
  app.directive('animation', (el) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting)
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 1,
        rootMargin: '-52px 0px 0px 0px'
      }
    )
    observer.observe(el)
  })
}
