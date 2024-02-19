import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default {
  scrollBehaviorType: 'smooth',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition !== null && savedPosition !== undefined) {
      return savedPosition
    }

    if (to.hash !== '') {
      return {
        el: to.hash,
        top: window.innerWidth < 1250 ? 48 : 52,
        behavior: 'smooth'
      }
    }
  }
} satisfies RouterConfig
