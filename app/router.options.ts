import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehaviorType: 'smooth',
  scrollBehavior(to) {
    const { width } = useWindowSize()
    if (!to.hash) return
    return {
      el: to.hash,
      top: width.value < 1281 ? 48 : 52,
      behavior: 'smooth',
    }
  },
}
