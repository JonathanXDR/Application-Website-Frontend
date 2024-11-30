<template>
  <div
    v-if="tags.latest?.length && tags.previous?.length"
    class="rc-ribbon ribbon ribbon-blue-to-default rs-storehome-banner"
  >
    <div class="ribbon-drop-wrapper">
      <div class="ribbon-content-wrapper">
        <div class="ribbon-content rc-ribbon-content-container">
          <div class="rc-ribbon-content with-paddlenav">
            <div class="rc-inline-gallery rc-ribbon-content-autoscroll">
              <div class="rc-ribbon-content-gallery">
                <div
                  class="rc-ribbon-content-scroller"
                  :style="[
                    transformStyle,
                    totalItems <= 2 && 'justify-content: center; gap: 16px',
                  ]"
                >
                  <div
                    v-for="(item, index) in displayItems"
                    :key="index"
                    class="rc-ribbon-gallery-item rc-inline-gallery-item"
                    :style="totalItems <= 2 && 'width: unset !important'"
                  >
                    <div
                      class="rc-ribbon-content-item-base rc-ribbon-content-item"
                      :style="totalItems <= 2 && 'width: 100% !important'"
                    >
                      <template v-if="!loading">
                        {{ item.description && item.description + '&ensp;' }}
                      </template>
                      <template v-else>
                        <LoadingSkeleton width="200px" height="15px" />
                      </template>

                      <LinkCollection
                        v-if="item.links.length > 0"
                        class="ribbon-link"
                        :loading="loading"
                        :links="item.links"
                        :should-animate="!initialAnimationPlayed"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="totalItems > 2"
                class="rc-gallery-paddlenav paddlenav paddlenav-compact"
              >
                <button
                  class="paddlenav-arrow paddlenav-arrow-previous"
                  aria-label="Previous"
                  :disabled="isTransitioning"
                  @click="scrollContent('left')"
                >
                  <SFSymbol
                    :loading="loading"
                    name="chevron.left"
                    component-size="small"
                    class="icon"
                  />
                </button>
                <button
                  class="paddlenav-arrow paddlenav-arrow-next"
                  aria-label="Next"
                  :disabled="isTransitioning"
                  @click="scrollContent('right')"
                >
                  <SFSymbol
                    :loading="loading"
                    name="chevron.right"
                    component-size="small"
                    class="icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LinkType } from '#shared/types/common/link'
import type { RibbonBar } from '#shared/types/common/ribbon-bar'

const properties = withDefaults(defineProps<RibbonBar>(), {
  loading: false,
})

const { t, tm, rt, locale } = useI18n()
const config = useRuntimeConfig()

const tags = ref<{
  latest: string | undefined
  previous: string | undefined
}>({ latest: undefined, previous: undefined })

const baseItems = ref<{ description: string; links: LinkType[] }[]>([])
const currentIndex = ref(0)
const totalItems = ref(0)
const isTransitioning = ref(false)
const scrollDirection = ref<'left' | 'right'>('right')
const displayItems = ref<{ description: string; links: LinkType[] }[]>([])
const initialAnimationPlayed = ref(false)

const { data: repositoryTags } = await useFetch('/api/github/repository-tags', {
  key: 'repository-tags',
  lazy: true,
  params: {
    owner: config.public.githubRepoOwner,
    repo: config.public.githubRepoName,
    perPage: 2,
  },
  getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
})

const updateBaseItems = () => {
  const { latest: latestTag, previous: previousTag } = tags.value

  if (!latestTag || !previousTag) return
  baseItems.value = properties.items.map((item, index) => ({
    description:
      item.description &&
      t(`components.common.RibbonBar[${index}].description`, {
        latestTag,
        previousTag,
      }),
    links:
      item.links &&
      (tm(`components.common.RibbonBar[${index}].links`) as LinkType[]).map(
        link => ({
          ...link,
          url: link.url
            ? rt(link.url, {
                latestTag,
                previousTag,
              })
            : undefined,
        })
      ),
  }))
  totalItems.value = baseItems.value.length
  updateDisplayItems()
}

