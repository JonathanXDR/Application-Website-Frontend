import type { RouterConfig } from "@nuxt/schema";

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehaviorType: "smooth",
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: window.innerWidth < 1250 ? 48 : 52,
        behavior: "smooth",
      };
    }
  },
};
