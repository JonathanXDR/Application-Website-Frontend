import { defaultLocale, fallbackLocale, languages } from '@/assets/lang/index'
import { useAnimationDirective } from '@/composables/animation'
import { useSectionDirective } from '@/composables/section'
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

useAnimationDirective(app)
useSectionDirective(app)

export default i18n
app.mount('#app')
