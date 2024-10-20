<template>
  <section class="section section-cards">
    <div class="section-content-responsive">
      <div class="cards-container">
        <div
          class="tile tile-music-discovery tile-rounded media-full-bleed near-card"
          :style="{ '--tile-height': `${tileHeight}px` }"
        >
          <div class="tile-foc">
            <div class="tile-content">
              <div class="tile-copy">
                <h3
                  v-animation="{ add: 'fade-in' }"
                  class="tile-eyebrow typography-eyebrow-super"
                >
                  {{ title }}
                </h3>
                <h4
                  ref="headlineRef"
                  v-animation="{ add: 'animate' }"
                  class="tile-headline typography-headline-super swipe-up-reveal text-gradient"
                >
                  <span
                    v-for="(line, index) in headlineLines"
                    :key="index"
                    class="line"
                  >
                    <span class="words">{{ line }}</span>
                  </span>
                </h4>
              </div>
            </div>
            <div
              ref="parallaxRef"
              :class="[
                'parallax',
                { animate: isParallaxAnimated, paused: !playing },
              ]"
            >
              <template
                v-for="(item, index) in parallaxItems"
                :key="index"
              >
                <span
                  v-if="item.type === 'empty'"
                  :class="item.class"
                />
                <div
                  v-else
                  class="img-wrapper"
                >
                  <figure
                    class="parallax-item"
                    :class="{ float: isParallaxAnimated }"
                    :data-i="item.dataI"
                    :style="getParallaxItemStyle(item)"
                  />
                </div>
              </template>
            </div>
            <button
              ref="playPauseButtonRef"
              class="play-pause-button"
              :class="{ playing, paused: !playing }"
              @click="togglePlayPause()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="control-centered-small-icon"
              >
                <g class="control-icon-pause">
                  <rect
                    width="4.5"
                    height="14"
                    x="3.75"
                    y="3"
                    rx="1.5"
                  />
                  <rect
                    width="4.5"
                    height="14"
                    x="11.75"
                    y="3"
                    rx="1.5"
                  />
                </g>
                <path
                  class="control-icon-play"
                  d="M5 15.25V4.77a1.44 1.44 0 0 1 1.44-1.62 1.86 1.86 0 0 1 1.11.31l8.53 5c.76.44 1.17.8 1.17 1.51s-.41 1.07-1.17 1.51l-8.53 5a1.86 1.86 0 0 1-1.11.31A1.42 1.42 0 0 1 5 15.25Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BasicPropertiesType } from '~/types/common/basic-properties'

const props = withDefaults(defineProps<BasicPropertiesType>(), {
  title: 'Music Discovery',
  description: 'Where your new favorites find you.',
})

const headlineRowCount = ref(2)
const playing = ref(true)
const isParallaxAnimated = ref(false)

const parallaxRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)
const playPauseButtonRef = ref<HTMLElement | null>(null)

const { width: tileWidth, height: tileHeight } = useElementSize(parallaxRef)

const isParallaxVisible = useElementVisibility(parallaxRef)

const headlineLines = computed(() => {
  const words = props.description.split(' ')
  const lines = []
  const wordsPerLine = Math.ceil(words.length / headlineRowCount.value)

  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(' '))
  }

  return lines
})

interface EmptyItem {
  type: 'empty'
  class: string
}

interface ImageItem {
  type: 'image'
  dataI: number
}

type ParallaxItem = EmptyItem | ImageItem

const parallaxItems = ref<ParallaxItem[]>([
  { type: 'empty', class: 'leave-empty' },
  { type: 'empty', class: 'leave-empty-row' },
  { type: 'empty', class: 'leave-empty-clone' },
  ...Array.from(
    { length: 32 },
    (_, i): ImageItem => ({
      type: 'image',
      dataI: Math.floor(Math.random() * 32),
    })
  ),
])

const getParallaxItemStyle = (item: ParallaxItem) => {
  if (item.type !== 'image') return {}

  const duration = [
    'var(--duration-original)',
    'var(--duration-fast-1)',
    'var(--duration-fast-2)',
    'var(--duration-fast-3)',
  ][Math.floor(Math.random() * 4)]
  const transform = `calc(var(--tile-min-height) * -${Math.random() * 2 + 2} - var(--tile-anim-offset))`
  const zIndex = Math.random() > 0.5 ? 2 : 1

  return {
    '--duration': duration,
    '--transform': transform,
    'z-index': zIndex,
    'background-image':
      'url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/personal_station__eq6o2f0yqy6a_large.jpg)',
  }
}

// const shuffleImages = () => {
//   const numImages = 32
//   const indices: number[] = Array.from({ length: numImages }, (_, i) => i)
//   for (let i = indices.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [indices[i]!, indices[j]!] = [indices[j]!, indices[i]!]
//   }
//   images.value = indices
// }

// interface Cover {
//   id: number
//   x: number
//   y: number
//   scale: number
// }

// const initializeCovers = () => {
//   const numCovers = 32
//   covers.value = Array.from({ length: numCovers }, (_, index) => ({
//     id: index,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     scale: 0.8 + Math.random() * 0.4,
//   }))
//   shuffleCovers()
// }

