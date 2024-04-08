<template>
  <SpeedInsights />
  <header v-if="shouldShow('header')">
    <NavBar v-if="shouldShow('nav')" />
    <RibbonBar v-if="shouldShow('ribbon')" />
  </header>
  <main>
    <slot />
  </main>
  <footer :class="footerClass">
    <component :is="footerComponent" />
  </footer>
</template>

<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import FooterCompact from '~/components/common/Footer/Compact.vue'
import FooterFull from '~/components/common/Footer/Full.vue'
import svgFaviconDev from '~/public/img/dev/favicon-dev.svg?raw'
import svgFavicon from '~/public/img/favicon.svg?raw'

const route = useRoute()
const { colorBadge, randomizeColor } = useColor()
const { currentSection } = useSection()
const { locale } = useI18n()
const error = useError()

onMounted(randomizeColor)

const isDevelopment = ref(process.env.NODE_ENV === 'development')

const pageTitle = computed(() =>
  currentSection.value.name
    ? `JR | ${currentSection.value.name}`
    : 'Jonathan Russ'
)

const description = ref(
  'Discover the work of Jonathan Russ and learn more about him, including his projects at Swisscom.'
)

const faviconGraphic = computed(() =>
  isDevelopment.value ? svgFaviconDev : svgFavicon
)

const faviconImage = computed(
  () =>
    `/img/${
      isDevelopment.value
        ? `dev/favicon-dev-${colorBadge.value?.colorName}.png`
        : 'favicon.png'
    }`
)

watchEffect(() => {
  const faviconColor = colorBadge.value?.colorHex ?? '000000'
  const faviconGraphicData = `data:image/svg+xml,${encodeURIComponent(
    faviconGraphic.value.replace('#color', `#${faviconColor}`)
  )}`

  useHead({
    htmlAttrs: { lang: locale.value },
    title: pageTitle,
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: faviconGraphicData },
      { rel: 'apple-touch-icon', href: faviconImage.value }
    ],
    meta: [
      { property: 'twitter:image', content: faviconImage.value },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:title', content: pageTitle.value },
      { property: 'twitter:description', content: description.value },
      { property: 'og:image', content: faviconImage.value },
      { property: 'og:title', content: pageTitle.value },
      { property: 'og:description', content: description.value },
      { property: 'og:url', content: 'https://jonathan-russ.com/en' },
      { name: 'description', content: description.value }
    ],
    script: [
      {
        src: 'https://js-cdn.music.apple.com/musickit/v1/musickit.js',
        async: true
      }
    ]
  })
})

const errorConfig = {
  header: false,
  nav: false,
  ribbon: false,
  footerFull: false,
  footerCompact: true
}

const shouldShow = (component: string) =>
  error.value
    ? errorConfig[component as keyof typeof errorConfig]
    : route.meta[component]

const footerClass = computed(() => ({
  'footer-full': shouldShow('footerFull'),
  'footer-compact': shouldShow('footerCompact')
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

@media screen and (min-width: 900px) {
  .footer-full {
    width: 82.5%;
    flex-direction: row !important;
  }
}
</style>
