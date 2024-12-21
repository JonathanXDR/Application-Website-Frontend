<template>
  <div
    id="rotating-promo-banner"
    class="mt-20"
  >
    <div
      class="rc-ribbon ribbon rs-storehome-banner"
      :class="[
        { 'ribbon-hide': !isVisible || loading },
        { 'ribbon-blue-to-default': themeAnimation },
      ]"
      data-analytics-region="banner"
    >
      <div :class="{ 'ribbon-drop-wrapper': dropAnimation }">
        <div class="ribbon-content-wrapper">
          <div class="ribbon-content rc-ribbon-content-container row">
            <div class="column large-12 small-12 large-centered">
              <div
                class="rc-ribbon-content"
                :class="{ 'with-paddlenav': paddleNav }"
              >
                <div
                  class="rc-inline-gallery rc-ribbon-content-autoscroll"
                  role="group"
                  aria-label="Gallery"
                  tabindex="0"
                  @mouseenter="onMouseEnterOrFocus"
                  @mouseleave="onMouseLeaveOrBlur"
                  @focus="onMouseEnterOrFocus"
                  @blur="onMouseLeaveOrBlur"
                >
                  <div
                    class="rc-ribbon-content-gallery"
                    data-core-gallery="true"
                    data-core-gallery-fade="false"
                  >
                    <div
                      data-core-gallery-scroller="true"
                      class="rc-ribbon-content-scroller"
                      :style="galleryStyle"
                      @transitionend="handleTransitionEnd"
                    >
                      <div
                        v-for="gallery in galleryItems"
                        :id="gallery.id"
                        :key="`${gallery.id}-${state.sequence}-${state.activeItem}`"
                        data-core-gallery-item="true"
                        :aria-hidden="!gallery.isActive"
                        class="rc-ribbon-gallery-item rc-inline-gallery-item"
                      >
                        <div
                          :class="[
                            'rc-ribbon-content-item-base',
                            `rc-ribbon-content-item-${gallery.itemIndex}`,
                            'rc-ribbon-content-item',
                          ]"
                        >
                          <template v-if="gallery.item && !loading">
                            {{ gallery.item.description + '&ensp;' }}
                          </template>
                          <template v-else>
                            <LoadingSkeleton
                              width="200px"
                              height="15px"
                            />
                          </template>

                          <LinkCollection
                            v-if="gallery.item && gallery.item.links.length > 0"
                            class="ribbon-link"
                            :loading="loading"
                            :links="gallery.item.links"
                            :should-animate="!initialAnimationPlayed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="items.length > 1"
                    class="rc-gallery-paddlenav paddlenav paddlenav-alpha paddlenav-elevated"
                  >
                    <button
                      type="button"
                      class="paddlenav paddlenav-arrow paddlenav-arrow-previous"
                      :aria-hidden="false"
                      aria-label="Previous"
                      :disabled="loading || isAnimating"
                      data-autom="paddlenav-previous"
                      @click="previous"
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
                      type="button"
                      class="paddlenav paddlenav-arrow paddlenav-arrow-next"
                      :aria-hidden="false"
                      aria-label="Next"
                      :disabled="loading || isAnimating"
                      data-autom="paddlenav-next"
                      @click="next"
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
import type {
  GalleryState,
  RotatingBannerProps,
} from '#shared/types/common/banner'
import type { LinkType } from '#shared/types/common/link'

const props = withDefaults(defineProps<RotatingBannerProps>(), {
  loading: false, // working
  step: 1, // working but calculateGalleryItems needs to be adjusted
  paddleNav: true, // working
  dropAnimation: true, // working
  themeAnimation: true, // working
  opacityDelay: 100000,
  transitionDelay: 1000, // unused
  transitionDuration: 1000, // working
  autoScroll: true, // working
  autoScrollDelay: 5000, // working
  autoScrollRestartDelay: 5000, // working
})

const state = ref<GalleryState>({
  sequence: 0,
  activeItem: 0,
  direction: 'neutral',
  pendingUpdate: null,
})

const { t, tm, rt } = useI18n()
const config = useRuntimeConfig()

const isVisible = ref(false)
const isAnimating = ref(false)
const initialAnimationPlayed = ref(false)

const tags = ref<{
  latest: string | undefined
  previous: string | undefined
}>({ latest: undefined, previous: undefined })
const links = tm('components.common.RotatingBanner.links') as LinkType[]

let autoScrollInterval: ReturnType<typeof setInterval> | null = null
let restartTimeout: ReturnType<typeof setTimeout> | null = null

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

onMounted(() => {
  if (props.dropAnimation) {
    setTimeout(() => {
      isVisible.value = true
    }, props.opacityDelay)
  }
  else {
    isVisible.value = true
  }

  if (props.autoScroll && !props.loading) {
    startAutoScroll()
  }
})

onUnmounted(() => {
  stopAutoScroll()
  clearRestartTimeout()
})

const totalWidth = computed(() => `${props.items.length * 100}%`)
const insetStart = computed(() => `-100%`)

