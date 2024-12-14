<template>
  <div
    v-if="tags.latest?.length && tags.previous?.length"
    id="rotating-promo-banner"
  >
    <div class="rc-ribbon ribbon ribbon-blue-to-default rs-storehome-banner">
      <div class="ribbon-drop-wrapper">
        <div class="ribbon-content-wrapper">
          <div class="ribbon-content rc-ribbon-content-container row">
            <div class="column large-12 small-12 large-centered">
              <div class="rc-ribbon-content with-paddlenav">
                <div
                  class="rc-inline-gallery rc-ribbon-content-autoscroll"
                  role="group"
                  aria-label="Gallery"
                >
                  <div
                    id=":r5:"
                    class="rc-ribbon-content-gallery"
                    data-core-gallery="true"
                    data-core-gallery-fade="false"
                  >
                    <div
                      data-core-gallery-scroller="true"
                      class="rc-ribbon-content-scroller"
                      :style="[
                        transformStyle,
                        totalItems <= 2 && 'justify-content: center; gap: 16px',
                      ]"
                    >
                      <div
                        id="ribbon_0_0"
                        data-core-gallery-item="true"
                        aria-hidden="true"
                        class="rc-ribbon-gallery-item rc-inline-gallery-item"
                      >
                        <div
                          class="rc-ribbon-content-item-base rc-ribbon-content-item-0 rc-ribbon-content-item"
                        >
                          <div>
                            Pay monthly at 0% APR when you choose to check out
                            with Apple Card Monthly Installments.<sup>◊</sup>
                          </div>
                        </div>
                      </div>
                      <div
                        id="ribbon_1_1"
                        data-core-gallery-item="true"
                        aria-hidden="false"
                        class="rc-ribbon-gallery-item rc-inline-gallery-item"
                      >
                        <div
                          class="rc-ribbon-content-item-base rc-ribbon-content-item-1 rc-ribbon-content-item"
                        >
                          Order by 9 p.m. on&nbsp;12/21 for free delivery of
                          in-stock items by 12/24. See Checkout for specific
                          delivery dates and options.
                        </div>
                      </div>
                      <div
                        id="ribbon_0_2"
                        data-core-gallery-item="true"
                        aria-hidden="true"
                        class="rc-ribbon-gallery-item rc-inline-gallery-item"
                      >
                        <div
                          class="rc-ribbon-content-item-base rc-ribbon-content-item-0 rc-ribbon-content-item"
                        >
                          <div>
                            Pay monthly at 0% APR when you choose to check out
                            with Apple Card Monthly Installments.<sup>◊</sup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="totalItems > 2"
                    class="rc-gallery-paddlenav paddlenav paddlenav-alpha paddlenav-elevated"
                  >
                    <button
                      type="button"
                      class="paddlenav paddlenav-arrow paddlenav-arrow-previous"
                      aria-hidden="false"
                      aria-label="Previous"
                      data-autom="paddlenav-previous"
                      :disabled="isTransitioning"
                      @click="scrollContent('left')"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 36 36"
                      >
                        <path
                          d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z"
                        />
                      </svg>
                    </button>
                    <button
                      :disabled="isTransitioning"
                      type="button"
                      class="paddlenav paddlenav-arrow paddlenav-arrow-next"
                      aria-hidden="false"
                      aria-label="Next"
                      data-autom="paddlenav-next"
                      @click="scrollContent('right')"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 36 36"
                      >
                        <path
                          d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
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

const baseItems = ref<{ description: string, links: LinkType[] }[]>([])
const currentIndex = ref(0)
const totalItems = ref(0)
const isTransitioning = ref(false)
const scrollDirection = ref<'left' | 'right'>('right')
const displayItems = ref<{ description: string, links: LinkType[] }[]>([])
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
      item.description
      && t(`components.common.RibbonBar[${index}].description`, {
        latestTag,
        previousTag,
      }),
    links:
      item.links
      && (tm(`components.common.RibbonBar[${index}].links`) as LinkType[]).map(
        link => ({
          ...link,
          url: link.url
            ? rt(link.url, {
                latestTag,
                previousTag,
              })
            : undefined,
        }),
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
      },
  )
}

