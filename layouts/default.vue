<template>
  <div>
    <SpeedInsights />
    <header v-if="shouldShow('header')">
      <NavBar v-if="shouldShow('nav')" />
      <RibbonBar v-if="shouldShow('ribbon')" :loading="false" :items="items" />
    </header>
    <main>
      <slot />
    </main>
    <footer :class="footerClass">
      <component :is="footerComponent" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
import FooterCompact from "~/components/common/Footer/Compact.vue";
import FooterFull from "~/components/common/Footer/Full.vue";
import type { RibbonBar } from "~/types/common/RibbonBar";

const { randomDevColor } = useColor();
const route = useRoute();
const { currentSection } = useSection();
const { locale, tm } = useI18n();
const error = useError();
const config = useRuntimeConfig();

const items = computed<RibbonBar["items"]>(() =>
  tm("components.common.RibbonBar"),
);

const faviconColor = randomDevColor.value?.hex;
const faviconGraphicData = ref("");

const fetchSvgContent = async () => {
  const response = await fetch("/img/dev/favicon-dev.svg");
  const svgContent = await response.text();
  faviconGraphicData.value = `data:image/svg+xml,${encodeURIComponent(
    svgContent.replace("#color", `#${faviconColor}`),
  )}`;
};

onMounted(async () => {
  await fetchSvgContent();
});

watchEffect(() => {
  useHead({
    htmlAttrs: { lang: locale.value },
    title: currentSection.value.name,
  });

  if (config.public.appEnvironment === "development") {
    useHead({
      link: [
        { rel: "icon", type: "image/svg+xml", href: faviconGraphicData.value },
        {
          rel: "apple-touch-icon",
          href: `/img/dev/favicon-dev-${randomDevColor.value?.name}.png`,
        },
      ],
      meta: [
        {
          property: "twitter:image",
          content: `/img/dev/favicon-dev-${randomDevColor.value?.name}.png`,
        },
        {
          property: "og:image",
          content: `/img/dev/favicon-dev-${randomDevColor.value?.name}.png`,
        },
      ],
    });
  }
});

const errorConfig = {
  header: false,
  nav: false,
  ribbon: false,
  footerFull: false,
  footerCompact: true,
};

const shouldShow = (component: string) =>
  error.value
    ? errorConfig[component as keyof typeof errorConfig]
    : route.meta[component];

const footerClass = computed(() => ({
  "footer-full": shouldShow("footerFull"),
  "footer-compact": shouldShow("footerCompact"),
}));

const footerComponent = computed(() =>
  shouldShow("footerFull") ? FooterFull : FooterCompact,
);
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