const updateDisplayItems = () => {
  const start = (currentIndex.value - 1 + totalItems.value) % totalItems.value
  displayItems.value = Array.from(
    { length: totalItems.value },
    (_, index) =>
      baseItems.value[(start + index) % totalItems.value] || {
        description: '',
        links: [],
      }
  )
}

const scrollContent = (direction: 'left' | 'right') => {
  if (!isTransitioning.value && totalItems.value > 2) {
    isTransitioning.value = true
    scrollDirection.value = direction

    nextTick(() => {
      if (direction === 'left') {
        currentIndex.value =
          currentIndex.value === 0
            ? totalItems.value - 1
            : currentIndex.value - 1
      } else {
        currentIndex.value = (currentIndex.value + 1) % totalItems.value
      }
    })
  }
}

const transformStyle = computed(() => {
  if (totalItems.value > 2) {
    let translateXValue = -100 / totalItems.value
    if (scrollDirection.value === 'left') {
      translateXValue = Math.abs(translateXValue)
    }

    return {
      transform: `translateX(${
        isTransitioning.value ? translateXValue + '%' : '0px'
      })`,
      width: `${100 * totalItems.value}%`,
      left: '-100%',
      transition: isTransitioning.value
        ? 'transform 1000ms ease 0s'
        : 'none 0s ease 0s',
    }
  }
  return {}
})

watch(currentIndex, () => {
  setTimeout(() => {
    isTransitioning.value = false
    updateDisplayItems()
  }, 1000)
})

watch(
  repositoryTags,
  tagsNew => {
    if (tagsNew && tagsNew.length >= 2) {
      tags.value = {
        latest: tagsNew[0]?.name,
        previous: tagsNew[1]?.name,
      }
      updateBaseItems()

      setTimeout(() => {
        initialAnimationPlayed.value = true
      }, 2800)
    }
  },
  { immediate: true }
)

watch(locale, () => {
  updateBaseItems()
})
</script>

<style scoped>
.ribbon {
  margin-top: 48px;
}

@media screen and (min-width: 768px) {
  .ribbon {
    margin-top: 52px;
  }
}

.ribbon .links {
  display: flex;
  flex-wrap: wrap;
}

.more:after,
.more:before {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
  color: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: inherit;
  font-size: inherit;
  text-decoration: underline;
  position: relative;
  z-index: 1;
  alt: '';
  text-decoration: none;
}
.more:before {
  display: none;
}
.more:after {
  padding-left: 0.3em;
  top: 0;
}
.more:after,
.more:before {
  content: '';
}