const scrollContent = (direction: 'left' | 'right') => {
  if (!isTransitioning.value && totalItems.value > 2) {
    isTransitioning.value = true
    scrollDirection.value = direction

    nextTick(() => {
      if (direction === 'left') {
        currentIndex.value
          = currentIndex.value === 0
            ? totalItems.value - 1
            : currentIndex.value - 1
      }
      else {
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
  (tagsNew) => {
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
  { immediate: true },
)

watch(locale, () => {
  updateBaseItems()
})
</script>

<style scoped>
/*! CSS Used from: https://store.storeimages.cdn-apple.com/4982/store.apple.com/static-resources/rs-vendor-1.24.0-a7250/dist/common-css@1.0.7/dist/common.css ; media=screen, print */
@media screen, print {
  button {
    margin: 0;
    padding: 0;
  }
  button {
    background: none;
    border: 0;
    box-sizing: initial;
    color: inherit;
    cursor: pointer;
    font: inherit;
    line-height: inherit;
    overflow: visible;
    vertical-align: inherit;
  }
  button:disabled {
    cursor: default;
  }
  :focus-visible {
    outline: 2px solid var(--sk-focus-color, #0071e3);
    outline-offset: var(--sk-focus-offset, 1px);
  }
  button {
    -moz-font-feature-settings: 'kern';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-synthesis: none;
  }
  sup {
    font-size: var(--sk-footnote-font-size, 0.6em);
    position: relative;
    vertical-align: initial;
  }
  sup {
    top: var(--sk-footnote-offset-top, -0.5em);
  }
  .row {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
  }
  .column {
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    padding: 0;
  }
  .large-12 {
    flex-basis: 100%;
    max-width: 100%;
  }
  .large-centered {
    margin-inline-end: auto;
    margin-inline-start: auto;
  }
  @media only screen and (max-width: 1023px) and (max-device-width: 736px) {
    .small-12 {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
  .ribbon {
    --ribbon-link-inline-color: inherit;
    --ribbon-link-color: #06c;
    --ribbon-focus-color: #0071e3;
    --ribbon-text-color: #1d1d1f;
    --ribbon-background-color: #f5f5f7;
    --ribbon-content-padding-top: 16px;
    --ribbon-content-padding-bottom: var(--ribbon-content-padding-top);
    --ribbon-content-width: 83.33333%;
    --ribbon-content-minimum-width: 320px;
    font-family:
      SF Pro Text,
      SF Pro Icons,
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.016em;
    line-height: 1.4285914286;
    overflow: hidden;
    padding-bottom: var(--ribbon-padding-bottom);
    padding-top: var(--ribbon-padding-top);
    width: var(--ribbon-width);
  }
  .ribbon-content-wrapper {
    text-align: center;
  }
  .ribbon-content {
    margin-left: auto;
    margin-right: auto;
    min-width: var(--ribbon-content-minimum-width);
    width: var(--ribbon-content-width);
  }
  .ribbon-content-wrapper {
    -webkit-backdrop-filter: blur(var(--ribbon-background-blur));
    backdrop-filter: blur(var(--ribbon-background-blur));
    background-color: var(--ribbon-background-color);
    border-radius: var(--ribbon-border-radius);
    padding-bottom: var(--ribbon-content-padding-bottom);
    padding-top: var(--ribbon-content-padding-top);
  }
  .ribbon-content {
    color: var(--ribbon-text-color);
  }
  .ribbon-blue-to-default {
    --ribbon-background-color: #f5f5f7;
    --ribbon-background-color-initial: #0071e3;
    --ribbon-text-color: #1d1d1f;
    --ribbon-text-color-initial: #fff;
    --ribbon-link-color: #06c;
    --ribbon-link-color-initial: #fff;
  }
  .ribbon-drop-wrapper {
    animation: ribbon-drop 0.8s ease-in-out forwards;
  }
  @media (prefers-reduced-motion) {
    .ribbon-drop-wrapper {
      animation: none;
    }
  }
}
/*! CSS Used from: https://store.storeimages.cdn-apple.com/4982/store.apple.com/static-resources/rs-merch-4.6.0-c5ed4/dist/store-home.css ; media=screen, print */
@media screen, print {
  [data-core-gallery] {
    min-height: 100px;
    overflow: hidden;
    position: relative;
  }
  [data-core-gallery-scroller] {
    display: flex;
    position: relative;
    white-space: nowrap;
    width: 100%;
  }
  [data-core-gallery-item] {
    cursor: pointer;
    overflow: hidden;
    width: 100%;
  }
  .rc-inline-gallery-item {
    text-align: center;
  }
  .paddlenav {
    --sk-paddlenav-diameter: 36px;
    --sk-paddlenav-arrow-color: #0000008f;
    --sk-paddlenav-arrow-color-hover: #000000a3;
    --sk-paddlenav-arrow-color-active: #000000a3;
    --sk-paddlenav-background: #0000;
    --sk-paddlenav-background-hover: #0000;
    --sk-paddlenav-background-active: #0000;
  }
  .paddlenav {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
  }
  .paddlenav .paddlenav-arrow {
    background: var(--sk-paddlenav-background);
    border-radius: var(--sk-paddlenav-diameter);
    color: var(--sk-paddlenav-arrow-color);
    display: block;
    font-style: normal;
    height: var(--sk-paddlenav-diameter);
    line-height: 1;
    overflow: hidden;
    position: absolute;
    text-align: center;
    transition:
      background 0.1s linear,
      color 0.1s linear,
      opacity 0.1s linear;
    width: var(--sk-paddlenav-diameter);
  }
  .paddlenav .paddlenav-arrow-next,
  .paddlenav .paddlenav-arrow-previous {
    margin-top: calc(var(--sk-paddlenav-diameter) * -0.5);
    top: 50%;
  }
  .paddlenav .paddlenav-arrow svg path {
    fill: var(--sk-paddlenav-arrow-color);
    transition: fill 0.1s linear;
  }
  .paddlenav .paddlenav-arrow:hover {
    background: var(--sk-paddlenav-background-hover);
    color: var(--sk-paddlenav-arrow-color-hover);
    text-decoration: none;
  }
  .paddlenav .paddlenav-arrow:hover svg path {
    fill: var(--sk-paddlenav-arrow-color-hover);
  }
  .paddlenav .paddlenav-arrow:active {
    background: var(--sk-paddlenav-background-active);
    color: var(--sk-paddlenav-arrow-color-active);
  }
  .paddlenav .paddlenav-arrow:active svg path {
    fill: var(--sk-paddlenav-arrow-color-active);
  }
  .paddlenav .paddlenav-arrow:disabled {
    opacity: var(--sk-link-disabled-opacity, 0.42);
    pointer-events: none;
  }
  .paddlenav .paddlenav-arrow-previous {
    inset-inline-start: 18px;
  }
  .paddlenav .paddlenav-arrow-next {
    inset-inline-end: 18px;
  }
  .paddlenav-elevated {
    --sk-paddlenav-diameter: 56px;
  }
  .paddlenav-alpha {
    --sk-paddlenav-background: #d2d2d7a3;
    --sk-paddlenav-background-hover: hsla(240, 6%, 88%, 0.698);
    --sk-paddlenav-background-active: hsla(240, 4%, 77%, 0.654);
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
  .rc-ribbon-content {
    width: 100%;
  }
  .rc-ribbon-content [data-core-gallery-item] {
    cursor: auto;
  }
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow {
    color: #86868b;
    font-family:
      SF Pro Display,
      SF Pro Icons,
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0.009em;
    line-height: 1.3334133333;
  }
  @media (max-width: 1023px) and (max-device-width: 736px) {
    .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow {
      font-family:
        SF Pro Display,
        SF Pro Icons,
        Helvetica Neue,
        Helvetica,
        Arial,
        sans-serif;
      font-size: 21px;
      font-weight: 400;
      letter-spacing: 0.011em;
      line-height: 1.381002381;
    }
  }
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow > svg {
    display: block;
  }
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-previous {
    animation: animate-opacity 1s ease 2.8s forwards;
    inset-inline-start: -9px;
    opacity: 0;
    width: 1.4705882353rem;
    z-index: 3;
  }
  @media (max-width: 1023px) and (max-device-width: 736px) {
    .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-previous {
      width: 24px;
    }
  }
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-next {
    animation: animate-opacity 1s ease 2.8s forwards;
    inset-inline-end: -9px;
    opacity: 0;
    width: 1.4705882353rem;
    z-index: 3;
  }
  @media (max-width: 1023px) and (max-device-width: 736px) {
    .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow-next {
      width: 24px;
    }
  }
  .with-paddlenav .rc-ribbon-content-autoscroll:after,
  .with-paddlenav .rc-ribbon-content-autoscroll:before {
    animation: animate-opacity 1s ease 2.8s forwards;
    content: '';
    display: block;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 41px;
    z-index: 2;
  }
  @media (max-width: 1023px) and (max-device-width: 736px) {
    .with-paddlenav .rc-ribbon-content-autoscroll:after,
    .with-paddlenav .rc-ribbon-content-autoscroll:before {
      width: 16px;
    }
  }
  .with-paddlenav .rc-ribbon-content-autoscroll:before {
    background-image: linear-gradient(
      to right,
      var(--ribbon-background-color) 16px,
      #fff0
    );
    inset-inline-start: 0;
  }
  @media (max-width: 1023px) and (max-device-width: 736px) {
    .with-paddlenav .rc-ribbon-content-autoscroll:before {
      background-image: linear-gradient(
        to right,
        var(--ribbon-background-color),
        #fff0
      );
    }
  }
  .with-paddlenav .rc-ribbon-content-autoscroll:after {
    background-image: linear-gradient(
      to left,
      var(--ribbon-background-color) 16px,
      #fff0
    );
    inset-inline-end: 0;
  }
  @media (max-width: 1023px) and (max-device-width: 736px) {
    .with-paddlenav .rc-ribbon-content-autoscroll:after {
      background-image: linear-gradient(
        to left,
        var(--ribbon-background-color),
        #fff0
      );
    }
  }
  .rc-ribbon-content-item-base {
    padding: 3px 0;
    white-space: normal;
  }
  .rc-ribbon .ribbon-content-wrapper {
    padding: em(13px) 0;
  }
  .rc-ribbon .ribbon-content-wrapper .ribbon-content {
    margin-inline-end: auto;
    margin-inline-start: auto;
    width: 980px;
  }
  @media (min-width: 1441px) {
    .rc-ribbon .ribbon-content-wrapper .ribbon-content {
      margin-inline-end: auto;
      margin-inline-start: auto;
      width: 980px;
    }
  }
  @media (max-width: 1023px) and (max-device-width: 736px) {
    .rc-ribbon .ribbon-content-wrapper .ribbon-content {
      margin-inline-end: auto;
      margin-inline-start: auto;
      width: 87.5%;
    }
  }
  @media (max-width: 1023px) and (max-device-width: 736px) and (orientation: landscape) {
    .rc-ribbon .ribbon-content-wrapper .rc-ribbon-content-container {
      margin-inline: max(22px, env(safe-area-inset-left))
        max(22px, env(safe-area-inset-left));
      width: auto;
    }
  }
  .rc-ribbon-content-scroller {
    align-items: center;
  }
  .rc-ribbon-content-gallery {
    min-height: auto;
  }
  .rc-ribbon-content-item {
    margin-inline: auto;
    position: relative;
    width: 816px;
  }
  @media (max-width: 1023px) and (max-device-width: 736px) {
    .rc-ribbon-content-item {
      width: 87.5%;
    }
  }
  .rs-storehome-banner.ribbon-blue-to-default {
    --ribbon-background-color: #fff;
  }
  .rc-ribbon-content-scroller .rc-inline-gallery-item > div {
    white-space: normal;
  }
}
/*! CSS Used keyframes */
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
