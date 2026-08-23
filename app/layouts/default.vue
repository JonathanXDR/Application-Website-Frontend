<script setup lang="ts">
import type {
  InfoBannerCollectionItem,
  NavigationCollectionItem,
  SkewNotificationCollectionItem,
} from '@nuxt/content'
import FooterPre from '~/components/Footer/Pre.vue'
import { AnimatePresence, Motion } from 'motion-v'

// Page chrome is passed in as real layout props rather than read back out of
// `route.meta`. Pages get these defaults for free and say nothing. A page that
// wants different chrome overrides them with
// `definePageMeta({ layout: { props: { ... } } })`, and `app/error.vue` passes
// them as attributes on its own `<NuxtLayout>` (which merges `attrs` and
// `route.meta.layoutProps` into the layout component).
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

// The three queries are independent, so they run in parallel. This
// layout wraps every page, which makes it the hottest SSR path in the
// app, and serializing the queries added avoidable latency per render.
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

// Mirror the navbar content into the shared `useNavbar` state so every
// component using the composable sees the same data without re-querying.
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
    // Dev-only favicon. If the asset is missing or the fetch fails, leave
    // `faviconGraphicData` undefined so the head guard omits the icon.
  }
}

onMounted(async () => {
  // The recolored dev favicon is only consumed under the
  // `appEnvironment === 'development'` head block below, so skip the fetch
  // entirely in production instead of fetching and discarding the result.
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

// Reset the active section on navigation. This lives here rather than in
// `useSection()` because the composable is also called from the `v-section`
// IntersectionObserver callback outside component scope, where a watcher
// would leak. The layout is instantiated exactly once.
watch(
  () => route.path,
  () => {
    currentSection.value = undefined
  },
)

// Sub-section titles update reactively as the user scrolls between
// in-page anchors (`#about`, `#languages`, and so on) on the home page.
// The per-page title (`currentRoute.label`) is the fallback when no
// section is active. The `JR %separator %s` template lives in
// `nuxt.config.ts` under `app.head.titleTemplate`, so it is SSR-baked
// instead of being injected client-side from this layout.
const pageTitle = computed(
  () => currentSection.value?.name || currentRoute.value?.label,
)

// Yield the title to `error.vue` while an error is active. Without the
// guard, 404s under an existing route prefix rendered the layout title
// instead of the localized error title.
useSeoMeta({ title: () => (error.value ? undefined : pageTitle.value) })

if (config.public.appEnvironment === 'development') {
  // The `key` values match the static dev icons declared in
  // `nuxt.config.ts` under `$development.app.head.link`, so these
  // entries replace those instead of rendering duplicate tags. The SVG
  // icon is emitted only once its recolored data URL has been fetched.
  // Otherwise SSR would render a `rel="icon"` tag with an empty `href`.
  // Unhead drops entries that resolve to a falsy value, which is why the
  // `false` branch is valid. Do not convert the ternary into a
  // conditional spread: TypeScript does not extend contextual typing
  // through spread operands, so `rel` would widen to string and fall out
  // of unhead v3's per-rel link union.
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
