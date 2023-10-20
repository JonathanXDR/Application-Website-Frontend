import ErrorView from '@/views/ErrorView/ErrorView.vue'
import HomeView from '@/views/HomeView/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        footerCompact: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: ErrorView,
      props: {
        name: 'notFound'
      },
      meta: {
        ribbon: false,
        footerFull: false
      }
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 46,
        behavior: 'smooth'
      }
    }
  }
})

export default router
