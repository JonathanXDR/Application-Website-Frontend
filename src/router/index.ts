import HomeView from "@/views/HomeView/HomeView.vue";
import NotFoundView from "@/views/NotFoundView/NotFoundView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 46,
        behavior: "smooth",
      };
    }
  },
});

export default router;
