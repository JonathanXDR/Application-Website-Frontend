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
import { SpeedInsights } from "@vercel/speed-insights/vue";
import svgFaviconDev from "~/assets/img/dev/favicon-dev.svg?raw";
import svgFavicon from "~/assets/img/favicon.svg?raw";
import FooterCompact from "~/components/common/Footer/Compact.vue";
import FooterFull from "~/components/common/Footer/Full.vue";

const route = useRoute();
const { colorBadge, randomizeColor } = useColor();
const { currentSection } = useSection();
const { locale } = useI18n();

onMounted(randomizeColor);

const isDevelopment = ref(process.env.NODE_ENV === "development");

const faviconBase = computed(() =>
  isDevelopment.value ? svgFaviconDev : svgFavicon
);
const appleTouchIconBase = computed(
  () =>
    `~/assets/img/${
      isDevelopment.value
        ? `dev/favicon-dev-${colorBadge.value?.colorName}.png`
        : "favicon.png"
    }`
);

watchEffect(() => {
  const faviconColor = colorBadge.value?.colorHex ?? "000000";
  const faviconData = `data:image/svg+xml,${encodeURIComponent(
    faviconBase.value.replace("#color", `#${faviconColor}`)
  )}`;

  useHead({
    link: [
      { rel: "icon", type: "image/svg+xml", href: faviconData },
      { rel: "apple-touch-icon", href: appleTouchIconBase.value },
    ],
  });
});

const shouldShow = (component: string) => route.meta[component] !== false;

const footerClass = computed(() => ({
  "footer-full": route.meta.footerFull !== false,
  "footer-compact": !route.meta.footerFull,
}));

const footerComponent = computed(() =>
  route.meta.footerFull !== false ? FooterFull : FooterCompact
);

const pageTitle = computed(() =>
  currentSection.value.name
    ? `JR | ${currentSection.value.name}`
    : "Jonathan Russ"
);

useHead({
  htmlAttrs: { lang: locale.value },
  title: pageTitle,
  script: [
    {
      src: "https://js-cdn.music.apple.com/musickit/v1/musickit.js",
      async: true,
    },
  ],
});
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
