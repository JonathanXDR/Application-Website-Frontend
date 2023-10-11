import { defaultLocale, fallbackLocale, languages } from '@/assets/lang/index'
import useSectionStore from '@/stores/navbarSections'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createMetaManager } from 'vue-meta'
import App from './App.vue'
import './assets/main.css'
import router from './router'

library.add(fas, fab)

const app = createApp(App)

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: fallbackLocale,
  messages: languages
})

app.use(createPinia())
app.use(createMetaManager())
app.use(i18n)
app.use(router)
app.use(MotionPlugin)

app.component('font-awesome-icon', FontAwesomeIcon)

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

app.directive('section', (el, binding) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          useSectionStore().setCurrentSection(el.id, binding.value)
        }
      })
    },
    {
      rootMargin: '-52px 0px -94% 0px'
    }
  )
  observer.observe(el)
})

export default i18n
app.mount('#app')