.rc-ribbon-content-gallery {
  overflow: hidden;
  position: relative;
  min-height: 100px;
}
.rc-ribbon-content-scroller {
  width: 100%;
  white-space: nowrap;
  display: flex;
  position: relative;
}
.rc-inline-gallery-item {
  cursor: pointer;
  width: 100%;
  overflow: hidden;
}
.rc-inline-gallery-item {
  text-align: center;
}
.paddlenav {
  margin: 0;
  list-style: none;
}
.paddlenav .paddlenav-arrow {
  display: block;
  font-style: normal;
  overflow: hidden;
  position: absolute;
  text-align: center;
  transition:
    background-color 0.1s linear,
    color 0.1s linear,
    opacity 0.1s linear;
}
.paddlenav .paddlenav-arrow .icon {
  width: 0.5em;
  height: 0.5em;
}
.paddlenav .paddlenav-arrow-next,
.paddlenav .paddlenav-arrow-previous {
  top: 50%;
}
.paddlenav .paddlenav-arrow:hover {
  cursor: pointer;
  text-decoration: none;
}
.paddlenav .paddlenav-arrow:disabled {
  cursor: default;
  opacity: 0;
}
.paddlenav .paddlenav-arrow {
  font-weight: 300;
  width: 90px;
  height: 90px;
  border-radius: 90px;
  font-size: 53px;
}
.paddlenav .paddlenav-arrow-next,
.paddlenav .paddlenav-arrow-previous {
  margin-top: -45px;
}
.paddlenav .paddlenav-arrow-next:after,
.paddlenav .paddlenav-arrow-next:before {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
  color: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: inherit;
  font-size: inherit;
  text-decoration: underline;
  position: relative;
  z-index: 1;
  alt: '';
  text-decoration: none;
}
.paddlenav .paddlenav-arrow-next:before {
  display: none;
}
.paddlenav .paddlenav-arrow-next:after {
  margin-right: -0.056em;
}
.paddlenav .paddlenav-arrow-previous:after,
.paddlenav .paddlenav-arrow-previous:before {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
  color: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: inherit;
  font-size: inherit;
  text-decoration: underline;
  position: relative;
  z-index: 1;
  alt: '';
  text-decoration: none;
}
.paddlenav .paddlenav-arrow-previous:before {
  display: none;
}
.paddlenav .paddlenav-arrow-previous:after {
  margin-left: -0.056em;
}
.paddlenav .paddlenav-arrow {
  background-color: transparent;
  color: rgba(0, 0, 0, 0.56);
}
.paddlenav .paddlenav-arrow:hover {
  background-color: transparent;
  color: rgba(0, 0, 0, 0.64);
}
.paddlenav .paddlenav-arrow-next {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  right: 18px;
}
.paddlenav .paddlenav-arrow-previous {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: 18px;
}
@media only screen and (max-width: 1023px) and (max-device-width: 767px) {
  .paddlenav .paddlenav-arrow {
    font-weight: 300;
    width: 52px;
    height: 52px;
    border-radius: 52px;
    font-size: 53px;
  }
  .paddlenav .paddlenav-arrow-next,
  .paddlenav .paddlenav-arrow-previous {
    margin-top: -26px;
  }
  .paddlenav .paddlenav-arrow-next:after,
  .paddlenav .paddlenav-arrow-next:before {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      sans-serif;
    color: inherit;
    display: inline-block;
    font-style: normal;
    font-weight: inherit;
    font-size: inherit;
    text-decoration: underline;
    position: relative;
    z-index: 1;
    alt: '';
    text-decoration: none;
  }
  .paddlenav .paddlenav-arrow-next:before {
    display: none;
  }
  .paddlenav .paddlenav-arrow-next:after {
    margin-right: -0.1em;
  }
  .paddlenav .paddlenav-arrow-previous:after,
  .paddlenav .paddlenav-arrow-previous:before {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      sans-serif;
    color: inherit;
    display: inline-block;
    font-style: normal;
    font-weight: inherit;
    font-size: inherit;
    text-decoration: underline;
    position: relative;
    z-index: 1;
    alt: '';
    text-decoration: none;
  }
  .paddlenav .paddlenav-arrow-previous:before {
    display: none;
  }
  .paddlenav .paddlenav-arrow-previous:after {
    margin-left: -0.1em;
  }
}
.paddlenav-compact .paddlenav-arrow {
  font-weight: 300;
  width: 52px;
  height: 52px;
  border-radius: 52px;
  font-size: 53px;
}
.paddlenav-compact .paddlenav-arrow-next,
.paddlenav-compact .paddlenav-arrow-previous {
  margin-top: -26px;
}
.paddlenav-compact .paddlenav-arrow-next:after,
.paddlenav-compact .paddlenav-arrow-next:before {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
  color: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: inherit;
  font-size: inherit;
  text-decoration: underline;
  position: relative;
  z-index: 1;
  alt: '';
  text-decoration: none;
}
.paddlenav-compact .paddlenav-arrow-next:before {
  display: none;
}
.paddlenav-compact .paddlenav-arrow-next:after {
  margin-right: -0.1em;
}
.paddlenav-compact .paddlenav-arrow-previous:after,
.paddlenav-compact .paddlenav-arrow-previous:before {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
  color: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: inherit;
  font-size: inherit;
  text-decoration: underline;
  position: relative;
  z-index: 1;
  alt: '';
  text-decoration: none;
}
.paddlenav-compact .paddlenav-arrow-previous:before {
  display: none;
}
.paddlenav-compact .paddlenav-arrow-previous:after {
  margin-left: -0.1em;
}
.with-paddlenav {
  position: relative;
}
.rc-gallery-paddlenav button {
  z-index: 1;
}
.rc-inline-gallery {
  position: relative;
}
.ribbon {
  overflow: hidden;
  --ribbon-focus-color: rgba(0, 125, 250, 0.6);
}
.ribbon-content-wrapper {
  text-align: center;
}
.ribbon-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}
@media screen and (min-width: 768px) {
  .ribbon-content {
    width: 82.5%;
  }
}
.ribbon-link {
  white-space: nowrap;
}
.ribbon .ribbon-content-wrapper {
  padding-top: 0.94118em;
  padding-bottom: 0.94118em;
}
.ribbon .ribbon-content {
  font-size: 14px;
  font-weight: 400;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
}
.ribbon .ribbon-content-wrapper {
  background-color: var(--color-fill-tertiary);
}
.ribbon .ribbon-content {
  color: var(--color-fill-gray);
}
.ribbon .ribbon-link {
  color: var(--color-figure-blue);
}
.ribbon-blue-to-default .ribbon-content-wrapper {
  background-color: var(--color-fill-blue);
  animation: animate-background-0071e3-f5f5f7 1s ease-in-out 1.8s forwards;
}
.ribbon-blue-to-default .ribbon-content {
  color: white;
  animation: animate-color-fff-1d1d1f 1s ease-in-out 1.8s forwards;
}
.ribbon-blue-to-default .ribbon-link {
  color: white;
  animation: animate-color-fff-06c 1s ease-in-out 1.8s forwards;
}
.ribbon-drop-wrapper {
  animation: ribbon-drop 0.8s ease-in-out forwards;
}
@media only screen and (max-width: 1023px) and (max-device-width: 767px) and (orientation: landscape) {
  .rc-ribbon-content-container {
    margin-left: calc(max(22px, env(safe-area-inset-left)));
    margin-right: calc(max(22px, env(safe-area-inset-left)));
    width: auto;
  }
}
.rc-ribbon-content {
  width: 100%;
}
.rc-ribbon-content .rc-inline-gallery-item {
  cursor: auto;
}
.rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow {
  font-size: 24px;
  font-weight: 400;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
  color: var(--color-fill-gray-secondary);
}
@media only screen and (max-width: 1023px) and (max-device-width: 767px) {
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow {
    font-size: 21px;
    font-weight: 400;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      sans-serif;
  }
}
.rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-previous {
  opacity: 0;
  width: 25px;
  left: 0;
  animation: animate-opacity 1s ease 2.8s forwards;
  z-index: 3;
}
@media only screen and (max-width: 1023px) and (max-device-width: 767px) {
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-previous {
    width: 24px;
    /* left: -12px; */
  }
}
/* @media only screen and (max-width: 1023px) and (max-device-width: 767px) and (orientation: landscape) {
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-previous {
    left: -6px;
  }
} */
.rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-previous:after {
  width: 10px;
  margin-left: -18px;
}
@media only screen and (max-width: 1023px) and (max-device-width: 767px) {
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-previous:after {
    margin-left: -9px;
  }
}
.rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-next {
  opacity: 0;
  width: 25px;
  right: 0;
  animation: animate-opacity 1s ease 2.8s forwards;
  z-index: 3;
}
@media only screen and (max-width: 1023px) and (max-device-width: 767px) {
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-next {
    width: 24px;
    /* right: -12px; */
  }
}
/* @media only screen and (max-width: 1023px) and (max-device-width: 767px) and (orientation: landscape) {
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-next {
    right: -6px;
  }
} */
.rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-next:after {
  width: 10px;
  margin-right: -18px;
}
@media only screen and (max-width: 1023px) and (max-device-width: 767px) {
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-next:after {
    margin-right: -9px;
  }
}
.with-paddlenav .rc-ribbon-content-autoscroll:after,
.with-paddlenav .rc-ribbon-content-autoscroll:before {
  content: '';
  display: block;
  width: 41px;
  height: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  animation: animate-opacity 1s ease 2.8s forwards;
  z-index: 2;
}
@media only screen and (max-width: 1023px) and (max-device-width: 767px) {
  .with-paddlenav .rc-ribbon-content-autoscroll:after,
  .with-paddlenav .rc-ribbon-content-autoscroll:before {
    width: 16px;
  }
}
.with-paddlenav .rc-ribbon-content-autoscroll:before {
  left: 0;
  background-image: linear-gradient(
    90deg,
    var(--color-fill-tertiary) 16px,
    hsla(0, 0%, 100%, 0)
  );
}
@media only screen and (max-width: 1023px) and (max-device-width: 767px) {
  .with-paddlenav .rc-ribbon-content-autoscroll:before {
    background-image: linear-gradient(
      90deg,
      var(--color-fill-tertiary),
      hsla(0, 0%, 100%, 0)
    );
  }
}
.with-paddlenav .rc-ribbon-content-autoscroll:after {
  right: 0;
  background-image: linear-gradient(
    270deg,
    var(--color-fill-tertiary) 16px,
    hsla(0, 0%, 100%, 0)
  );
}
@media only screen and (max-width: 1023px) and (max-device-width: 767px) {
  .with-paddlenav .rc-ribbon-content-autoscroll:after {
    background-image: linear-gradient(
      270deg,
      var(--color-fill-tertiary),
      hsla(0, 0%, 100%, 0)
    );
  }
}
.ribbon-blue-to-default
  .rc-ribbon-content-autoscroll
  .rc-ribbon-content-item:not(.rc-ribbon-content-item-0)
  .ribbon-link,
