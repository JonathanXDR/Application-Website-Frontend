<script setup lang="ts">
import type {
  InfoBannerCollectionItem,
  NavigationCollectionItem,
  SkewNotificationCollectionItem,
} from '@nuxt/content'
import FooterPre from '~/components/Footer/Pre.vue'
import { AnimatePresence, Motion } from 'motion-v'

// A page overrides these defaults with
// `definePageMeta({ layout: { props: { ... } } })`, or with attributes on
// its own `<NuxtLayout>` as `app/error.vue` does.
const props = withDefaults(
  defineProps<{
    header?: boolean
    nav?: boolean
    ribbon?: boolean
    footerPre?: boolean
    footerCompact?: boolean
  }>(),
  {
    header: true,
    nav: true,
    ribbon: true,
    footerPre: true,
    footerCompact: false,
  },
)

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

const [
  { data: navbarContent },
  { data: infoBannerContent },
  { data: skewLabels },
] = await Promise.all([
  useQueryCollection<NavigationCollectionItem>('navigation')
    .stem('navbar')
    .first(),
  useQueryCollection<InfoBannerCollectionItem>('infoBanner').first(),
  useQueryCollection<SkewNotificationCollectionItem>(
    'skewNotification',
  ).first(),
])

watch(
  navbarContent,
  (val) => {
    navData.value = val ?? null
  },
  { immediate: true },
)

const rotatingBanner = useTemplateRef('rotatingBanner')
const { height: rotatingBannerHeight } = useElementSize(rotatingBanner)

const items = computed<InfoBannerType['items']>(
  () => infoBannerContent.value?.items ?? [],
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
  try {
    const response = await fetch('/img/dev/favicon-dev.svg')
    if (!response.ok) return
    const svgContent = await response.text()
    faviconGraphicData.value = `data:image/svg+xml,${encodeURIComponent(
      svgContent.replace('#color', `#${faviconColor}`),
    )}`
  }
  catch {
    // Dev-only favicon: undefined makes the head guard omit the icon
  }
}

onMounted(async () => {
  if (config.public.appEnvironment === 'development') {
    await fetchSvgContent()
  }
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

// See `app/composables/use-section.ts` for why this watcher lives here
watch(
  () => route.path,
  () => {
    currentSection.value = undefined
  },
)

const pageTitle = computed(
  () => currentSection.value?.name || currentRoute.value?.label,
)

// Yield the title to `app/error.vue`: without the guard, a 404 under an
// existing route prefix renders the layout title, not the error title.
useSeoMeta({ title: () => (error.value ? undefined : pageTitle.value) })

if (config.public.appEnvironment === 'development') {
  // The `key` values match the dev icons in `nuxt.config.ts` under
  // `$development.app.head.link`, so these entries replace them instead
  // of duplicating them. Unhead drops falsy entries, so the `false`
  // branch keeps SSR from emitting `rel="icon"` with an empty `href`. Do
  // not rewrite the ternary as a conditional spread: TypeScript drops
  // contextual typing through spread operands, so `rel` would widen to
  // string and fall out of unhead v3's per-rel link union.
  useHead({
    link: () => [
      faviconGraphicData.value
        ? {
            key: 'favicon',
            rel: 'icon',
            type: 'image/svg+xml',
            href: faviconGraphicData.value,
          }
        : false,
      {
        key: 'touch-icon',
        rel: 'apple-touch-icon',
        href: `/img/dev/favicon-dev-${randomDevColor.value?.name}.png`,
      },
    ],
  })
}

const footerClass = computed(() => ({
  'footer-full': props.footerPre,
  'footer-compact': props.footerCompact,
}))

const footerComponent = computed(() =>
  props.footerPre ? FooterPre : resolveComponent('LazyFooterCompact'),
)
</script>

<template>
  <div :id="currentRoute?.id">
    <header
      v-if="header"
      :class="{ 'hide-localnav': navProps?.hidden }"
    >
      <NavBar v-if="nav" />
      <div
        v-if="ribbon"
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
            {{ skewLabels?.message }}
          </span>
          <button
            type="button"
            class="text-sm font-semibold text-[var(--color-figure-blue)]"
            @click="reload"
          >
            {{ skewLabels?.reload }}
          </button>
          <button
            type="button"
            class="text-sm text-[var(--color-figure-gray-secondary)]"
            @click="dismiss"
          >
            {{ skewLabels?.dismiss }}
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