// const shuffleCovers = () => {
//   shuffledCovers.value = [...covers.value].sort(() => Math.random() - 0.5)
// }

// const getCoverStyle = (cover: Cover) => ({
//   transform: `translate(${cover.x}%, ${cover.y}%) scale(${cover.scale})`,
//   backgroundImage: `url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/cover_${cover.id + 1}.jpg)`,
// })

const togglePlayPause = useToggle(playing)

const setupParallaxAnimation = () => {
  if (!isParallaxVisible.value) return
  isParallaxAnimated.value = true
}

const debouncedSetupParallaxAnimation = useDebounceFn(
  setupParallaxAnimation,
  200
)

onMounted(() => {
  useIntervalFn(() => {
    if (!isParallaxVisible.value) return
    debouncedSetupParallaxAnimation()
  }, 1000)
})
</script>

<style scoped>
h3,
h4 {
  font-weight: 600;
  color: var(--sk-headline-text-color, var(--color-fill-gray));
}
h3 + * {
  margin-top: var(--sk-headline-plus-first-element-margin, 0.8em);
}
h3 + h4 {
  margin-top: var(--sk-headline-plus-headline-margin, 0.4em);
}
.tile {
  margin-inline-start: auto;
  margin-inline-end: auto;
  --sk-tile-box-shadow: initial;
  --sk-tile-background: var(--color-fill);
  --sk-tile-button-background: rgba(210, 210, 215, 0.64);
  --sk-tile-button-background-hover: rgba(223, 223, 227, 0.6976);
  --sk-tile-button-background-active: rgba(193, 193, 198, 0.6544);
  --sk-tile-button-icon-color: rgba(0, 0, 0, 0.56);
  --sk-tile-button-icon-color-hover: rgba(0, 0, 0, 0.64);
  box-sizing: border-box;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: var(--sk-tile-background);
  box-shadow: var(--sk-tile-box-shadow);
}
.tile-content {
  --sk-tile-padding-xlarge: var(--sk-tile-padding);
  --sk-tile-padding-large: var(--sk-tile-padding, 60px 8.3333333333%);
  --sk-tile-padding-medium: var(
    --sk-tile-padding,
    var(--sk-tile-padding-xlarge)
  );
  --sk-tile-padding-narrow-medium: var(
    --sk-tile-padding,
    var(--sk-tile-padding-xlarge)
  );
  --sk-tile-padding-small: var(
    --sk-tile-padding,
    var(--sk-tile-padding-xlarge)
  );
  --sk-tile-padding-xsmall: var(
    --sk-tile-padding,
    var(--sk-tile-padding-xlarge)
  );
  padding: var(--sk-tile-padding-large);
}
@media only screen and (min-width: 1920px) {
  .tile-content {
    padding: var(--sk-tile-padding-xlarge);
  }
}
@media only screen and (max-width: 1068px) {
  .tile-content {
    padding: var(--sk-tile-padding-medium);
  }
}
@media only screen and (max-width: 926px) {
  .tile-content {
    padding: var(--sk-tile-padding-narrow-medium);
  }
}
@media only screen and (max-width: 734px) {
  .tile-content {
    padding: var(--sk-tile-padding-small);
  }
}
@media only screen and (max-width: 480px) {
  .tile-content {
    padding: var(--sk-tile-padding-xsmall);
  }
}
.tile-rounded {
  --sk-tile-border-radius-xlarge: var(--sk-tile-border-radius);
  --sk-tile-border-radius-large: var(--sk-tile-border-radius, 18px);
  --sk-tile-border-radius-medium: var(
    --sk-tile-border-radius,
    var(--sk-tile-border-radius-xlarge)
  );
  --sk-tile-border-radius-narrow-medium: var(
    --sk-tile-border-radius,
    var(--sk-tile-border-radius-xlarge)
  );
  --sk-tile-border-radius-small: var(
    --sk-tile-border-radius,
    var(--sk-tile-border-radius-xlarge)
  );
  --sk-tile-border-radius-xsmall: var(
    --sk-tile-border-radius,
    var(--sk-tile-border-radius-xlarge)
  );
  border-radius: var(--sk-tile-border-radius-large);
}
@media only screen and (min-width: 1920px) {
  .tile-rounded {
    border-radius: var(--sk-tile-border-radius-xlarge);
  }
}
@media only screen and (max-width: 1068px) {
  .tile-rounded {
    border-radius: var(--sk-tile-border-radius-medium);
  }
}
@media only screen and (max-width: 926px) {
  .tile-rounded {
    border-radius: var(--sk-tile-border-radius-narrow-medium);
  }
}
@media only screen and (max-width: 734px) {
  .tile-rounded {
    border-radius: var(--sk-tile-border-radius-small);
  }
}
@media only screen and (max-width: 480px) {
  .tile-rounded {
    border-radius: var(--sk-tile-border-radius-xsmall);
  }
}
.section-content-responsive {
  margin-inline: auto;
  width: 87.5vw;
  max-width: 1260px;
}
@media only screen and (max-width: 734px) {
  .section-content-responsive {
    max-width: 480px;
  }
}
.text-gradient,
.swipe-up-reveal.text-gradient .words {
  background: var(--color-fill-gray);
  background-clip: text;
  -webkit-text-fill-color: rgba(0, 0, 0, 0);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  background-image: linear-gradient(
    129deg,
    #e83273,
    #e43240,
    #dc4c24,
    #bd271a,
    #991e2f
  );
}
.swipe-up-reveal {
  opacity: 0;
}
.swipe-up-reveal .line {
  display: block;
  position: relative;
  overflow: hidden;
}
.swipe-up-reveal .line:first-child .words {
  transition-delay: 300ms;
}
.swipe-up-reveal .line:nth-child(2) .words {
  transition-delay: 600ms;
}
.swipe-up-reveal .line:nth-child(3) .words {
  transition-delay: 900ms;
}
.swipe-up-reveal .words {
  display: block;
  transform: translateY(100%);
  transition: transform 0.5s;
}
.swipe-up-reveal.animate {
  opacity: 1;
}
.swipe-up-reveal.animate .words {
  transform: translateY(0);
}
.typography-headline-super {
  font-size: 80px;
  line-height: 1.1;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
@media only screen and (max-width: 1068px) {
  .typography-headline-super {
    font-size: 64px;
    line-height: 1.1125;
    font-weight: 600;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .typography-headline-super {
    font-size: 48px;
    line-height: 1.1334933333;
    font-weight: 600;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
.typography-eyebrow-super {
  font-size: 32px;
  line-height: 1.175;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
@media only screen and (max-width: 1068px) {
  .typography-eyebrow-super {
    font-size: 28px;
    line-height: 1.1928571429;
    font-weight: 600;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .typography-eyebrow-super {
    font-size: 24px;
    line-height: 1.2166666667;
    font-weight: 600;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
[class*="typography-eyebrow"] {
  display: block;
  margin-bottom: 0.4em;
}
[class*="typography-eyebrow"] + * {
  margin-top: 0;
}
/*! CSS Used from: https://www.apple.com/v/apple-music/ab/built/styles/overview.built.css */
.section-content-responsive {
  margin-inline: auto;
  width: 87.5vw;
  max-width: 1260px;
}
@media only screen and (max-width: 734px) {
  .section-content-responsive {
    max-width: 480px;
  }
}
.text-gradient,
.swipe-up-reveal.text-gradient .words {
  background: var(--color-fill-gray);
  background-clip: text;
  -webkit-text-fill-color: rgba(0, 0, 0, 0);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  background-image: linear-gradient(
    129deg,
    #e83273,
    #e43240,
    #dc4c24,
    #bd271a,
    #991e2f
  );
}
.swipe-up-reveal {
  opacity: 0;
}
.swipe-up-reveal .line {
  display: block;
  position: relative;
  overflow: hidden;
}
.swipe-up-reveal .line:first-child .words {
  transition-delay: 300ms;
}
.swipe-up-reveal .line:nth-child(2) .words {
  transition-delay: 600ms;
}
.swipe-up-reveal .line:nth-child(3) .words {
  transition-delay: 900ms;
}
.swipe-up-reveal .words {
  display: block;
  transform: translateY(100%);
  transition: transform 0.5s;
}
.swipe-up-reveal.animate {
  opacity: 1;
}
.swipe-up-reveal.animate .words {
  transform: translateY(0);
}
.play-pause-button {
  --scrim-background-color: rgba(210, 210, 215, 0.64);
  --scrim-hover-background-color: rgba(223, 223, 227, 0.6976);
  --scrim-active-background-color: rgba(193, 193, 198, 0.6544);
  --icon-color: rgba(0, 0, 0, 0.56);
  --icon-interaction-color: rgba(0, 0, 0, 0.64);
  border-radius: 50%;
  display: flex;
  align-items: center;
  height: 36px;
  width: 36px;
  outline: none;
  margin: var(--button-v-position) 0 0 0;
  padding: 0;
  border: 0;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 100ms linear,
    color 100ms linear;
  background-color: var(--scrim-background-color);
  color: var(--icon-color);
}
@media only screen and (max-width: 734px) {
  .play-pause-button {
    height: 30px;
    width: 30px;
  }
}
.play-pause-button:hover {
  background-color: var(--scrim-hover-background-color);
  color: var(--icon-interaction-color);
}
.play-pause-button svg {
  fill: currentColor;
  pointer-events: none;
}
.play-pause-button .control-centered-small-icon {
  height: 20px;
  width: 20px;
}
@media only screen and (max-width: 734px) {
  .play-pause-button .control-centered-small-icon {
    width: 16px;
    height: 16px;
  }
}
.play-pause-button.paused .control-icon-play {
  display: block;
}
.play-pause-button.paused .control-icon-pause {
  display: none;
}
.play-pause-button.playing .control-icon-play {
  display: none;
}
.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: stretch;
  grid-column-gap: 30px;
  column-gap: 30px;
  grid-row-gap: 30px;
  row-gap: 30px;
}
.cards-container .tile {
  --sk-tile-border-radius-large: 30px;
  --sk-tile-border-radius-small: 20px;
  --card-duration: 450ms;
  --card-delay: 900ms;
  background-color: var(--color-fill-tertiary);
  grid-column-start: span 2;
  width: 100%;
  clip-path: inset(1px 1px 1px 1px round var(--sk-tile-border-radius-large));
  --sk-tile-padding: 80px;
}
@media only screen and (max-width: 1068px) {
  .cards-container .tile {
    --sk-tile-padding: 48px;
  }
}
@media only screen and (max-width: 734px) {
  .cards-container .tile {
    --sk-tile-padding: 36px;
  }
}
@media only screen and (max-width: 480px) {
  .cards-container .tile {
    --sk-tile-padding: 25px;
  }
}
.cards-container .tile-foc {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.2s ease;
}
.cards-container .tile-content {
  box-sizing: border-box;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}
@media only screen and (max-width: 734px) {
  .cards-container .tile-content {
    padding-block: 60px 80px;
    text-align: initial;
    justify-content: flex-start;
    width: auto;
  }
}
.cards-container .tile .tile-eyebrow {
  opacity: 0.6;
}
.page-overview .cards-container .tile .tile-eyebrow {
  opacity: 0;
  transition: opacity 0.5s;
}

.page-overview .cards-container .tile .tile-eyebrow.fade-in {
  opacity: 0.6;
}
.cards-container .tile.media-full-bleed .play-pause-button {
  position: absolute;
  z-index: 6;
  bottom: 20px;
  inset-inline-end: 71px;
}
@media only screen and (max-width: 734px) {
  .cards-container .tile.media-full-bleed .play-pause-button {
    inset-inline-end: 61px;
  }
}
.cards-container .tile.near-card {
  will-change: transform, opacity;
}
.section-cards {
  position: relative;
  overflow: hidden;
  padding-block: 34px;
}
.section-cards .cards-container .tile {
  min-height: 718px;
}
@media only screen and (max-width: 1068px) {
  .section-cards .cards-container .tile {
    min-height: 550px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards .cards-container .tile {
    min-height: 565px;
  }
}
@media only screen and (max-width: 480px) {
  .section-cards .cards-container .tile-headline {
    font-size: 46px;
  }
}
.section-cards .cards-container .tile-music-discovery {
  --rows: 14;
  --columns: 5;
  --tile-min-height: 718px;
  --tile-row-height: 278px;
  --tile-anim-offset: 490px;
  min-height: var(--tile-min-height);
}
@media only screen and (max-width: 1068px) {
  .section-cards .cards-container .tile-music-discovery {
    --tile-min-height: 587px;
    --tile-row-height: 195px;
    --tile-anim-offset: 190px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards .cards-container .tile-music-discovery {
    --tile-row-height: 230px;
    --tile-anim-offset: 175px;
  }
}
.section-cards .cards-container .tile-music-discovery .tile-foc:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.05);
}
.section-cards .cards-container .tile-music-discovery .tile-headline {
  filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.2));
}
.section-cards .cards-container .tile-music-discovery .tile-copy {
  max-width: 60ch;
}
.section-cards .cards-container .tile-music-discovery .parallax {
  --num-images: 32;
  position: absolute;
  top: 0;
  width: 100%;
  height: auto;
  left: 50%;
  transform: translate(-50%, 25%);
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  transition:
    transform 0.7s cubic-bezier(0, 0.25, 0.5, 1),
    opacity 0.6s ease-out;
  opacity: 0.001;
}
@media only screen and (max-width: 1068px) {
  .section-cards .cards-container .tile-music-discovery .parallax {
    min-width: 934px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards .cards-container .tile-music-discovery .parallax {
    min-width: 480px;
    grid-template-rows: repeat(var(--rows), var(--tile-row-height));
    left: 240px;
  }
}
@media only screen and (max-width: 480px) {
  .section-cards .cards-container .tile-music-discovery .parallax {
    top: calc(var(--tile-height) / 2 - var(--tile-min-height) / 2);
  }
}
.section-cards .cards-container .tile-music-discovery .parallax.animate {
  opacity: 0.999;
  transform: translate(-50%);
}
.section-cards .cards-container .tile-music-discovery .parallax .leave-empty {
  grid-row: 2/2;
  grid-column: 2/5;
  height: var(--tile-row-height);
}
@media only screen and (max-width: 734px) {
  .section-cards .cards-container .tile-music-discovery .parallax .leave-empty {
    grid-column: 1/6;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .leave-empty-row {
  grid-row: 7/7;
  grid-column: 2/6;
  height: var(--tile-row-height);
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .leave-empty-row {
    grid-column: 4/6;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .leave-empty-clone {
  grid-row: 9/9;
  grid-column: 2/5;
  height: var(--tile-row-height);
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .leave-empty-clone {
    grid-column: 1/6;
  }
}
.section-cards .cards-container .tile-music-discovery .parallax .img-wrapper {
  position: relative;
  --cover-sd: 180px;
  --cover-lg: 170px;
  --cover-md: 148px;
  --cover-sm: 130px;
}
@media only screen and (max-width: 1068px) {
  .section-cards .cards-container .tile-music-discovery .parallax .img-wrapper {
    --cover-sd: 130px;
    --cover-lg: 120px;
    --cover-md: 105px;
    --cover-sm: 95px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards .cards-container .tile-music-discovery .parallax .img-wrapper {
    --cover-sd: 120px;
    --cover-lg: 110px;
    --cover-md: 100px;
    --cover-sm: 80px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:first-of-type
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 55px;
  top: 0px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:first-of-type
    figure {
    left: 50px;
    top: -38px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:first-of-type
    figure {
    left: 16px;
    top: 55px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(2)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: 30px;
  top: 84px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(2)
    figure {
    left: -11px;
    top: 21px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(2)
    figure {
    left: -8px;
    top: -15px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(3)
  figure {
  width: var(--cover-md);
  height: var(--cover-md);
  left: 82px;
  top: 18px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(3)
    figure {
    left: 41px;
    top: -19px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(3)
    figure {
    left: 61px;
    top: 40px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(4)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 19px;
  top: -55px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(4)
    figure {
    left: -2px;
    top: -54px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(4)
    figure {
    left: 69px;
    top: -47px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(5)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -30px;
  top: 40px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(5)
    figure {
    left: -67px;
    top: -19px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(5)
    figure {
    left: 9px;
    top: 121px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(6)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -21px;
  top: 41px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(6)
    figure {
    left: -6px;
    top: -64px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(6)
    figure {
    left: -34px;
    top: -58px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(7)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 140px;
  top: 0px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(7)
    figure {
    left: 106px;
    top: -16px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(7)
    figure {
    left: 2px;
    top: 43px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(8)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -118px;
  top: 87px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(8)
    figure {
    left: -91px;
    top: 64px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(8)
    figure {
    left: 33px;
    top: -84px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(9)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: -138px;
  top: -38px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(9)
    figure {
    left: -115px;
    top: -38px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(9)
    figure {
    left: 53px;
    top: 59px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(10)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: -169px;
  top: 63px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(10)
    figure {
    left: -110px;
    top: 63px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(10)
    figure {
    left: 14px;
    top: -97px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(11)
  figure {
  width: var(--cover-md);
  height: var(--cover-md);
  left: -142px;
  top: 28px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(11)
    figure {
    left: -116px;
    top: 2px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(11)
    figure {
    left: -14px;
    top: 129px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(12)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -2px;
  top: -82px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(12)
    figure {
    left: -11px;
    top: -93px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(12)
    figure {
    left: -85px;
    top: -17px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(13)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 56px;
  top: -15px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(13)
    figure {
    left: 49px;
    top: 7px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(13)
    figure {
    left: -2px;
    top: -61px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(14)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: 30px;
  top: 72px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(14)
    figure {
    left: -10px;
    top: 66px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(14)
    figure {
    left: -48px;
    top: 61px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(15)
  figure {
  width: var(--cover-md);
  height: var(--cover-md);
  left: 82px;
  top: 0px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(15)
    figure {
    left: 41px;
    top: 26px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(15)
    figure {
    left: 13px;
    top: -39px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(16)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: 18px;
  top: 100px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(16)
    figure {
    left: 0px;
    top: 89px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(16)
    figure {
    left: 15px;
    top: 105px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(17)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: -182px;
  top: -134px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(17)
    figure {
    left: -144px;
    top: -71px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(17)
    figure {
    left: -3px;
    top: -23px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(18)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -20px;
  top: -50px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(18)
    figure {
    left: -5px;
    top: -22px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(18)
    figure {
    left: 45px;
    top: 19px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(19)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: 80px;
  top: 60px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(19)
    figure {
    left: 26px;
    top: 84px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(19)
    figure {
    left: 69px;
    top: -137px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(20)
  figure {
  width: var(--cover-md);
  height: var(--cover-md);
  left: 108px;
  top: 0px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(20)
    figure {
    left: 132px;
    top: 45px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(20)
    figure {
    left: -7px;
    top: -6px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(21)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: 71px;
  top: 66px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(21)
    figure {
    left: 85px;
    top: 107px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(21)
    figure {
    left: -29px;
    top: 64px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(22)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -29px;
  top: -200px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(22)
    figure {
    left: -11px;
    top: -170px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(22)
    figure {
    left: 114px;
    top: -60px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(23)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 113px;
  top: -60px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(23)
    figure {
    left: 72px;
    top: 72px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(23)
    figure {
    left: -80px;
    top: 38px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(24)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: 28px;
  top: 105px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(24)
    figure {
    left: 102px;
    top: 114px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(24)
    figure {
    left: 54px;
    top: -10px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(25)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: 50px;
  top: 0px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(25)
    figure {
    left: -7px;
    top: -33px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(25)
    figure {
    left: 43px;
    top: -120px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(26)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: 22px;
  top: 80px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(26)
    figure {
    left: -22px;
    top: 87px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(26)
    figure {
    left: 232px;
    top: -96px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(27)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 144px;
  top: -270px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(27)
    figure {
    left: 106px;
    top: -101px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(27)
    figure {
    left: 39px;
    top: -43px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(28)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: 400%;
  top: -370px;
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(28)
    figure {
    left: 735px;
    top: -178px;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(28)
    figure {
    left: 200px;
    top: -86px;
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(29)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 55px;
  top: calc(-220px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(29)
    figure {
    left: 50px;
    top: calc(-115px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(29)
    figure {
    left: 16px;
    top: calc(-85px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(30)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: 30px;
  top: calc(-136px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(30)
    figure {
    left: -11px;
    top: calc(-56px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(30)
    figure {
    left: -8px;
    top: calc(-155px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(31)
  figure {
  width: var(--cover-md);
  height: var(--cover-md);
  left: 82px;
  top: calc(-202px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(31)
    figure {
    left: 41px;
    top: calc(-96px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(31)
    figure {
    left: 61px;
    top: calc(-100px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(32)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 19px;
  top: calc(-275px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(32)
    figure {
    left: -2px;
    top: calc(-131px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(32)
    figure {
    left: 69px;
    top: calc(-187px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(33)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -30px;
  top: calc(-180px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(33)
    figure {
    left: -67px;
    top: calc(-96px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(33)
    figure {
    left: 9px;
    top: calc(-19px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(34)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -21px;
  top: calc(-179px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(34)
    figure {
    left: -6px;
    top: calc(-141px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(34)
    figure {
    left: -34px;
    top: calc(-198px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(35)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 140px;
  top: calc(-220px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(35)
    figure {
    left: 106px;
    top: calc(-93px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(35)
    figure {
    left: 2px;
    top: calc(-97px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(36)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -118px;
  top: calc(-133px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(36)
    figure {
    left: -91px;
    top: calc(-13px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(36)
    figure {
    left: 33px;
    top: calc(-224px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(37)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: -138px;
  top: calc(-258px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(37)
    figure {
    left: -115px;
    top: calc(-115px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(37)
    figure {
    left: 53px;
    top: calc(-81px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(38)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: -169px;
  top: calc(-157px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(38)
    figure {
    left: -110px;
    top: calc(-14px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(38)
    figure {
    left: 14px;
    top: calc(-237px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(39)
  figure {
  width: var(--cover-md);
  height: var(--cover-md);
  left: -142px;
  top: calc(-192px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(39)
    figure {
    left: -116px;
    top: calc(-75px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(39)
    figure {
    left: -14px;
    top: calc(-11px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(40)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -2px;
  top: calc(-302px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(40)
    figure {
    left: -11px;
    top: calc(-170px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(40)
    figure {
    left: -85px;
    top: calc(-157px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(41)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 56px;
  top: calc(-235px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(41)
    figure {
    left: 49px;
    top: calc(-70px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(41)
    figure {
    left: -2px;
    top: calc(-201px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(42)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: 30px;
  top: calc(-148px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(42)
    figure {
    left: -10px;
    top: calc(-11px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(42)
    figure {
    left: -48px;
    top: calc(-79px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(43)
  figure {
  width: var(--cover-md);
  height: var(--cover-md);
  left: 82px;
  top: calc(-220px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(43)
    figure {
    left: 41px;
    top: calc(-51px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(43)
    figure {
    left: 13px;
    top: calc(-179px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(44)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: 18px;
  top: calc(-120px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(44)
    figure {
    left: 0px;
    top: calc(12px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(44)
    figure {
    left: 15px;
    top: calc(-35px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(45)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: -182px;
  top: calc(-354px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(45)
    figure {
    left: -144px;
    top: calc(-148px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(45)
    figure {
    left: -3px;
    top: calc(-163px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(46)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -20px;
  top: calc(-270px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(46)
    figure {
    left: -5px;
    top: calc(-99px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(46)
    figure {
    left: 45px;
    top: calc(-121px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(47)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: 80px;
  top: calc(-160px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(47)
    figure {
    left: 26px;
    top: calc(7px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(47)
    figure {
    left: 69px;
    top: calc(-277px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(48)
  figure {
  width: var(--cover-md);
  height: var(--cover-md);
  left: 108px;
  top: calc(-220px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(48)
    figure {
    left: 132px;
    top: calc(-32px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(48)
    figure {
    left: -7px;
    top: calc(-146px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(49)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: 71px;
  top: calc(-154px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(49)
    figure {
    left: 85px;
    top: calc(30px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(49)
    figure {
    left: -29px;
    top: calc(-76px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(50)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: -29px;
  top: calc(-420px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(50)
    figure {
    left: -11px;
    top: calc(-247px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(50)
    figure {
    left: 114px;
    top: calc(-200px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(51)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 113px;
  top: calc(-280px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(51)
    figure {
    left: 72px;
    top: calc(-5px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(51)
    figure {
    left: -80px;
    top: calc(-102px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(52)
  figure {
  width: var(--cover-lg);
  height: var(--cover-lg);
  left: 28px;
  top: calc(-115px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(52)
    figure {
    left: 102px;
    top: calc(37px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(52)
    figure {
    left: 54px;
    top: calc(-150px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(53)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: 50px;
  top: calc(-220px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(53)
    figure {
    left: -7px;
    top: calc(-110px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(53)
    figure {
    left: 43px;
    top: calc(-260px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(54)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: 22px;
  top: calc(-140px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(54)
    figure {
    left: -22px;
    top: calc(10px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(54)
    figure {
    left: 232px;
    top: calc(-236px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(55)
  figure {
  width: var(--cover-sm);
  height: var(--cover-sm);
  left: 144px;
  top: calc(-490px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(55)
    figure {
    left: 106px;
    top: calc(-178px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(55)
    figure {
    left: 39px;
    top: calc(-183px - var(--additional-offset, 0px));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax
  .img-wrapper:nth-of-type(56)
  figure {
  width: var(--cover-sd);
  height: var(--cover-sd);
  left: 400%;
  top: calc(-590px - var(--additional-offset, 0px));
}
@media only screen and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(56)
    figure {
    left: 735px;
    top: calc(-255px - var(--additional-offset, 0px));
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(56)
    figure {
    left: 200px;
    top: calc(-226px - var(--additional-offset, 0px));
  }
}
@media only screen and (min-width: 735px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(2)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(5)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(10)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(12)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(14)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(19)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(22)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(24)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(28)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(30)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(33)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(38)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(40)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(42)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(47)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(50)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(52)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(56)
    figure {
    --duration: var(--duration-fast-1);
    z-index: 2;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:first-of-type
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(3)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(9)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(11)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(13)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(15)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(20)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(23)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(25)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(26)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(29)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(31)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(37)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(39)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(41)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(43)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(48)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(51)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(53)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(54)
    figure {
    --duration: var(--duration-fast-2);
    z-index: 2;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(2)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(5)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(7)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(10)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(13)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(15)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(18)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(19)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(22)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(23)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(27)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(28)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(30)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(33)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(35)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(38)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(41)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(43)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(46)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(47)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(50)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(51)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(55)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(56)
    figure {
    --duration: var(--duration-fast-1);
    z-index: 2;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:first-of-type
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(3)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(4)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(12)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(14)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(16)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(17)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(20)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(21)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(24)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(26)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(29)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(31)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(32)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(40)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(42)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(44)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(45)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(48)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(49)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(52)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(54)
    figure {
    --duration: var(--duration-fast-2);
    z-index: 2;
  }
}
@media only screen and (min-width: 735px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(37)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(38)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(39)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(42)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(43)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(44)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(45)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(47)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(48)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(49)
    figure {
    --additional-offset: var(--tile-row-height);
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(34)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(35)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(36)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(37)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(39)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(40)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(41)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(42)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(45)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(46)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(47)
    figure {
    --additional-offset: var(--tile-row-height);
  }
}
@media only screen and (min-width: 735px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(44)
    figure {
    --duration: var(--duration-fast-2);
    z-index: 2;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(45)
    figure {
    --duration: var(--duration-fast-1);
    z-index: 2;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(49)
    figure {
    --duration: var(--duration-fast-2);
    z-index: 2;
  }
}
@media only screen and (min-width: 1069px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(4)
    figure {
    top: 140px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(9)
    figure {
    --duration: var(--duration-fast-1);
    z-index: 2;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(10)
    figure {
    --duration: var(--duration-fast-3);
    z-index: 3;
    top: 0px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(11)
    figure {
    --duration: var(--duration-fast-3);
    z-index: 3;
    top: -59px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(14)
    figure {
    top: 0px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(15)
    figure {
    --duration: var(--duration-fast-3);
    z-index: 3;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(17)
    figure {
    top: -210px;
  }
}
@media only screen and (min-width: 735px) and (max-width: 1068px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(2)
    figure {
    --duration: var(--duration-original);
    z-index: 1;
    top: 75px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(3)
    figure {
    --duration: var(--duration-original);
    z-index: 1;
    top: 30px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(5)
    figure {
    top: 30px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(10)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(11)
    figure {
    --duration: var(--duration-fast-3);
    z-index: 3;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(53)
    figure {
    --duration: var(--duration-original);
    z-index: 1;
  }
}
@media only screen and (max-width: 734px) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(6)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(8)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(13)
    figure {
    --duration: var(--duration-fast-3);
    z-index: 3;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(14)
    figure {
    --duration: var(--duration-fast-1);
    z-index: 2;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(28)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(43)
    figure,
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(46)
    figure {
    --duration: var(--duration-fast-2);
    z-index: 2;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(44)
    figure {
    --duration: var(--duration-fast-1);
    z-index: 2;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(47)
    figure {
    --duration: var(--duration-fast-1);
    z-index: 2;
    --additional-offset: -125px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(49)
    figure {
    --additional-offset: -150px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(50)
    figure {
    --duration: var(--duration-fast-2);
    z-index: 2;
    --additional-offset: var(--tile-row-height);
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(51)
    figure {
    --duration: var(--duration-original);
    z-index: 1;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(52)
    figure {
    --additional-offset: 105px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(53)
    figure {
    --additional-offset: 670px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(55)
    figure {
    --additional-offset: 200px;
  }
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax
    .img-wrapper:nth-of-type(56)
    figure {
    --additional-offset: -135px;
  }
}
.section-cards .cards-container .tile-music-discovery .parallax-item {
  --transform: calc(var(--tile-min-height) * -3 - var(--tile-anim-offset));
  --duration-original: 80s;
  --duration-fast-1: 70s;
  --duration-fast-2: 74s;
  --duration-fast-3: 60s;
  --duration: var(--duration-original);
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 10px;
  background-size: cover;
  background-color: #fff;
}
@media only screen and (max-width: 734px) {
  .section-cards .cards-container .tile-music-discovery .parallax-item {
    --duration-original: 100s;
    --duration-fast-1: 87.5s;
    --duration-fast-2: 92.5s;
    --transform: calc(var(--tile-min-height) * -4 - var(--tile-anim-offset));
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="0"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/a_list_pop__b3u1kn615hqu_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="0"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/a_list_pop__b3u1kn615hqu_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="1"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/alpha_playlist__dqp8jzo86piu_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="1"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/alpha_playlist__dqp8jzo86piu_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="2"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/altctrl_playlist__b6lgv9unrxw2_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="2"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/altctrl_playlist__b6lgv9unrxw2_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="4"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/chill_mix__d7zvuzqnpa82_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="4"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/chill_mix__d7zvuzqnpa82_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="5"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/country_roads__qypbfgpgbn6q_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="5"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/country_roads__qypbfgpgbn6q_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="6"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/country_spatial_audio__7owg4qjoguay_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="6"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/country_spatial_audio__7owg4qjoguay_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="7"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/family_dance_party__cx4yvgpfc342_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="7"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/family_dance_party__cx4yvgpfc342_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="8"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/friends_mix__6lsrj8fst0iu_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="8"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/friends_mix__6lsrj8fst0iu_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="9"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/get_Up_mix__d9xjje31m9km_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="9"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/get_Up_mix__d9xjje31m9km_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="10"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/good_vibes_only__bvs1ha3uuxsi_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="10"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/good_vibes_only__bvs1ha3uuxsi_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="11"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/headliners__bv5warnjrz42_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="11"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/headliners__bv5warnjrz42_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="12"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/heartbreak__dczxshlrtoeq_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="12"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/heartbreak__dczxshlrtoeq_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="13"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/heavy_rotation-mix__c4xphcgvopea_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="13"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/heavy_rotation-mix__c4xphcgvopea_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="14"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/jayde_donovan_2__e9mgsdgf7sy2_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="14"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/jayde_donovan_2__e9mgsdgf7sy2_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="15"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/love__exzitit2y4qe_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="15"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/love__exzitit2y4qe_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="17"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/matt_wilkinson_show__kept4fmp2fe6_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="17"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/matt_wilkinson_show__kept4fmp2fe6_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="18"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/melodic_rap__cz21ta25zeuu_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="18"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/melodic_rap__cz21ta25zeuu_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="19"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/new_music_mix__dxtjnqmzqlci_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="19"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/new_music_mix__dxtjnqmzqlci_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="20"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/party_starters__i01zo80xmrqm_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="20"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/party_starters__i01zo80xmrqm_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="21"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/personal_station__eq6o2f0yqy6a_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="21"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/personal_station__eq6o2f0yqy6a_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="22"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/piano_chill__cx1r2ibqsywm_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="22"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/piano_chill__cx1r2ibqsywm_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="24"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/pure_throwback__fy5fqu4wc4y2_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="24"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/pure_throwback__fy5fqu4wc4y2_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="25"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/rap_life__f2dwtu4tev2i_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="25"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/rap_life__f2dwtu4tev2i_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="26"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/rb_now__cg1pfypwvmc2_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="26"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/rb_now__cg1pfypwvmc2_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="27"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/rb_throwback__evkx4kvw8h0m_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="27"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/rb_throwback__evkx4kvw8h0m_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="28"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/todays_country__dej97kecdimq_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="28"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/todays_country__dej97kecdimq_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="29"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/todays_country_radio__bldq0xl1llpy_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="29"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/todays_country_radio__bldq0xl1llpy_large_2x.jpg);
  }
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax-item[data-i="31"] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/viral_rewind_playlist__cboty3hdk9yu_large.jpg);
}
@media (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {
  .section-cards
    .cards-container
    .tile-music-discovery
    .parallax-item[data-i="31"] {
    background-image: url(https://www.apple.com/v/apple-music/ab/images/overview/discovery/foc/viral_rewind_playlist__cboty3hdk9yu_large_2x.jpg);
  }
}
.section-cards .cards-container .tile-music-discovery .parallax-item.float {
  animation: float-up var(--duration) linear 1;
  animation-fill-mode: forwards;
}
.section-cards
  .cards-container
  .tile-music-discovery
  .parallax.paused
  .parallax-item {
  animation-play-state: paused;
}
/*! CSS Used keyframes */
@keyframes float-up {
  to {
    transform: translateY(var(--transform));
  }
}
</style>