.ribbon-blue-to-default
  .rc-ribbon-content-autoscroll:not(.rc-inline-gallery-autoscroll)
  .ribbon-link {
  animation: none;
  color: var(--color-figure-blue);
}
.rc-ribbon-content-item-base {
  padding: 3px 0;
  white-space: normal;
}
.rc-ribbon-content-item-base .more {
  display: inline-block;
}
.rc-ribbon .ribbon-content-wrapper {
  padding: 0.76471em 0;
}
.rc-ribbon-content-scroller {
  align-items: center;
}
.rc-ribbon-content-gallery {
  min-height: auto;
}
.rc-ribbon-gallery-item[aria-hidden='true'] a {
  visibility: hidden;
}
.rc-ribbon-content-item {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
@media screen and (min-width: 768px) {
  .rc-ribbon-content-item {
    width: 82.5%;
  }
}
.rc-ribbon .ribbon-link {
  position: relative;
}
.rs-storehome-banner.ribbon-blue-to-default {
  --ribbon-background-color: var(--color-fill);
}
.rc-ribbon-content-scroller .rc-inline-gallery-item > div {
  white-space: normal;
}
@keyframes animate-background-0071e3-f5f5f7 {
  0% {
    background-color: var(--color-fill-blue);
  }
  to {
    background-color: var(--color-fill-tertiary);
  }
}
@keyframes animate-color-fff-1d1d1f {
  0% {
    color: white;
  }
  to {
    color: var(--color-fill-gray);
  }
}
@keyframes animate-color-fff-06c {
  0% {
    color: white;
  }
  to {
    color: var(--color-figure-blue);
  }
}
@keyframes ribbon-drop {
  0% {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes animate-opacity {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
