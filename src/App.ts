import FooterCompact from '@/components/common/Footer/FooterCompact/FooterCompact.vue'
import FooterFull from '@/components/common/Footer/FooterFull/FooterFull.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import NavBar from '@/components/common/NavBar/NavBar.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import { useColorStore } from '@/stores/color'
import { useSectionStore } from '@/stores/section'
import { defineComponent, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { RouterLink, RouterView, useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    LoadingSpinner,
    NavBar,
    RibbonBar,
    FooterFull,
    FooterCompact
  },
  setup() {
    const route = useRoute()
    const colorStore = useColorStore()
    const sectionStore = useSectionStore()

    const nodeEnv = ref(process.env.NODE_ENV)
    const currentSectionName = ref(sectionStore.state.currentSectionName)
    const colorBadge = ref(colorStore.randomizeColor())

    useMeta({
      htmlAttrs: { lang: 'de', amp: true },
      title: currentSectionName.value
        ? `${currentSectionName.value} | Jonathan Russ`
        : 'Jonathan Russ',
      link:
        nodeEnv.value === 'development'
          ? [
              {
                rel: 'icon',
                type: 'image/svg+xml',
                href: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23${colorBadge.value.colorHex}%22></rect><path fill=%22%23ffffff%22 d=%22M26.30 69.58Q21.90 69.58 18.71 68.09Q15.52 66.61 13.76 63.80L13.76 63.80L19.64 58.20Q22.17 62.27 26.41 62.27L26.41 62.27Q31.58 62.27 32.79 56.27L32.79 56.27L36.47 37.57L23.00 37.57L24.43 30.42L46.76 30.42L41.64 55.83Q40.21 63.20 36.47 66.39Q32.73 69.58 26.30 69.58L26.30 69.58ZM86.25 42.36Q86.25 47.75 83.33 51.59Q80.41 55.45 75.25 57.04L75.25 57.04L81.95 68.92L72.55 68.92L66.50 58.14L58.91 58.14L56.77 68.92L47.80 68.92L55.50 30.42L71.17 30.42Q78.32 30.42 82.28 33.55Q86.25 36.69 86.25 42.36L86.25 42.36ZM67.88 51.05Q72.33 51.05 74.78 49.01Q77.22 46.98 77.22 43.18L77.22 43.18Q77.22 40.43 75.35 39.06Q73.48 37.68 70.02 37.68L70.02 37.68L62.98 37.68L60.28 51.05L67.88 51.05Z%22></path></svg>`
              },
              {
                rel: 'apple-touch-icon',
                href: `@/assets/img/dev/favicon-dev-${colorBadge.value.colorName}.png`
              }
            ]
          : [
              {
                rel: 'icon',
                type: 'image/svg+xml',
                href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23503cff%22></rect><path fill=%22%23ffffff%22 d=%22M26.30 69.58Q21.90 69.58 18.71 68.09Q15.52 66.61 13.76 63.80L13.76 63.80L19.64 58.20Q22.17 62.27 26.41 62.27L26.41 62.27Q31.58 62.27 32.79 56.27L32.79 56.27L36.47 37.57L23.00 37.57L24.43 30.42L46.76 30.42L41.64 55.83Q40.21 63.20 36.47 66.39Q32.73 69.58 26.30 69.58L26.30 69.58ZM86.25 42.36Q86.25 47.75 83.33 51.59Q80.41 55.45 75.25 57.04L75.25 57.04L81.95 68.92L72.55 68.92L66.50 58.14L58.91 58.14L56.77 68.92L47.80 68.92L55.50 30.42L71.17 30.42Q78.32 30.42 82.28 33.55Q86.25 36.69 86.25 42.36L86.25 42.36ZM67.88 51.05Q72.33 51.05 74.78 49.01Q77.22 46.98 77.22 43.18L77.22 43.18Q77.22 40.43 75.35 39.06Q73.48 37.68 70.02 37.68L70.02 37.68L62.98 37.68L60.28 51.05L67.88 51.05Z%22></path></svg>'
              },
              {
                rel: 'apple-touch-icon',
                href: 'img/favicon.png'
              }
            ]
    })

    return {
      route,
      nodeEnv,
      currentSectionName,
      colorBadge
    }
  }
})
