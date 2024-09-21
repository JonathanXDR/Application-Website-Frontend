import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehaviorType: 'smooth',
  scrollBehavior (to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: window.innerWidth < 1281 ? 48 : 52,
        behavior: 'smooth',
      }
    }
  },
}