const transformValue = computed(() => {
  if (!isAnimating.value) {
    return 'translateX(0)'
  }
  switch (state.value.direction) {
    case 'right':
      return 'translateX(33.333%)'
    case 'left':
      return 'translateX(-33.333%)'
    default:
      return 'translateX(0)'
  }
})

const galleryStyle = computed(() => {
  const base: Record<string, string> = {
    'width': totalWidth.value,
    'inset-inline-start': insetStart.value,
    'transform': transformValue.value,
    'transition': isAnimating.value
      ? `transform ${props.transitionDuration}ms`
      : 'none',
  }

  if (props.items.length <= 2) {
    base['justify-content'] = 'center'
    base.gap = '16px'
  }
  return base
})

const calculateGalleryItems = () => {
  const count = Math.min(props.items.length, 3)
  const mid = Math.floor(count / 2)

  return Array.from({ length: count }, (_, pos) => {
    const index
      = (state.value.activeItem + (pos - mid) + props.items.length)
      % props.items.length
    return {
      id: `ribbon_${index}_${pos}`,
      item: props.items[index],
      itemIndex: index,
      position: pos,
      isActive: pos === mid,
    }
  })
}

const galleryItems = computed(() => calculateGalleryItems())

function next() {
  if (isAnimating.value || props.loading) return
  isAnimating.value = true

  const stepSize = props.step
  const nextSequence = state.value.sequence + 1
  const nextItem = (state.value.activeItem + stepSize) % props.items.length

  state.value = {
    ...state.value,
    direction: 'left',
    pendingUpdate: {
      sequence: nextSequence,
      activeItem: nextItem,
    },
  }
}

function previous() {
  if (isAnimating.value || props.loading) return
  isAnimating.value = true

  const stepSize = props.step
  const nextSequence = state.value.sequence + 1
  const nextItem
    = (state.value.activeItem - stepSize + props.items.length)
    % props.items.length

  state.value = {
    ...state.value,
    direction: 'right',
    pendingUpdate: {
      sequence: nextSequence,
      activeItem: nextItem,
    },
  }
}

function handleTransitionEnd() {
  if (!isAnimating.value) return
  if (state.value.pendingUpdate) {
    state.value = {
      sequence: state.value.pendingUpdate.sequence,
      activeItem: state.value.pendingUpdate.activeItem,
      direction: 'neutral',
      pendingUpdate: null,
    }
  }
  isAnimating.value = false

  nextTick(() => {
    calculateGalleryItems()
  })
}

function startAutoScroll() {
  if (props.items.length <= 1) return
  if (!props.autoScroll || props.loading) return

  stopAutoScroll()
  autoScrollInterval = setInterval(() => {
    next()
  }, props.autoScrollDelay)
}

function stopAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
    autoScrollInterval = null
  }
}

function clearRestartTimeout() {
  if (restartTimeout) {
    clearTimeout(restartTimeout)
    restartTimeout = null
  }
}
function scheduleAutoScrollRestart() {
  clearRestartTimeout()
  if (!props.autoScrollRestartDelay) return
  restartTimeout = setTimeout(() => {
    startAutoScroll()
  }, props.autoScrollRestartDelay)
}

function onMouseEnterOrFocus() {
  stopAutoScroll()
}
function onMouseLeaveOrBlur() {
  if (!props.autoScroll) return
  scheduleAutoScrollRestart()
}

watch(
  () => props.loading,
  (newLoading) => {
    if (newLoading) {
      stopAutoScroll()
    }
    else if (!newLoading && props.autoScroll) {
      startAutoScroll()
    }
  },
)

watch(
  repositoryTags,
  (tagsNew) => {
    if (tagsNew && tagsNew.length >= 2) {
      tags.value = {
        latest: tagsNew[0]?.name,
        previous: tagsNew[1]?.name,
      }

      setTimeout(() => {
        initialAnimationPlayed.value = true
      }, 2800)
    }
  },
  { immediate: true },
)
</script>

<style scoped>
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
  --ribbon-link-color: var(--color-figure-blue);
  --ribbon-focus-color: var(--color-fill-blue);
  --ribbon-text-color: var(--color-fill-gray);
  --ribbon-background-color: var(--color-fill-tertiary);
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
  --ribbon-background-color: var(--color-fill-tertiary);
  --ribbon-background-color-initial: var(--color-fill-blue);
  --ribbon-text-color: var(--color-fill-gray);
  --ribbon-text-color-initial: #fff;
  --ribbon-link-color: var(--color-figure-blue);
  --ribbon-link-color-initial: #fff;
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
@media (prefers-reduced-motion) {
  .ribbon-drop-wrapper {
    animation: none;
  }
}
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
  cursor: pointer;
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
.with-paddlenav {
  position: relative;
}
.rc-gallery-paddlenav button {
  z-index: 1;
}
.rc-inline-gallery {
  position: relative;
}
.rc-acmibanner-enabled .rc-promo-ribbon,
.rc-ribbon.rc-ribbon-hide {
  display: none;
}
.rc-ribbon-content {
  width: 100%;
}
.rc-ribbon-content [data-core-gallery-item] {
  cursor: auto;
}
.rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow {
  color: var(--color-fill-gray-secondary);
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
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
