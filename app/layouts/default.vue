<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import type { InfoBannerType } from '#shared/types/components/info-banner'
import FooterCompact from '~/components/common/Footer/Compact.vue'
import FooterPre from '~/components/common/Footer/Pre.vue'

const { state } = useNavbar()
const { randomDevColor } = useColor()
const route = useRoute()
const { currentSection } = useSection()
const { currentRoute } = useNavbar()
const { locale, tm } = useI18n()
const { y, isScrolling } = useScroll(window)
const error = useError()
const config = useRuntimeConfig()

const isHidden = ref(state.value.hidden)
const isAutoHiding = ref(state.value.autoHide)

const rotatingBannerElement = ref<HTMLElement | undefined>(undefined)
const { height: rotatingBannerHeight } = useElementSize(rotatingBannerElement)
const hideNavbarTimeout = ref<NodeJS.Timeout | null>(null)

const items = computed<InfoBannerType['items']>(() =>
  tm('components.common.InfoBanner'),
)

const faviconColor = randomDevColor.value?.hex
const faviconGraphicData = ref<string | undefined>(undefined)

const fetchSvgContent = async () => {
  const response = await fetch('/img/dev/favicon-dev.svg')
  const svgContent = await response.text()
  faviconGraphicData.value = `data:image/svg+xml,${encodeURIComponent(
    svgContent.replace('#color', `#${faviconColor}`),
  )}`
}

onMounted(async () => {
  await fetchSvgContent()
})

const resetHideNavbarTimer = () => {
  if (hideNavbarTimeout.value) {
    clearTimeout(hideNavbarTimeout.value)
  }

  if (!isAutoHiding.value) return

  hideNavbarTimeout.value = setTimeout(() => {
    if (!isScrolling.value && y.value > rotatingBannerHeight.value) {
      isHidden.value = true
    }
  }, state.value.autoHideDelay)
}

watch([y, isScrolling], ([yNew, isScrollingNew], [yOld]) => {
  if (!isAutoHiding.value) {
    isHidden.value = false
    return
  }

  const isScrollingDown = yNew > yOld

  if (isScrollingNew && yNew > rotatingBannerHeight.value) {
    if (isScrollingDown) {
      isHidden.value = true
      if (hideNavbarTimeout.value) {
        clearTimeout(hideNavbarTimeout.value)
      }
    }
    else {
      isHidden.value = false
    }
  }

  if (!isScrollingNew) {
    resetHideNavbarTimer()
  }
})

watch(() => route.path, resetHideNavbarTimer)

onBeforeUnmount(() => {
  if (hideNavbarTimeout.value) {
    clearTimeout(hideNavbarTimeout.value)
  }
})

watchEffect(() => {
  useHead({
    htmlAttrs: { lang: locale.value },
    titleTemplate:
      currentSection.value?.name || currentRoute.value?.label
        ? 'JR %separator %s'
        : '%siteName',
    title: currentSection.value?.name || currentRoute.value?.label,
  })

  if (config.public.appEnvironment !== 'development') return

  useHead({
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: faviconGraphicData.value,
      },
      {
        rel: 'apple-touch-icon',
        href: `/img/dev/favicon-dev-${randomDevColor.value?.name}.png`,
      },
    ],
  })
})

const errorConfig = {
  header: false,
  nav: false,
  ribbon: false,
  footerPre: false,
  footerCompact: true,
}

const shouldShow = (component: string) =>
  error.value
    ? errorConfig[component as keyof typeof errorConfig]
    : route.meta[component]

const footerClass = computed(() => ({
  'footer-full': shouldShow('footerPre'),
  'footer-compact': shouldShow('footerCompact'),
}))

const footerComponent = computed(() =>
  shouldShow('footerPre') ? FooterPre : FooterCompact,
)
</script>

<template>
  <div :id="currentRoute?.id">
    <SpeedInsights />
    <header
      v-if="shouldShow('header')"
      :class="{ 'hide-localnav': isHidden }"
    >
      <NavBar v-if="shouldShow('nav')" />
      <div
        v-if="shouldShow('ribbon')"
        ref="rotatingBannerElement"
      >
        <InfoBanner :items="items" />
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer :class="footerClass">
      <component :is="footerComponent" />
    </footer>
    <!-- <FooterItem /> -->
    <EasterEggAscii />
  </div>
</template>

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
