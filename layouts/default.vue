<template>
  <SpeedInsights />
  <header v-if="shouldShow('header')">
    <NavBar v-if="shouldShow('nav')" />
    <RibbonBar v-if="shouldShow('ribbon')" :loading="false" />
  </header>
  <main>
    <DialogModal title="Test" description="This is a test">
      <h2 class="t-headline-reduced">Flexible delivery and pickup options.</h2>
      <p class="t-body">
        Get your new Apple products quickly and easily with a handful of
        delivery and pickup options to choose from.
      </p>
      <h2 class="t-label">Two-hour delivery from an Apple Store.</h2>
      <p class="t-body">
        Enjoy lightning-fast courier delivery for an additional fee at checkout,
        on eligible in-stock items in most metro areas. Delivery time windows
        can be scheduled at checkout.
      </p>
      <h2 class="t-label">Convenient local pickup.</h2>
      <p class="t-body">
        Place your order online and pick it up at a local Apple Store.
      </p>
      <h2 class="t-label">Free next-day delivery.</h2>
      <p class="t-body">
        Most of your favorite Apple products are available for free next-day
        delivery.
      </p>
      <p class="dd-modal-link">
        <a href="/shop/shipping-pickup" class="more" target="_blank"
          >Learn&nbsp;more<span class="a11y">about free delivery</span></a
        >
      </p>
    </DialogModal>

    <FlashAlert variant="important" title="Test" description="This is a Test" />
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

const route = useRoute()
const { colorBadge, randomizeColor } = useColor()
const { currentSection } = useSection()
const { locale } = useI18n()
const error = useError()
const config = useRuntimeConfig()

const faviconColor = colorBadge.value?.colorHex ?? '000000'
const faviconGraphicData = `data:image/svg+xml,${encodeURIComponent(
  svgFaviconDev.replace('#color', `#${faviconColor}`)
)}`

onMounted(randomizeColor)

watchEffect(() => {
  useHead({
    htmlAttrs: { lang: locale.value },
    title: currentSection.value.name
  })

  if (config.public.appEnvironment === 'development') {
    useHead({
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: faviconGraphicData },
        {
          rel: 'apple-touch-icon',
          href: `/img/dev/favicon-dev-${colorBadge.value?.colorName}.png`
        }
      ],
      meta: [
        {
          property: 'twitter:image',
          content: `/img/dev/favicon-dev-${colorBadge.value?.colorName}.png`
        },
        {
          property: 'og:image',
          content: `/img/dev/favicon-dev-${colorBadge.value?.colorName}.png`
        }
      ]
    })
  }
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
