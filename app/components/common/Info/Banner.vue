<template>
  <div id="rotating-promo-banner">
    <div
      class="rc-ribbon ribbon rs-storehome-banner"
      :class="[
        { 'rc-ribbon-hide': !isVisible || loading },
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
                            {{ gallery.item.description + "&ensp;" }}
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
  InfoBannerProps,
} from '#shared/types/common/banner'

const props = withDefaults(defineProps<InfoBannerProps>(), {
  loading: false, // working
  step: 1, // working but calculateGalleryItems needs to be adjusted
  paddleNav: true, // working
  dropAnimation: true, // working
  themeAnimation: true, // working
  visibilityDelay: 700, // working
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

// const { t, tm, rt } = useI18n()
const config = useRuntimeConfig()

const isVisible = ref(false)
const isAnimating = ref(false)
const initialAnimationPlayed = ref(false)

const tags = ref<{
  latest: string | undefined
  previous: string | undefined
}>({ latest: undefined, previous: undefined })
// const links = tm('components.common.InfoBanner.links') as LinkType[]

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
    }, props.visibilityDelay)
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
      }, 2800 + props.visibilityDelay)
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

.paddlenav {
  --sk-paddlenav-diameter: 36px;
  --sk-paddlenav-background: #00000000;
  --sk-paddlenav-background-hover: #00000000;
  --sk-paddlenav-background-active: #00000000;
}

