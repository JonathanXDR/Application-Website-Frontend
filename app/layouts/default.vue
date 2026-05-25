<script setup lang="ts">
import type { InfoBannerType } from '#shared/types/components/info-banner'
import FooterPre from '~/components/Footer/Pre.vue'
import { AnimatePresence, Motion } from 'motion-v'

const { navProps, navData } = useNavbar()
const { randomDevColor } = useColor()
const route = useRoute()
const { currentSection } = useSection()
const { currentRoute } = useNavbar()
const { y, isScrolling } = useScroll(() =>
  import.meta.client ? window : null,
)
const error = useError()
const config = useRuntimeConfig()

const { data: navbarContent } = await useQueryCollection('navigation')
  .stem('navbar')
  .first()
const { data: infoBannerContent } = await useQueryCollection('navigation')
  .stem('info-banners')
  .first()
const { data: uiLabels } = await useQueryCollection('siteConfig')
  .stem('ui-labels')
  .first()

// Mirror the navbar content into the shared `useNavbar` state so every
// component using the composable sees the same data without re-querying.
watch(
  navbarContent,
  (val) => {
    navData.value = val as unknown as Record<string, unknown>
  },
  { immediate: true },
)

const rotatingBanner = useTemplateRef('rotatingBanner')
const { height: rotatingBannerHeight } = useElementSize(rotatingBanner)

const items = computed<InfoBannerType['items']>(
  () =>
    ((infoBannerContent.value as unknown as Record<string, unknown>)
      ?.items as InfoBannerType['items']) || [],
)

const { start: scheduleHideNavbar, stop: cancelHideNavbar } = useTimeoutFn(
  () => {
    if (
      !isScrolling.value
      && y.value > rotatingBannerHeight.value
      && navProps.value
    ) {
      navProps.value.hidden = true
    }
  },
  () => navProps.value?.autoHideDelay || 2000,
  { immediate: false },
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
  cancelHideNavbar()
  if (!navProps.value?.autoHide) return
  scheduleHideNavbar()
}

watch([y, isScrolling], ([yNew, isScrollingNew], [yOld]) => {
  if (!navProps.value?.autoHide) {
    if (navProps.value) navProps.value.hidden = false
    return
  }

  const isScrollingDown = yNew > yOld

  if (isScrollingNew && yNew > rotatingBannerHeight.value && navProps.value) {
    if (isScrollingDown) {
      navProps.value.hidden = true
      cancelHideNavbar()
    }
    else {
      navProps.value.hidden = false
    }
  }

  if (!isScrollingNew) {
    resetHideNavbarTimer()
  }
})

watch(() => route.path, resetHideNavbarTimer)

// Sub-section titles update reactively as the user scrolls between
// in-page anchors (`#about`, `#languages`, and so on) on the home page.
// The per-page title (`currentRoute.label`) is the fallback when no
// section is active. The `JR %separator %s` template lives in
// `nuxt.config.ts` under `app.head.titleTemplate`, so it is SSR-baked
// instead of being injected client-side from this layout.
const pageTitle = computed(
  () => currentSection.value?.name || currentRoute.value?.label,
)

useSeoMeta({ title: () => pageTitle.value })

if (config.public.appEnvironment === 'development') {
  useHead({
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: () => faviconGraphicData.value,
      },
      {
        rel: 'apple-touch-icon',
        href: () => `/img/dev/favicon-dev-${randomDevColor.value?.name}.png`,
      },
    ],
  })
}

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
  shouldShow('footerPre') ? FooterPre : resolveComponent('LazyFooterCompact'),
)
</script>

<template>
  <div :id="currentRoute?.id">
    <header
      v-if="shouldShow('header')"
      :class="{ 'hide-localnav': navProps?.hidden }"
    >
      <NavBar v-if="shouldShow('nav')" />
      <div
        v-if="shouldShow('ribbon')"
        ref="rotatingBanner"
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
    <SkewNotification v-slot="{ reload, dismiss, isOpen }">
      <AnimatePresence>
        <Motion
          v-if="isOpen"
          as="div"
          role="status"
          aria-live="polite"
          :initial="{ y: 100, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :exit="{ y: 100, opacity: 0 }"
          :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
          class="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit max-w-md items-center gap-3 rounded-2xl bg-[var(--color-fill-tertiary)] px-4 py-3 ring-1 ring-[var(--color-fill-quaternary)] backdrop-blur-md"
        >
          <span class="text-sm font-medium text-[var(--color-fill-gray)]">
            {{ uiLabels?.skewNotification?.message }}
          </span>
          <button
            type="button"
            class="text-sm font-semibold text-[var(--color-figure-blue)]"
            @click="reload"
          >
            {{ uiLabels?.skewNotification?.reload }}
          </button>
          <button
            type="button"
            class="text-sm text-[var(--color-figure-gray-secondary)]"
            @click="dismiss"
          >
            {{ uiLabels?.skewNotification?.dismiss }}
          </button>
        </Motion>
      </AnimatePresence>
    </SkewNotification>
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
