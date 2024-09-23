<template>
  <div>
    <SpeedInsights />
    <header
      v-if="shouldShow('header')"
      :class="[{
        'hide-localnav': y > ribbonBarHeight && shouldHideNavbar,
      }]"
    >
      <NavBarV2
        v-if="shouldShow('nav')"
        :border="y < ribbonBarHeight"
      />
      <div
        v-if="shouldShow('ribbon')"
        ref="ribbonBarElement"
      >
        <RibbonBar
          :loading="false"
          :items="items"
        />
      </div>
    </header>
    <main>
      <slot />
    </main>
    <footer :class="footerClass">
      <component :is="footerComponent" />
    </footer>
    <EasterEggAscii />
  </div>
</template>

<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import FooterCompact from '~/components/common/Footer/Compact.vue'
import FooterFull from '~/components/common/Footer/Full.vue'
import type { RibbonBar } from '~/types/common/ribbon-bar'

const { randomDevColor } = useColor()
const route = useRoute()
const { currentSection } = useSection()
const { locale, tm } = useI18n()
const { y, isScrolling, arrivedState, directions } = useScroll(window)
const error = useError()
const config = useRuntimeConfig()

const ribbonBarElement = ref<HTMLElement | undefined>(undefined)
const { height: ribbonBarHeight } = useElementSize(ribbonBarElement)
const lastScrollY = ref(0)
const shouldHideNavbar = ref(false)

const items = computed<RibbonBar['items']>(() =>
  tm('components.common.RibbonBar')
)

const faviconColor = randomDevColor.value?.hex
const faviconGraphicData = ref('')

const fetchSvgContent = async () => {
  const response = await fetch('/img/dev/favicon-dev.svg')
  const svgContent = await response.text()
  faviconGraphicData.value = `data:image/svg+xml,${encodeURIComponent(
    svgContent.replace('#color', `#${faviconColor}`)
  )}`
}

onMounted(async () => {
  await fetchSvgContent()
})

watch([y, isScrolling], ([yNew, isScrollingNew]) => {
  if (!isScrollingNew) return

  shouldHideNavbar.value = yNew > lastScrollY.value
  lastScrollY.value = yNew
})

watchEffect(() => {
  useHead({
    htmlAttrs: { lang: locale.value },
    titleTemplate: currentSection.value.name ? 'JR %separator %s' : '%siteName',
    title: currentSection.value.name,
  })

  if (config.public.appEnvironment !== 'development') return

  useHead({
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: faviconGraphicData.value },
      {
        rel: 'apple-touch-icon',
        href: `/img/dev/favicon-dev-${randomDevColor.value?.name}.png`,
      },
    ],
    meta: [
      {
        property: 'twitter:image',
        content: `/img/dev/favicon-dev-${randomDevColor.value?.name}.png`,
      },
      {
        property: 'og:image',
        content: `/img/dev/favicon-dev-${randomDevColor.value?.name}.png`,
      },
    ],
  })
})

const errorConfig = {
  header: false,
  nav: false,
  ribbon: false,
  footerFull: false,
  footerCompact: true,
}

const shouldShow = (component: string) =>
  error.value
    ? errorConfig[component as keyof typeof errorConfig]
    : route.meta[component]

const footerClass = computed(() => ({
  'footer-full': shouldShow('footerFull'),
  'footer-compact': shouldShow('footerCompact'),
}))

const footerComponent = computed(() =>
  shouldShow('footerFull') ? FooterFull : FooterCompact
)
</script>

<style>
.footer-compact {
  text-align: center;
}

.footer-full {
  width: 90%;
  margin: 100px auto 0 auto;
  border-top: 1px solid var(--color-fill-gray-tertiary);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

@media screen and (min-width: 768px) {
  .footer-full {
    width: 82.5%;
    flex-direction: row !important;
  }
}
</style>