.paddlenav,
.paddlenav ul {
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

html[dir="rtl"] .paddlenav .paddlenav-arrow-next,
html[dir="rtl"] .paddlenav .paddlenav-arrow-previous {
  transform: rotate(180deg);
}

.paddlenav .paddlenav-arrow-down,
.paddlenav .paddlenav-arrow-up {
  left: 50%;
  margin-left: calc(var(--sk-paddlenav-diameter) * -0.5);
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

.paddlenav .paddlenav-arrow:focus-visible {
  outline: 2px solid var(--sk-focus-color, #0071e3);
  outline-offset: var(--sk-focus-offset-container, 3px);
}

.paddlenav .paddlenav-arrow.disabled,
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

.paddlenav .paddlenav-arrow-up {
  top: 18px;
}

.paddlenav .paddlenav-arrow-down {
  bottom: 18px;
}

.paddlenav-elevated {
  --sk-paddlenav-diameter: 56px;
}

.paddlenav-super {
  --sk-paddlenav-diameter: 90px;
}

.paddlenav-justified.paddlenav-outside .paddlenav-arrow-previous {
  inset-inline-start: 18px;
  inset-inline-start: calc((var(--sk-paddlenav-diameter) + 18px) * -1);
}

.paddlenav-justified.paddlenav-outside .paddlenav-arrow-next {
  inset-inline-end: 18px;
  inset-inline-end: calc((var(--sk-paddlenav-diameter) + 18px) * -1);
}

.paddlenav-side-aligned .paddlenav-arrow-next,
.paddlenav-side-aligned .paddlenav-arrow-previous {
  margin-top: calc((var(--sk-paddlenav-diameter) + 18px) * -1);
  top: 100%;
}

.paddlenav-side-aligned .paddlenav-arrow-previous {
  inset-inline-end: calc(var(--sk-paddlenav-diameter) + 36px);
  inset-inline-start: auto;
}

.paddlenav-side-aligned .paddlenav-arrow-next {
  inset-inline-end: 18px;
}

.paddlenav-side-aligned.paddlenav-outside .paddlenav-arrow-next,
.paddlenav-side-aligned.paddlenav-outside .paddlenav-arrow-previous {
  margin-top: 18px;
  top: 100%;
}

.paddlenav-side-aligned.paddlenav-outside .paddlenav-arrow-previous {
  inset-inline-end: calc(var(--sk-paddlenav-diameter) + 36px);
  inset-inline-end: calc(var(--sk-paddlenav-diameter) + 18px);
  inset-inline-start: auto;
}

.paddlenav-side-aligned.paddlenav-outside .paddlenav-arrow-next {
  inset-inline-end: 18px;
  inset-inline-end: 0;
}

.paddlenav-centered .paddlenav-arrow-next,
.paddlenav-centered .paddlenav-arrow-previous {
  margin-top: calc((var(--sk-paddlenav-diameter) + 18px) * -1);
  top: 100%;
}

.paddlenav-centered .paddlenav-arrow {
  inset-inline-end: auto;
  inset-inline-start: auto;
}

.paddlenav-centered .paddlenav-arrow-previous {
  margin-inline-start: calc((var(--sk-paddlenav-diameter) + 9px) * -1);
}

.paddlenav-centered .paddlenav-arrow-next {
  margin-inline-start: 9px;
}

.paddlenav-centered.paddlenav-outside .paddlenav-arrow-next,
.paddlenav-centered.paddlenav-outside .paddlenav-arrow-previous {
  margin-top: 18px;
  top: 100%;
}

.paddlenav-centered.paddlenav-outside .paddlenav-arrow {
  inset-inline-end: auto;
  inset-inline-start: auto;
}

.paddlenav-centered.paddlenav-outside .paddlenav-arrow-previous {
  margin-inline-start: calc((var(--sk-paddlenav-diameter) + 9px) * -1);
}

.paddlenav-centered.paddlenav-outside .paddlenav-arrow-next {
  margin-inline-start: 9px;
}

.with-paddlenav {
  position: relative;
}

html.no-touch .with-paddlenav-onhover .paddlenav-arrow {
  opacity: 0;
  transition:
    background 0.1s linear,
    color 0.1s linear,
    opacity 0.1s linear;
}

html.no-touch .with-paddlenav-onhover .paddlenav-arrow:focus-visible {
  opacity: 1;
}

html.no-touch .with-paddlenav-onhover:hover .paddlenav-arrow {
  opacity: 1;
}

html.no-touch .with-paddlenav-onhover .paddlenav-arrow.disabled,
html.no-touch .with-paddlenav-onhover .paddlenav-arrow:disabled {
  opacity: 0;
}

.with-paddlenav-visuallyhidden .paddlenav-arrow {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0 0 99.9% 99.9%);
}

.with-paddlenav-visuallyhidden .paddlenav-arrow:focus-visible,
.with-paddlenav-visuallyhidden .paddlenav-arrow:hover {
  clip: auto;
  clip-path: none;
}

.paddlenav.paddlenav-alpha {
  --sk-paddlenav-arrow-color: var(--sk-paddlenav-alpha-arrow-color);
  --sk-paddlenav-arrow-color-hover: var(--sk-paddlenav-alpha-arrow-color-hover);
  --sk-paddlenav-arrow-color-active: var(
    --sk-paddlenav-alpha-arrow-color-active
  );
  --sk-paddlenav-background: var(--sk-paddlenav-alpha-background);
  --sk-paddlenav-background-hover: var(--sk-paddlenav-alpha-background-hover);
  --sk-paddlenav-background-active: var(--sk-paddlenav-alpha-background-active);
}

.paddlenav.paddlenav-solid {
  --sk-paddlenav-arrow-color: var(--sk-paddlenav-slolid-arrow-color);
  --sk-paddlenav-arrow-color-hover: var(
    --sk-paddlenav-slolid-arrow-color-hover
  );
  --sk-paddlenav-arrow-color-active: var(
    --sk-paddlenav-slolid-arrow-color-active
  );
  --sk-paddlenav-background: var(--sk-paddlenav-slolid-background);
  --sk-paddlenav-background-hover: var(--sk-paddlenav-slolid-background-hover);
  --sk-paddlenav-background-active: var(
    --sk-paddlenav-slolid-background-active
  );
}

.rc-gallery-paddlenav button {
  z-index: 1;
}

.rc-inline-gallery-peek .rc-gallery-paddlenav .paddlenav-arrow-previous {
  inset-inline-start: 68px;
}

.rc-inline-gallery-peek .rc-gallery-paddlenav .paddlenav-arrow-next {
  inset-inline-end: 68px;
}

@media (max-width: 1023px) and (max-device-width: 736px) {
  .rc-inline-gallery-peek .rc-gallery-paddlenav .paddlenav-arrow-previous {
    inset-inline-start: 38px;
  }

  .rc-inline-gallery-peek .rc-gallery-paddlenav .paddlenav-arrow-next {
    inset-inline-end: 38px;
  }
}

.dotnav {
  --sk-dotnav-size: 8px;
  --sk-dotnav-margin-block: 0;
  --sk-dotnav-margin-inline: 8px;
  box-sizing: border-box;
  text-align: center;
}

.dotnav-items {
  display: inline-flex;
  justify-content: center;
  list-style: none;
  margin: 0;
}

.dotnav-item {
  list-style: none;
  margin-block: var(--sk-dotnav-margin-block);
  margin-inline: var(--sk-dotnav-margin-inline);
  position: relative;
}

.dotnav-item,
.dotnav-link {
  height: var(--sk-dotnav-size);
  width: var(--sk-dotnav-size);
}

.dotnav-link {
  background: var(--sk-dotnav-background);
  border-radius: 50%;
  box-sizing: border-box;
  left: 0;
  outline: none;
  padding: 0;
  position: absolute;
  top: 0;
}

.dotnav-link:hover {
  background: var(--sk-dotnav-background-hover);
}

.dotnav-link:focus-visible {
  outline: 2px solid var(--sk-focus-color, #0071e3);
  outline-offset: var(--sk-focus-offset-container, 3px);
}

.dotnav .current.dotnav-item .dotnav-link,
.dotnav .current.dotnav-link {
  background: var(--sk-dotnav-background-current);
  cursor: default;
}

.rc-gallery-dotnav {
  bottom: 18px;
  display: inline-block;
  inset-inline: 0;
  list-style: none;
  margin: auto;
  position: absolute;
  z-index: 1;
}

.rc-inline-gallery {
  position: relative;
}

.rc-inline-gallery-peek {
  overflow: hidden;
}

.rc-inline-gallery-peek [data-core-gallery] {
  margin: 0 40px;
  overflow: visible;
}

@media (max-width: 1023px) and (max-device-width: 736px) {
  .rc-inline-gallery-peek [data-core-gallery] {
    margin: 0 20px;
  }
}

.rc-inline-gallery-autoscroll .paddlenav-arrow {
  opacity: 0;
  transition: opacity 0.25 linear;
}

.rc-inline-gallery-autoscroll:hover .paddlenav-arrow {
  opacity: 1;
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

[data-core-gallery-fade="true"] [data-core-gallery-scroller] {
  position: relative;
}

[data-core-gallery-fade="true"] [data-core-gallery-scroller] > * {
  transition: opacity 0.4s ease;
}

[data-core-gallery-fade="true"]
  [data-core-gallery-scroller]
  > :not(:first-child) {
  inset-inline-start: -50%;
  position: relative;
}

[data-core-gallery-fade="true"] [data-core-gallery-scroller] > :first-child {
  opacity: 0;
  z-index: 1;
}

[data-core-gallery-item] {
  cursor: pointer;
  overflow: hidden;
  width: 100%;
}

.rc-inline-gallery-item {
  text-align: center;
}

.rc-inline-gallery-item .rc-inline-gallery-image {
  height: auto;
  max-height: 90%;
  max-width: 90%;
}

.rc-inline-gallery-peek .rc-inline-gallery-item {
  border-radius: 18px;
  margin: 0 10px;
}

@media (max-width: 1023px) and (max-device-width: 736px) {
  .rc-inline-gallery-peek .rc-inline-gallery-item {
    margin: 0 5px;
  }
}

#rotating-promo-banner {
  margin-top: 48px;
}

@media screen and (min-width: 768px) {
  #rotating-promo-banner {
    margin-top: 52px;
  }
}

.ribbon {
  --ribbon-link-inline-color: inherit;
  --ribbon-content-padding-top: 16px;
  --ribbon-content-padding-bottom: var(--ribbon-content-padding-top);
  --ribbon-content-width: 83.33333%;
  --ribbon-content-minimum-width: 320px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
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

.ribbon-link {
  white-space: nowrap;
}

.ribbon-link:focus {
  outline: 2px solid var(--sk-focus-color, #0071e3);
  outline-offset: var(--sk-focus-offset, 1px);
}

.ribbon-link-inline {
  color: var(--ribbon-link-inline-color);
}

.ribbon-link-inline,
.ribbon-link-inline:link {
  text-decoration: underline;
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

.ribbon-link {
  color: var(--ribbon-link-color);
}

.ribbon-link:focus {
  outline-color: var(--ribbon-focus-color);
}

.ribbon-elevated {
  --ribbon-content-padding-top: 24px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: -0.022em;
  line-height: 1.4705882353;
}

.ribbon-elevated.ribbon-inset {
  --ribbon-border-radius: 12px;
}

.ribbon-blue {
  --ribbon-background-color: var(--ribbon-blue-background-color);
  --ribbon-text-color: var(--ribbon-blue-text-color);
  --ribbon-link-color: var(--ribbon-blue-link-color);
  --ribbon-focus-color: var(--ribbon-blue-focus-color);
}

.ribbon-variant-neutral-alpha {
  --ribbon-background-color: var(--ribbon-neutral-alpha-background-color);
}

.ribbon-variant-neutral-alt {
  --ribbon-background-color: var(--ribbon-neutral-alt-background-color);
}

.ribbon-blue-to-default {
  --ribbon-background-color: var(--ribbon-blue-to-default-background-color);
  --ribbon-background-color-initial: var(
    --ribbon-blue-to-default-background-color-initial
  );
  --ribbon-text-color: var(--ribbon-blue-to-default-text-color);
  --ribbon-text-color-initial: var(--ribbon-blue-to-default-text-color-initial);
  --ribbon-link-color: var(--ribbon-blue-to-default-link-color);
  --ribbon-link-color-initial: var(--ribbon-blue-to-default-link-color-initial);
}

@keyframes ribbon-animate-background {
  0% {
    background-color: var(--ribbon-background-color-initial);
  }

  to {
    background-color: var(--ribbon-background-color);
  }
}

.ribbon-animate-color .ribbon-content-wrapper {
  animation: ribbon-animate-background 0.8s ease-in-out 1.6s forwards;
  background-color: var(--ribbon-background-color-initial);
}

@media (prefers-reduced-motion) {
  .ribbon-animate-color .ribbon-content-wrapper {
    animation: none;
    background-color: var(--ribbon-background-color);
  }
}

@keyframes ribbon-animate-text-color {
  0% {
    color: var(--ribbon-text-color-initial);
  }

  to {
    color: var(--ribbon-text-color);
  }
}

.ribbon-animate-color .ribbon-content {
  animation: ribbon-animate-text-color 0.8s ease-in-out 1.6s forwards;
  color: var(--ribbon-text-color-initial);
}

@media (prefers-reduced-motion) {
  .ribbon-animate-color .ribbon-content {
    animation: none;
    color: var(--ribbon-text-color);
  }
}

@keyframes ribbon-animate-link-color {
  0% {
    color: var(--ribbon-link-color-initial);
  }

  to {
    color: var(--ribbon-link-color);
  }
}

.ribbon-animate-color .ribbon-link {
  animation: ribbon-animate-link-color 0.8s ease-in-out 1.6s forwards;
  color: var(--ribbon-link-color-initial);
}

@media (prefers-reduced-motion) {
  .ribbon-animate-color .ribbon-link {
    animation: none;
    color: var(--ribbon-link-color);
  }
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

@keyframes animate-background-0071e3-f5f5f7 {
  0% {
    background-color: var(--color-fill-blue);
  }
  to {
    background-color: var(--ribbon-background-color);
  }
}

@keyframes animate-color-fff-1d1d1f {
  0% {
    color: white;
  }
  to {
    color: var(--ribbon-text-color);
  }
}

@keyframes animate-color-fff-06c {
  0% {
    color: white;
  }
  to {
    color: var(--ribbon-link-color);
  }
}

.ribbon-drop-wrapper {
  animation: ribbon-drop 0.8s ease-in-out forwards;
}

@media (prefers-reduced-motion) {
  .ribbon-drop-wrapper {
    animation: none;
  }
}

.ribbon-inset {
  --ribbon-width: 83.33333%;
  --ribbon-padding-top: 16px;
  --ribbon-border-radius: 10px;
  margin: 0 auto;
}

.ribbon-inset .ribbon-content {
  width: var(--ribbon-width);
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .ribbon-inset {
    --ribbon-width: 87.5%;
  }

  .ribbon-inset .ribbon-content {
    min-width: var(--ribbon-width);
  }
}

.ribbon-blur {
  --ribbon-background-blur: 20px;
}

@keyframes ribbon-drop {
  0% {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
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

@keyframes animate-opacity {
  0% {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow {
  color: var(--color-fill-gray-secondary);
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.009em;
  line-height: 1.3334133333;
}

@media (max-width: 1023px) and (max-device-width: 736px) {
  .rc-ribbon-content-autoscroll .paddlenav .paddlenav-arrow {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
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
  content: "";
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

html[dir="rtl"] .with-paddlenav .rc-ribbon-content-autoscroll:before {
  background-image: linear-gradient(
    to left,
    var(--ribbon-background-color) 16px,
    #fff0
  );
}

@media (max-width: 1023px) and (max-device-width: 736px) {
  html[dir="rtl"] .with-paddlenav .rc-ribbon-content-autoscroll:before {
    background-image: linear-gradient(
      to left,
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

html[dir="rtl"] .with-paddlenav .rc-ribbon-content-autoscroll:after {
  background-image: linear-gradient(
    to right,
    var(--ribbon-background-color) 16px,
    #fff0
  );
}

@media (max-width: 1023px) and (max-device-width: 736px) {
  html[dir="rtl"] .with-paddlenav .rc-ribbon-content-autoscroll:after {
    background-image: linear-gradient(
      to right,
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
  color: var(--ribbon-link-color);
}

.rc-ribbon-content-item-base {
  padding: 3px 0;
  white-space: normal;
}

.rc-ribbon-content-item-base .more {
  display: inline-block;
}

.rc-ribbon .ribbon-content-wrapper {
  padding: em(13px) 0;
}

.rc-ribbon .ribbon-content-wrapper .ribbon-content {
  margin-inline-end: auto;
  margin-inline-start: auto;
  width: 90%;
}

@media (min-width: 1441px) {
  .rc-ribbon .ribbon-content-wrapper .ribbon-content {
    margin-inline-end: auto;
    margin-inline-start: auto;
    width: 90%;
  }
}

@media (max-width: 1023px) and (max-device-width: 736px) {
  .rc-ribbon .ribbon-content-wrapper .ribbon-content {
    margin-inline-end: auto;
    margin-inline-start: auto;
    width: 82.5%;
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

.rc-ribbon-gallery-item[aria-hidden="true"] a,
.rc-ribbon-gallery-item[aria-hidden="true"] button {
  display: inline-block;
  visibility: hidden;
}

.rc-ribbon-content-item {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-inline: auto;
  position: relative;
  width: 90%;
}

@media (max-width: 1023px) and (max-device-width: 736px) {
  .rc-ribbon-content-item {
    width: 87.5%;
  }
}

.ribbon:not(.rc-promo-ribbon) ~ .rs-root-reveal .rc-acmi-banner {
  border-top: 1px solid #d2d2d7;
}

.rc-ribbon .ribbon-link {
  position: relative;
}
</style>
