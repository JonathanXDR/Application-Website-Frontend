<template>
  <NuxtLayout>
    <div class="rs-covers rs-covers-preorder">
      <div class="rs-covers-transtion theme-dark r-fade-transition-enter-done">
        <div
          class="rs-covers-container rs-covers-media-default rs-covers-textovervideo as-l-container"
        >
          <div class="rs-covers-media-container">
            <Icon
              :name="$t(`pages.${currentKey}.icon.name`)"
              :colors="colors"
              class="media-icon"
            />
          </div>
          <div class="rs-covers-content-container">
            <h1 class="rs-covers-heading">
              <span>{{ $t(`pages.${currentKey}.title`) }}</span>
            </h1>
            <div class="rs-covers-desc">
              {{ description[0] }}.
              <span class="nowrap">{{ description[1] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const error = useError()
const { tm } = useI18n()
const pages = {
  notFound: 404,
  error: 500 || error.value?.statusCode,
  maintenance: 503
}

const currentKey = computed(() => {
  return (
    Object.keys(pages).find(
      (key: string) =>
        pages[key as keyof typeof pages] === error.value?.statusCode
    ) || 'error'
  )
})

const colors: Ref<Object> = computed(() =>
  tm(`pages.${currentKey.value}.icon.colors`)
)
const entireDescription: Ref<string> = computed(() =>
  tm(`pages.${currentKey.value}.description`)
)
const description: Ref<string[]> = computed(() =>
  entireDescription.value.split('. ')
)
</script>

<style scoped>
body {
  min-width: 320px;
}

.icon:before,
.icon:after,
.more:before,
.more:after {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  color: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: inherit;
  font-size: inherit;  
  text-decoration: underline;
  position: relative;
  z-index: 1;
  alt: '';
}

.icon:before,
.icon:after {
  text-decoration: none;
}

.icon:before {
  display: none;
}

.icon-after:after,
.more:after {
  padding-inline-start: 0.3em;
  top: 0;
}

.icon-before:before {
  padding-inline-end: 0.3em;
  display: inline-block;
  top: 0;
}

.icon-before:after {
  display: none;
}

.icon-before.icon-apple:before {
  padding-inline-end: 0;
  display: inline-block;
  top: 0;
}

.icon-before.icon-apple:after {
  display: none;
}

.more-block {
  margin-top: 0.5em;
}

.icon-wrapper .icon,
.icon-wrapper .more:not(.icon-before):after,
.icon-wrapper .icon-before:before,
.icon-wrapper .icon-after:after {
  display: inline;
  position: static;
}

a.icon-wrapper {
  text-decoration: none;
}

a.icon-wrapper:hover .icon-copy {
  text-decoration: underline;
}

html[dir='rtl'] .icon-wrapper {
  unicode-bidi: bidi-override;
}

html[dir='rtl'] .icon-copy {
  unicode-bidi: embed;
}

.progress-indicator-curtain {
  height: 100%;
  display: flex;
  flex-grow: 1;
  opacity: 0;
  justify-content: center;
  align-items: center;
  background-color: var(--progress-indicator-curtain-color);
  --progress-indicator-curtain-color: rgba(255, 255, 255, 0.48);
}

.theme-dark .progress-indicator-curtain,
.progress-indicator-curtain.theme-dark {
  --progress-indicator-curtain-color: rgba(0, 0, 0, 0.48);
}

.theme-dark {
  --sk-body-background-color: rgb(0, 0, 0);
  --sk-body-text-color: rgb(245, 245, 247);
  --sk-headline-text-color: rgb(245, 245, 247);
  --sk-body-link-color: rgb(41, 151, 255);
}

.theme-light {
  --sk-body-background-color: rgb(255, 255, 255);
  --sk-body-text-color: rgb(29, 29, 31);
  --sk-headline-text-color: rgb(29, 29, 31);
  --sk-body-link-color: rgb(0, 102, 204);
}

.progress-indicator-indeterminate {
  display: flex;
  --progress-indicator-size: 39px;
  --progress-indicator-color: rgba(0, 0, 0, 0.56);
}

.progress-indicator-indeterminate.progress-indicator-visible {
  opacity: 1;
}

.progress-indicator-indeterminate.progress-indicator-visible
  .progress-indicator-icon {
  opacity: 1;
  transition: opacity 0.4s ease;
  will-change: opacity;
}

.progress-indicator-indeterminate.progress-indicator-immediate
  .progress-indicator-icon {
  transition: none;
}

.theme-dark .progress-indicator-indeterminate,
.progress-indicator-indeterminate.theme-dark {
  --progress-indicator-color: rgba(255, 255, 255, 0.8);
}

.progress-indicator-icon {
  width: var(--progress-indicator-size);
  height: var(--progress-indicator-size);
  opacity: 0;
}

.progress-indicator-icon .progress-indicator-spoke {
  fill: var(--progress-indicator-color);
  opacity: 0.2;
  animation-name: progress-indicator-animating;
  animation-direction: forward;
  animation-timing-function: cubic-bezier(1, 0.1, 0, 0.3);
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.progress-indicator-icon .progress-indicator-spoke:nth-child(0) {
  animation-delay: -0.125s;
}

.progress-indicator-icon .progress-indicator-spoke:nth-child(1) {
  animation-delay: 0s;
}

.progress-indicator-icon .progress-indicator-spoke:nth-child(2) {
  animation-delay: 0.125s;
}

.progress-indicator-icon .progress-indicator-spoke:nth-child(3) {
  animation-delay: 0.25s;
}

.progress-indicator-icon .progress-indicator-spoke:nth-child(4) {
  animation-delay: 0.375s;
}

.progress-indicator-icon .progress-indicator-spoke:nth-child(5) {
  animation-delay: 0.5s;
}

.progress-indicator-icon .progress-indicator-spoke:nth-child(6) {
  animation-delay: 0.625s;
}

.progress-indicator-icon .progress-indicator-spoke:nth-child(7) {
  animation-delay: 0.75s;
}

.progress-indicator-icon .progress-indicator-spoke:nth-child(8) {
  animation-delay: 0.875s;
}

@keyframes progress-indicator-animating {
  0% {
    opacity: 1;
  }

  12.5% {
    opacity: 0.9;
  }

  25% {
    opacity: 0.7;
  }

  37.5% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.4;
  }

  62.5% {
    opacity: 0.3;
  }

  75% {
    opacity: 0.2;
  }

  87.5% {
    opacity: 0.13;
  }
}

[data-core-fade-transition-wrapper] {
  opacity: 0;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 0.4s;
}

.r-fade-transition-enter-done {
  opacity: 1;
}

[data-core-height-transition-wrapper] {
  transition-property: height;
  transition-timing-function: ease-in-out;
  transition-duration: 0.4s;
  overflow: hidden;
}

[data-core-height-transition-content] {
  overflow: hidden;
}

.r-height-transition-exit-done {
  display: none;
}

.r-height-transition-enter-done:not(.r-height-transition-enter-active)
  [data-core-height-transition-content],
.r-height-transition-enter-done:not(.r-height-transition-enter-active)[data-core-height-transition-wrapper] {
  overflow: visible;
}

.rc-image-cross-fade {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rc-image-cross-fade[data-core-fade-transition-wrapper] {
  transition: opacity 0.3s ease-in-out;
}

.rc-slider {
  margin: 0;
  cursor: pointer;
}

.rc-slider-horizontal {
  width: 250px;
  max-width: 100%;
  padding: 4px 0;
}

.rc-slider-vertical {
  height: 250px;
  max-height: 100%;
  padding: 0 4px;
}

.rc-slider-track {
  position: relative;
  border: 1px solid #d2d2d7;
  border-radius: 4px;
}

.rc-slider-horizontal .rc-slider-track {
  height: 4px;
  width: 100%;
}

.rc-slider-vertical .rc-slider-track {
  width: 4px;
  height: 100%;
}

.rc-slider-progress {
  background-color: #d2d2d7;
  border-radius: inherit;
}

.rc-slider-horizontal .rc-slider-progress {
  height: 4px;
}

.rc-slider-vertical .rc-slider-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.rc-slider-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: #d2d2d7;
  z-index: 1;
  transform-origin: center;
  transition: padding 0.2s ease-in-out;
}

.rc-slider-handle:hover {
  padding: 2px;
}

.rc-slider-horizontal .rc-slider-handle {
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
}

.rc-slider-vertical .rc-slider-handle {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
}

.rc-slider-disabled,
.rc-slider-disabled * {
  pointer-events: none;
}

.rc-slider-disabled .rc-slider-progress,
.rc-slider-disabled .rc-slider-track {
  opacity: 0.5;
}

.rc-video {
  max-width: 100%;
  display: block;
}

.rc-videoplayer-controls {
  background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.56));
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.4, 0, 0.6, 1);
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.rc-videoplayer-ended .rc-videoplayer-controls,
.rc-videoplayer:not(.rc-videoplayer-touched) .rc-videoplayer-controls {
  opacity: 1;
  background: rgba(0, 0, 0, 0.16);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.6, 1);
}

.rc-videoplayer-hovering:not(.rc-videoplayer-touched) .rc-videoplayer-controls {
  background: rgba(0, 0, 0, 0.32);
}

.rc-videoplayer-touched .rc-videoplayer-controls {
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.6, 1);
}

.as-keyboarduser .rc-videoplayer-controls,
.rc-videoplayer-touched.rc-videoplayer-ended .rc-videoplayer-controls,
.rc-videoplayer-touched.rc-videoplayer-hovering .rc-videoplayer-controls {
  opacity: 1;
  transition: opacity 1s cubic-bezier(0.4, 0.1, 0.4, 1);
}

.rc-videoplayer-controls-center {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.6, 1) 0.05s,
    transform 0.5s cubic-bezier(0.4, 0, 0.6, 1);
}

.as-keyboarduser .rc-videoplayer-controls-center,
.rc-videoplayer-ended .rc-videoplayer-controls-center,
.rc-videoplayer-hovering .rc-videoplayer-controls-center,
.rc-videoplayer-waiting .rc-videoplayer-controls-center,
.rc-videoplayer:not(.rc-videoplayer-touched) .rc-videoplayer-controls-center {
  transform: translateY(0);
  opacity: 1;
  transition: opacity 0.4s cubic-bezier(0, 0, 0.2, 1) 0.25s,
    transform 0.5s cubic-bezier(0, 0, 0.2, 1) 0.2s;
}

.rc-videoplayer-controls-center:active .rc-videoplayer-button {
  transform: scale(0.9);
}

.rc-videoplayer-button {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  opacity: 0.8;
  transition: transform 0.2s ease, opacity 0.3s ease;
  padding: 0 3px;
}

.rc-videoplayer-button:hover {
  opacity: 1;
}

.rc-videoplayer-button-playpause {
  width: 52px;
  height: 52px;
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_play.svg);
}

.rc-videoplayer-large .rc-videoplayer-button-playpause {
  width: 75px;
  height: 75px;
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_play_super.svg);
}

.rc-videoplayer-playing .rc-videoplayer-button-playpause {
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_pause.svg);
}

.rc-videoplayer-large.rc-videoplayer-playing .rc-videoplayer-button-playpause {
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_pause_super.svg);
}

.rc-videoplayer-ended .rc-videoplayer-button-playpause {
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_replay.svg);
}

.rc-videoplayer-large.rc-videoplayer-ended .rc-videoplayer-button-playpause {
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_replay_super.svg);
}

.rc-videoplayer-large.rc-videoplayer-waiting .rc-videoplayer-button-playpause,
.rc-videoplayer-waiting .rc-videoplayer-button-playpause {
  background-image: none;
  transition: background-image 0s linear 0.3s;
}

.rc-videoplayer-controls-bottom {
  width: 100%;
  max-width: 100%;
  padding: 0 20px;
  position: absolute;
  opacity: 0;
  z-index: 1;
  bottom: 0;
  left: auto;
  right: auto;
  height: 48px;
  display: flex;
  box-sizing: border-box;
  transform: translateY(20px);
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.6, 1) 0.05s,
    transform 0.5s cubic-bezier(0.4, 0, 0.6, 1);
}

.rc-videoplayer-large .rc-videoplayer-controls-bottom {
  padding: 0 24px;
}

.rc-videoplayer-ended .rc-videoplayer-controls-bottom,
.rc-videoplayer:not(.rc-videoplayer-touched) .rc-videoplayer-controls-bottom {
  display: none;
}

.as-keyboarduser .rc-videoplayer-controls-bottom,
.rc-videoplayer-controls-bottom .rc-videoplayer-ended,
.rc-videoplayer-hovering .rc-videoplayer-controls-bottom,
.rc-videoplayer:not(.rc-videoplayer-touched) .rc-videoplayer-controls-bottom {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.4s cubic-bezier(0, 0, 0.2, 1) 0.05s,
    transform 0.5s cubic-bezier(0, 0, 0.2, 1);
}

.rc-videoplayer-button-mute {
  width: 32px;
  height: 32px;
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_volume_on.svg);
}

.rc-videoplayer-muted .rc-videoplayer-button-mute {
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_volume_mute.svg);
}

.rc-videoplayer-button-captions {
  width: 32px;
  height: 32px;
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_cc_off.svg);
}

.rc-videoplayer-captions-on .rc-videoplayer-button-captions {
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_cc_on.svg);
}

.rc-videoplayer-button-airplay {
  width: 32px;
  height: 32px;
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_airplay.svg);
}

.rc-videoplayer-airplay-on .rc-videoplayer-button-airplay {
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_airplay_active.svg);
}

.rc-videoplayer-button-pip {
  width: 32px;
  height: 32px;
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_pip_default.svg);
}

.rc-videoplayer-pip .rc-videoplayer-button-pip {
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_pip_active.svg);
}

.rc-videoplayer-button-fullscreen {
  width: 32px;
  height: 32px;
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_fullscreen.svg);
}

.rc-videoplayer-fullscreen .rc-videoplayer-button-fullscreen {
  background-image: url(https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/us/dist/assets/react-common/video-player/ctrl_fullscreen_exit.svg);
}

.rc-videoplayer-medium .rc-videoplayer-controls-bottom {
  padding: 0 18px;
}

.rc-videoplayer-controls-bottom .rc-slider-track {
  border: none;
  background-color: hsla(0, 0%, 100%, 0.3);
}

.rc-videoplayer-controls-bottom .rc-slider-handle,
.rc-videoplayer-controls-bottom .rc-slider-progress {
  background-color: #fff;
}

.rc-videoplayer-controls-bottom .rc-slider-handle:hover {
  padding: 4px;
}

.rc-videoplayer-controls-volume {
  position: relative;
}

.rc-videoplayer-controls-volume
  .as-keyboarduser
  .rc-videoplayer-volume-slider-box,
.rc-videoplayer-controls-volume
  .as-keyboarduser
  .rc-videoplayer-volume-slider-box
  .rc-videoplayer-button,
.rc-videoplayer-controls-volume.rc-videoplayer-controls-volume-sliding
  .rc-videoplayer-volume-slider-box,
.rc-videoplayer-controls-volume.rc-videoplayer-controls-volume-sliding
  .rc-videoplayer-volume-slider-box
  .rc-videoplayer-button,
.rc-videoplayer-controls-volume .rc-videoplayer-volume-slider-box:hover,
.rc-videoplayer-controls-volume
  .rc-videoplayer-volume-slider-box:hover
  .rc-videoplayer-button,
.rc-videoplayer-controls-volume:hover .rc-videoplayer-volume-slider-box,
.rc-videoplayer-controls-volume:hover
  .rc-videoplayer-volume-slider-box
  .rc-videoplayer-button {
  opacity: 1;
}

.rc-videoplayer-controls-volume
  .as-keyboarduser
  .rc-videoplayer-volume-slider-box
  .rc-videoplayer-volume-slider,
.rc-videoplayer-controls-volume
  .as-keyboarduser
  .rc-videoplayer-volume-slider-box:after,
.rc-videoplayer-controls-volume.rc-videoplayer-controls-volume-sliding
  .rc-videoplayer-volume-slider-box
  .rc-videoplayer-volume-slider,
.rc-videoplayer-controls-volume.rc-videoplayer-controls-volume-sliding
  .rc-videoplayer-volume-slider-box:after,
.rc-videoplayer-controls-volume
  .rc-videoplayer-volume-slider-box:hover
  .rc-videoplayer-volume-slider,
.rc-videoplayer-controls-volume .rc-videoplayer-volume-slider-box:hover:after,
.rc-videoplayer-controls-volume:hover
  .rc-videoplayer-volume-slider-box
  .rc-videoplayer-volume-slider,
.rc-videoplayer-controls-volume:hover .rc-videoplayer-volume-slider-box:after {
  transform: translateY(-8px);
}

.rc-videoplayer-volume-slider-box {
  overflow: hidden;
  position: absolute;
  top: -70px;
  left: 0;
  max-height: 55px;
  height: 55px;
  padding: 20px 10px 0;
  z-index: 1;
  width: 12px;
  opacity: 0.8;
  transition: opacity 0.335s cubic-bezier(0.4, 0, 0.6, 1);
}

.rc-videoplayer-volume-slider-box .rc-slider-track {
  background-color: transparent;
}

.as-keyboarduser .rc-videoplayer-volume-slider-box:after {
  transform: translateY(-8px);
}

.rc-videoplayer-volume-slider-box:after {
  content: '';
  top: 20px;
  left: 14px;
  max-height: 55px;
  height: 55px;
  width: 4px;
  background-color: hsla(0, 0%, 100%, 0.3);
  display: block;
  transform: translateY(65px);
  transition: transform 0.234s cubic-bezier(0.4, 0, 0.6, 1);
  position: absolute;
  border-radius: 4px;
  z-index: 0;
  pointer-events: none;
}

.rc-videoplayer-volume-slider {
  transform: translateY(65px);
  transition: transform 0.335s cubic-bezier(0.4, 0, 0.6, 1);
}

.rc-videoplayer-volume-slider .rc-slider-handle {
  width: 4px;
  height: 4px;
  padding: 3px;
}

.as-keyboarduser .rc-videoplayer-volume-slider {
  transform: translateY(-8px);
}

.rc-videoplayer-timeline {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rc-videoplayer-controls-progress {
  flex: 1;
  position: relative;
  top: 10px;
  padding: 0 7px;
  margin: 0 10px;
  height: 14px;
}

.rc-videoplayer-controls-progress .rc-slider-horizontal {
  width: 100%;
  margin: 0 10px;
}

.rc-videoplayer-controls-progress .rc-slider-horizontal .rc-slider-track {
  width: 100%;
}

.rc-videoplayer-controls-progress .rc-slider-handle {
  width: 4px;
  height: 4px;
}

.rc-videoplayer-controls-progress:hover .rc-slider-handle {
  padding: 3px;
}

.rc-videoplayer-timeline-current,
.rc-videoplayer-timeline-remain {
  font-weight: 600;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';  
  color: #fff;
}

.rc-videoplayer-loadingindicator-box {
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  user-select: none;
  display: flex;
  justify-content: center;
  top: 0;
  pointer-events: none;
  z-index: 15;
}

.rc-videoplayer-loadingindicator {
  width: 56px;
  height: 56px;
  bottom: 6px;
  right: 2px;
  opacity: 0;
  align-self: center;
  position: relative;
  transition: opacity 1s ease;
  transform: translateX(50%) translateY(50%);
}

.rc-videoplayer-large .rc-videoplayer-loadingindicator {
  width: 75px;
  height: 75px;
  bottom: 8px;
  right: 3px;
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator {
  opacity: 1;
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator > * {
  width: 7px;
  height: 18px;
  background: #fff;
  position: absolute;
  display: block;
  opacity: 0;
  border-radius: 27.5px;
  animation-name: loading-fade;
  animation-direction: forward;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(1, 0.1, 0, 0.3);
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator > :nth-child(0) {
  transform: rotate(-45deg) translateY(-18.5px);
  animation-delay: -0.125s;
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator > :first-child {
  transform: rotate(0deg) translateY(-18.5px);
  animation-delay: 0s;
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator > :nth-child(2) {
  transform: rotate(45deg) translateY(-18.5px);
  animation-delay: 0.125s;
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator > :nth-child(3) {
  transform: rotate(90deg) translateY(-18.5px);
  animation-delay: 0.25s;
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator > :nth-child(4) {
  transform: rotate(135deg) translateY(-18.5px);
  animation-delay: 0.375s;
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator > :nth-child(5) {
  transform: rotate(180deg) translateY(-18.5px);
  animation-delay: 0.5s;
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator > :nth-child(6) {
  transform: rotate(225deg) translateY(-18.5px);
  animation-delay: 0.625s;
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator > :nth-child(7) {
  transform: rotate(270deg) translateY(-18.5px);
  animation-delay: 0.75s;
}

.rc-videoplayer-waiting .rc-videoplayer-loadingindicator > :nth-child(8) {
  transform: rotate(315deg) translateY(-18.5px);
  animation-delay: 0.875s;
}

@keyframes loading-fade {
  0% {
    opacity: 1;
  }

  62.5% {
    opacity: 0.12;
  }

  to {
    opacity: 0.12;
  }
}

.rc-videoplayer-waiting.rc-videoplayer-medium
  .rc-videoplayer-loadingindicator
  > * {
  width: 5px;
  height: 12px;
  border-radius: 19.5px;
}

.rc-videoplayer-waiting.rc-videoplayer-medium
  .rc-videoplayer-loadingindicator
  > :nth-child(0) {
  transform: rotate(-45deg) translateY(-13.5px);
  animation-delay: -0.125s;
}

.rc-videoplayer-waiting.rc-videoplayer-medium
  .rc-videoplayer-loadingindicator
  > :first-child {
  transform: rotate(0deg) translateY(-13.5px);
  animation-delay: 0s;
}

.rc-videoplayer-waiting.rc-videoplayer-medium
  .rc-videoplayer-loadingindicator
  > :nth-child(2) {
  transform: rotate(45deg) translateY(-13.5px);
  animation-delay: 0.125s;
}

.rc-videoplayer-waiting.rc-videoplayer-medium
  .rc-videoplayer-loadingindicator
  > :nth-child(3) {
  transform: rotate(90deg) translateY(-13.5px);
  animation-delay: 0.25s;
}

.rc-videoplayer-waiting.rc-videoplayer-medium
  .rc-videoplayer-loadingindicator
  > :nth-child(4) {
  transform: rotate(135deg) translateY(-13.5px);
  animation-delay: 0.375s;
}

.rc-videoplayer-waiting.rc-videoplayer-medium
  .rc-videoplayer-loadingindicator
  > :nth-child(5) {
  transform: rotate(180deg) translateY(-13.5px);
  animation-delay: 0.5s;
}

.rc-videoplayer-waiting.rc-videoplayer-medium
  .rc-videoplayer-loadingindicator
  > :nth-child(6) {
  transform: rotate(225deg) translateY(-13.5px);
  animation-delay: 0.625s;
}

.rc-videoplayer-waiting.rc-videoplayer-medium
  .rc-videoplayer-loadingindicator
  > :nth-child(7) {
  transform: rotate(270deg) translateY(-13.5px);
  animation-delay: 0.75s;
}

.rc-videoplayer-waiting.rc-videoplayer-medium
  .rc-videoplayer-loadingindicator
  > :nth-child(8) {
  transform: rotate(315deg) translateY(-13.5px);
  animation-delay: 0.875s;
}

.rc-videoplayer {
  display: block;
  width: 100%;
  min-height: 400px;
  height: auto;
  position: relative;
}

.rc-videoplayer > * {
  -webkit-user-select: none;
  user-select: none;
}

.rc-videoplayer video {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.rc-videoplayer video,
.rc-videoplayer video img {
  display: block;
  outline: none;
}

.rc-videoplayer video::-webkit-media-controls-start-playback-button {
  background: rgba(0, 0, 0, 0.25);
  -webkit-clip-path: none;
  clip-path: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.rc-videoplayer video::-webkit-media-controls-start-playback-background {
  background: hsla(0, 0%, 100%, 0.8);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  -webkit-clip-path: polygon(
    54.2px 55.2px,
    54.2px 37.2px,
    53.5px 37.9px,
    25.1px 55.2px,
    24.1px 55.5px,
    22.4px 54.5px,
    22.1px 53.5px,
    22.1px 19.1px,
    22.4px 18.1px,
    23.1px 17.4px,
    24.1px 17.1px,
    25.1px 17.4px,
    53.5px 34.6px,
    54.2px 35.2px
  );
  clip-path: polygon(
    54.2px 55.2px,
    54.2px 37.2px,
    53.5px 37.9px,
    25.1px 55.2px,
    24.1px 55.5px,
    22.4px 54.5px,
    22.1px 53.5px,
    22.1px 19.1px,
    22.4px 18.1px,
    23.1px 17.4px,
    24.1px 17.1px,
    25.1px 17.4px,
    53.5px 34.6px,
    54.2px 35.2px
  );
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.rc-videoplayer video::-webkit-media-controls-start-playback-glyph,
.rc-videoplayer video::-webkit-media-controls-start-playback-tint {
  background: none;
}

.rc-videoplayer-poster {
  transition: opacity 0.5s linear;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 1;
}

.rc-videoplayer-poster img {
  display: block;
  width: 100%;
  height: auto;
}

.rc-videoplayer-touched .rc-videoplayer-poster {
  opacity: 0;
  pointer-events: none;
}

.rc-videoplayer-mow {
  display: block;
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
}

.rc-videoplayer-mow video {
  width: 100%;
  height: 100%;
}

.rc-videoplayer-mow .rc-videoplayer-controls,
.rc-videoplayer-mow .rc-videoplayer-controls-center,
.rc-videoplayer-mow .rc-videoplayer-poster {
  transition: none;
  opacity: 1;
}

.rc-videoplayer-mow.rc-videoplayer-touched .rc-videoplayer-controls,
.rc-videoplayer-mow.rc-videoplayer-touched .rc-videoplayer-controls-center,
.rc-videoplayer-mow.rc-videoplayer-touched .rc-videoplayer-poster {
  display: none;
}

.rc-videoplayer-mow .rc-videoplayer-controls-center {
  transform: none;
}

.rc-videoplayer-transcript-btn {
  font-size: 14px;  
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  display: block;
  color: #06c;
  padding-top: 10px;
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-videoplayer-transcript-btn {
    width: 100%;
    text-align: center;
  }
}

[data-core-overlay] {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99999;
  position: fixed;
  overflow: auto;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  padding: 54px 0;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;
}

[data-core-overlay][data-core-fade-transition-wrapper] {
  transition-duration: 0.1s;
}

[data-core-overlay-content] {
  margin: auto;
  padding: 30px;
  position: relative;
  background: #fff;
}

[data-core-overlay-cover] {
  background-color: rgba(50, 50, 50, 0.88);
  backface-visibility: visible;
  -webkit-tap-highlight-color: transparent;
}

[data-core-overlay-fullscreen][data-core-overlay] {
  background-color: #fff;
  padding: 0;
  margin: 0;
}

[data-core-overlay-fullscreen] [data-core-overlay-content] {
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: none;
  min-height: 100vh;
  border: none;
}

[data-core-overlay-open-ios-fixed],
[data-core-overlay-open] {
  overflow: hidden;
  position: relative;
}

[data-core-overlay-open-ios-fixed] {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
}

.rc-overlay-close {
  display: flex;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 44px;
  position: absolute;
  top: 56px;
  left: 16px;
  cursor: pointer;
}

.rc-overlay-close .rc-overlay-closesvg {
  background: #e8e8ed;
  border-radius: 50%;
  color: #6e6e73;
  display: flex;
  align-items: center;
  height: 36px;
  width: 36px;
  outline: none;
  position: relative;
}

.rc-overlay-close .rc-overlay-closesvg svg {
  fill: currentColor;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 20px;
  width: 20px;
}

.rc-overlay-popup[data-core-overlay] {
  padding: 0;
  margin: 0;
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-popup[data-core-overlay] {
    padding: 0 20px;
  }
}

.rc-overlay-popup [data-core-overlay-content] {
  padding: 0;
  max-width: 816px;
  background: transparent;
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-popup [data-core-overlay-content] {
    padding: 0;
    max-width: 640px;
    border: none;
  }

  .rc-overlay-popup [data-core-overlay-content]:focus {
    outline-offset: -4px;
  }
}

.rc-overlay-popup-outer {
  background: #fff;
  border-radius: 18px;
  margin: 40px 0;
  overflow: hidden;
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-with-footer .rc-overlay-popup-outer {
    display: flex;
    flex-direction: column;
  }
}

.rc-overlay-popup-content {
  padding: 76px;
}

.rc-overlay-with-footer .rc-overlay-popup-content {
  padding-bottom: 60px;
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-popup-content {
    padding: 76px 6.25% 60px;
  }

  .rc-overlay-with-footer .rc-overlay-popup-content {
    flex-grow: 1;
  }
}

.rc-overlay-footer {
  border-radius: 0 0 18px 18px;
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-footer {
    border-radius: 0;
    width: 100%;
  }
}

.rc-overlay-popup-dismiss {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 25px;
}

.rc-overlay-fullscreen [data-core-overlay-content] {
  min-width: 100vw;
}

.rc-overlay-fullscreen .rc-overlay-close {
  top: 28px;
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-fullscreen .rc-overlay-close {
    top: 16px;
    left: 16px;
  }
}

.rc-overlay-fullscreen-content {
  background: #fff;
  padding: 80px;
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-fullscreen-content {
    padding: 76px 6.25% 60px;
  }

  .rc-overlay-with-footer .rc-overlay-fullscreen-content {
    padding-bottom: 100px;
  }
}

.rc-overlay-content-nopadding .rc-overlay-fullscreen-content,
.rc-overlay-content-nopadding .rc-overlay-popup-content {
  padding: 0;
}

.rc-overlay-content-doublepadding .rc-overlay-fullscreen-content,
.rc-overlay-content-doublepadding .rc-overlay-popup-content {
  padding-left: 160px;
  padding-right: 160px;
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-content-doublepadding .rc-overlay-fullscreen-content,
  .rc-overlay-content-doublepadding .rc-overlay-popup-content {
    padding-left: 6.25%;
    padding-right: 6.25%;
  }
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-fixed-width[data-core-overlay] {
    padding: 0;
  }
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-fixed-width .rc-overlay-popup-outer {
    margin-top: 20px;
    margin-bottom: 0;
    border-radius: 18px 18px 0 0;
    min-height: calc(100vh - 20px);
  }
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-fixed-width .rc-overlay-close {
    top: 36px;
    left: 14px;
  }
}

.rc-overlay-fixed-width [data-core-overlay-content] {
  flex-grow: 1;
  min-width: 48rem;
}

@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-fixed-width [data-core-overlay-content] {
    margin: 0 auto;
    min-width: inherit;
    min-height: 100vh;
    width: 100%;
  }
}

@media screen and (min-width: 1069px) {
  .rc-overlay-fixed-width.rc-overlay-content-wide [data-core-overlay-content] {
    min-width: 60.52941rem;
  }
}

.rc-videoplayer-overlay .rc-videoplayer-mow {
  position: fixed;
  z-index: -1;
  visibility: hidden;
  width: 1px;
  height: 1px;
  top: 50%;
  left: 50%;
}

.rc-videoplayer-overlay .rc-videoplayer-mow video {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.rc-videoplayer-overlay .rc-videoplayer-playing {
  visibility: visible;
}

html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
input {
  margin: 0;
  padding: 0;
}

:focus {
  outline: 2px solid #0071e3;
  outline-offset: 0;
}

::-moz-focus-inner {
  border: 0;
  padding: 0;
}

input::-ms-clear {
  display: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  font-size: 106.25%;
  quotes: '“' '”';
  --sk-link-disabled-opacity: 0.42;
}

body {
  font-size: 17px;  
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  background-color: #fff;
  color: #1d1d1f;
  font-style: normal;
}

body,
input {
  font-synthesis: none;
  -moz-font-feature-settings: 'kern';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  direction: ltr;
  text-align: left;
}

h1 img,
h2 img,
h3 img,
h4 img,
h5 img,
h6 img {
  display: block;
  margin: 0;
}

h1 + *,
h2 + *,
h3 + *,
h4 + *,
h5 + *,
h6 + * {
  margin-top: 0.8em;
}

h1 + h1,
h1 + h2,
h1 + h3,
h1 + h4,
h1 + h5,
h1 + h6,
h2 + h1,
h2 + h2,
h2 + h3,
h2 + h4,
h2 + h5,
h2 + h6,
h3 + h1,
h3 + h2,
h3 + h3,
h3 + h4,
h3 + h5,
h3 + h6,
h4 + h1,
h4 + h2,
h4 + h3,
h4 + h4,
h4 + h5,
h4 + h6,
h5 + h1,
h5 + h2,
h5 + h3,
h5 + h4,
h5 + h5,
h5 + h6,
h6 + h1,
h6 + h2,
h6 + h3,
h6 + h4,
h6 + h5,
h6 + h6 {
  margin-top: 0.4em;
}

ol + h1,
ol + h2,
ol + h3,
ol + h4,
ol + h5,
ol + h6,
p + h1,
p + h2,
p + h3,
p + h4,
p + h5,
p + h6,
ul + h1,
ul + h2,
ul + h3,
ul + h4,
ul + h5,
ul + h6 {
  margin-top: 1.6em;
}

.heading-collapsed + * {
  margin-top: 0;
}

ol + *,
p + *,
ul + * {
  margin-top: 0.8em;
}

ol,
ul {
  margin-left: 1.17647em;
}

ol ol,
ol ul,
ul ol,
ul ul {
  margin-top: 0;
  margin-bottom: 0;
}

nav ol,
nav ul {
  margin: 0;
  list-style: none;
}

li li {
  font-size: 1em;
}

.link,
a {
  color: #06c;
}

.link:link,
.link:visited,
a:link,
a:visited {
  text-decoration: none;
}

.link:hover,
a:hover {
  text-decoration: underline;
}

.link:active,
a:active {
  text-decoration: none;
}

.link.disabled,
.link :disabled,
a.disabled,
a :disabled {
  opacity: var(--sk-link-disabled-opacity);
}

.link-inline,
.link-inline:link {
  text-decoration: underline;
}

.link-standalone:link {
  text-decoration: none;
}

.link-standalone:link:focus,
.link-standalone:link:hover {
  text-decoration: underline;
}

.links-inline,
.links-stacked {
  margin-left: 0;
  margin-right: 0;
  list-style: none;
}

.links-inline li {
  display: inline;
  margin: 0 0.8em;
}

.links-inline li:first-child {
  margin-left: 0;
}

.links-inline li:last-child {
  margin-right: 0;
}

.links-stacked li {
  margin: 0;
  display: block;
}

.links-stacked li + li {
  margin-top: 0.4em;
}

b,
strong {
  font-weight: 600;
}

cite,
dfn,
em,
i {
  font-style: italic;
}

sub,
sup {
  position: relative;
  font-size: 0.6em;
  vertical-align: baseline;
}

sup {
  top: -0.5em;
}

sub {
  bottom: -0.25em;
}

.footnote a {
  vertical-align: inherit;
  color: inherit;
}

.footnote a:hover {
  color: #06c;
  text-decoration: none;
}

.footnote-reduced {
  font-size: 0.45em;
}

sup.footnote-reduced {
  top: -0.86em;
}

sub.footnote-reduced {
  bottom: -0.36em;
}

.footnote-supglyph {
  position: relative;
  vertical-align: baseline;
}

.footnote-supglyph.footnote-reduced {
  font-size: 0.9em;
  top: -0.09em;
}

.footnote-diamond {
  position: relative;
  vertical-align: baseline;
  font-feature-settings: 'numr';
  font-size: 1em;
}

sup.footnote-diamond {
  top: auto;
}

sub.footnote-diamond {
  bottom: -0.5em;
}

.footnote-diamond.footnote-reduced {
  font-size: 0.9em;
  top: -0.09em;
}

sub.footnote-diamond.footnote-reduced {
  top: auto;
  bottom: -0.52em;
}

.footnote-number {
  position: relative;
  vertical-align: baseline;
  font-feature-settings: 'numr';
  font-size: 1em;
}

sup.footnote-number {
  top: auto;
}

sub.footnote-number {
  bottom: -0.5em;
}

.footnote-number.footnote-reduced {
  font-size: 0.9em;
  top: -0.09em;
}

sub.footnote-number.footnote-reduced {
  top: auto;
  bottom: -0.52em;
}

abbr {
  border: 0;
}

a[role='button'] {
  cursor: pointer;
}

.justify-content-start {
  justify-content: flex-start;
}

.justify-content-end {
  justify-content: flex-end;
}

.justify-content-center {
  justify-content: center;
}

.justify-content-spacebetween {
  justify-content: space-between;
}

.justify-content-spacearound {
  justify-content: space-around;
}

.justify-content-spaceevenly {
  justify-content: space-evenly;
}

.align-items-start {
  align-items: flex-start;
}

.align-items-center {
  align-items: center;
}

.align-items-end {
  align-items: flex-end;
}

.align-self-start {
  align-self: flex-start;
}

.align-self-center {
  align-self: center;
}

.align-self-end {
  align-self: flex-end;
}

.large-justify-content-start {
  justify-content: flex-start;
}

.large-justify-content-end {
  justify-content: flex-end;
}

.large-justify-content-center {
  justify-content: center;
}

.large-justify-content-spacebetween {
  justify-content: space-between;
}

.large-justify-content-spacearound {
  justify-content: space-around;
}

.large-justify-content-spaceevenly {
  justify-content: space-evenly;
}

.large-align-items-start {
  align-items: flex-start;
}

.large-align-items-center {
  align-items: center;
}

.large-align-items-end {
  align-items: flex-end;
}

.large-align-self-start {
  align-self: flex-start;
}

.large-align-self-center {
  align-self: center;
}

.large-align-self-end {
  align-self: flex-end;
}

@media only screen and (min-width: 1441px) {
  .xlarge-justify-content-start {
    justify-content: flex-start;
  }

  .xlarge-justify-content-end {
    justify-content: flex-end;
  }

  .xlarge-justify-content-center {
    justify-content: center;
  }

  .xlarge-justify-content-spacebetween {
    justify-content: space-between;
  }

  .xlarge-justify-content-spacearound {
    justify-content: space-around;
  }

  .xlarge-justify-content-spaceevenly {
    justify-content: space-evenly;
  }

  .xlarge-align-items-start {
    align-items: flex-start;
  }

  .xlarge-align-items-center {
    align-items: center;
  }

  .xlarge-align-items-end {
    align-items: flex-end;
  }

  .xlarge-align-self-start {
    align-self: flex-start;
  }

  .xlarge-align-self-center {
    align-self: center;
  }

  .xlarge-align-self-end {
    align-self: flex-end;
  }
}

@media only screen and (max-width: 1068px) {
  .medium-justify-content-start {
    justify-content: flex-start;
  }

  .medium-justify-content-end {
    justify-content: flex-end;
  }

  .medium-justify-content-center {
    justify-content: center;
  }

  .medium-justify-content-spacebetween {
    justify-content: space-between;
  }

  .medium-justify-content-spacearound {
    justify-content: space-around;
  }

  .medium-justify-content-spaceevenly {
    justify-content: space-evenly;
  }

  .medium-align-items-start {
    align-items: flex-start;
  }

  .medium-align-items-center {
    align-items: center;
  }

  .medium-align-items-end {
    align-items: flex-end;
  }

  .medium-align-self-start {
    align-self: flex-start;
  }

  .medium-align-self-center {
    align-self: center;
  }

  .medium-align-self-end {
    align-self: flex-end;
  }
}

@media only screen and (max-width: 1068px) {
  .small-justify-content-start {
    justify-content: flex-start;
  }

  .small-justify-content-end {
    justify-content: flex-end;
  }

  .small-justify-content-center {
    justify-content: center;
  }

  .small-justify-content-spacebetween {
    justify-content: space-between;
  }

  .small-justify-content-spacearound {
    justify-content: space-around;
  }

  .small-justify-content-spaceevenly {
    justify-content: space-evenly;
  }

  .small-align-items-start {
    align-items: flex-start;
  }

  .small-align-items-center {
    align-items: center;
  }

  .small-align-items-end {
    align-items: flex-end;
  }

  .small-align-self-start {
    align-self: flex-start;
  }

  .small-align-self-center {
    align-self: center;
  }

  .small-align-self-end {
    align-self: flex-end;
  }
}

.selfclear:after,
.selfclear:before {
  content: ' ';
  display: table;
}

.selfclear:after {
  clear: both;
}

.visuallyhidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0 0 99.9% 99.9%);
  clip-path: inset(0 0 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

@media only screen and (inverted-colors) {
  .no-inversion {
    filter: invert(1);
  }
}

.nowrap {
  display: inline-block;
  text-decoration: inherit;
}

.clear {
  clear: both;
}

.cursor-grab {
  cursor: move;
  cursor: grab;
}

.cursor-grabbing {
  cursor: move;
  cursor: grabbing;
}

.a11y {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0 0 99.9% 99.9%);
  clip-path: inset(0 0 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

.row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
}

.row-reverse {
  flex-direction: row-reverse;
}

.column {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-width: 0;
}

.large-offset-0 {
  margin-left: 0;
}

.large-order-0 {
  order: 0;
}

.large-1 {
  flex-basis: 8.33333%;
  max-width: 8.33333%;
}

.large-offset-1 {
  margin-left: 8.33333%;
}

.large-order-1 {
  order: 1;
}

.large-2 {
  flex-basis: 16.66667%;
  max-width: 16.66667%;
}

.large-offset-2 {
  margin-left: 16.66667%;
}

.large-order-2 {
  order: 2;
}

.large-3 {
  flex-basis: 25%;
  max-width: 25%;
}

.large-offset-3 {
  margin-left: 25%;
}

.large-order-3 {
  order: 3;
}

.large-4 {
  flex-basis: 33.33333%;
  max-width: 33.33333%;
}

.large-offset-4 {
  margin-left: 33.33333%;
}

.large-order-4 {
  order: 4;
}

.large-5 {
  flex-basis: 41.66667%;
  max-width: 41.66667%;
}

.large-offset-5 {
  margin-left: 41.66667%;
}

.large-order-5 {
  order: 5;
}

.large-6 {
  flex-basis: 50%;
  max-width: 50%;
}

.large-offset-6 {
  margin-left: 50%;
}

.large-order-6 {
  order: 6;
}

.large-7 {
  flex-basis: 58.33333%;
  max-width: 58.33333%;
}

.large-offset-7 {
  margin-left: 58.33333%;
}

.large-order-7 {
  order: 7;
}

.large-8 {
  flex-basis: 66.66667%;
  max-width: 66.66667%;
}

.large-offset-8 {
  margin-left: 66.66667%;
}

.large-order-8 {
  order: 8;
}

.large-9 {
  flex-basis: 75%;
  max-width: 75%;
}

.large-offset-9 {
  margin-left: 75%;
}

.large-order-9 {
  order: 9;
}

.large-10 {
  flex-basis: 83.33333%;
  max-width: 83.33333%;
}

.large-offset-10 {
  margin-left: 83.33333%;
}

.large-order-10 {
  order: 10;
}

.large-11 {
  flex-basis: 91.66667%;
  max-width: 91.66667%;
}

.large-offset-11 {
  margin-left: 91.66667%;
}

.large-order-11 {
  order: 11;
}

.large-12 {
  flex-basis: 100%;
  max-width: 100%;
}

.large-offset-12 {
  margin-left: 100%;
}

.large-order-12 {
  order: 12;
}

.large-centered {
  margin-left: auto;
  margin-right: auto;
}

.large-uncentered {
  margin-left: 0;
  margin-right: 0;
}

.large-last {
  margin-left: auto;
}

.large-notlast {
  margin-left: 0;
}

.large-grow {
  flex: auto;
  max-width: none;
}

.large-ungrow {
  flex: initial;
  max-width: none;
}

@media only screen and (min-width: 1441px) {
  .xlarge-offset-0 {
    margin-left: 0;
  }

  .xlarge-order-0 {
    order: 0;
  }

  .xlarge-1 {
    flex-basis: 8.33333%;
    max-width: 8.33333%;
  }

  .xlarge-offset-1 {
    margin-left: 8.33333%;
  }

  .xlarge-order-1 {
    order: 1;
  }

  .xlarge-2 {
    flex-basis: 16.66667%;
    max-width: 16.66667%;
  }

  .xlarge-offset-2 {
    margin-left: 16.66667%;
  }

  .xlarge-order-2 {
    order: 2;
  }

  .xlarge-3 {
    flex-basis: 25%;
    max-width: 25%;
  }

  .xlarge-offset-3 {
    margin-left: 25%;
  }

  .xlarge-order-3 {
    order: 3;
  }

  .xlarge-4 {
    flex-basis: 33.33333%;
    max-width: 33.33333%;
  }

  .xlarge-offset-4 {
    margin-left: 33.33333%;
  }

  .xlarge-order-4 {
    order: 4;
  }

  .xlarge-5 {
    flex-basis: 41.66667%;
    max-width: 41.66667%;
  }

  .xlarge-offset-5 {
    margin-left: 41.66667%;
  }

  .xlarge-order-5 {
    order: 5;
  }

  .xlarge-6 {
    flex-basis: 50%;
    max-width: 50%;
  }

  .xlarge-offset-6 {
    margin-left: 50%;
  }

  .xlarge-order-6 {
    order: 6;
  }

  .xlarge-7 {
    flex-basis: 58.33333%;
    max-width: 58.33333%;
  }

  .xlarge-offset-7 {
    margin-left: 58.33333%;
  }

  .xlarge-order-7 {
    order: 7;
  }

  .xlarge-8 {
    flex-basis: 66.66667%;
    max-width: 66.66667%;
  }

  .xlarge-offset-8 {
    margin-left: 66.66667%;
  }

  .xlarge-order-8 {
    order: 8;
  }

  .xlarge-9 {
    flex-basis: 75%;
    max-width: 75%;
  }

  .xlarge-offset-9 {
    margin-left: 75%;
  }

  .xlarge-order-9 {
    order: 9;
  }

  .xlarge-10 {
    flex-basis: 83.33333%;
    max-width: 83.33333%;
  }

  .xlarge-offset-10 {
    margin-left: 83.33333%;
  }

  .xlarge-order-10 {
    order: 10;
  }

  .xlarge-11 {
    flex-basis: 91.66667%;
    max-width: 91.66667%;
  }

  .xlarge-offset-11 {
    margin-left: 91.66667%;
  }

  .xlarge-order-11 {
    order: 11;
  }

  .xlarge-12 {
    flex-basis: 100%;
    max-width: 100%;
  }

  .xlarge-offset-12 {
    margin-left: 100%;
  }

  .xlarge-order-12 {
    order: 12;
  }

  .xlarge-centered {
    margin-left: auto;
    margin-right: auto;
  }

  .xlarge-uncentered {
    margin-left: 0;
    margin-right: 0;
  }

  .xlarge-last {
    margin-left: auto;
  }

  .xlarge-notlast {
    margin-left: 0;
  }

  .xlarge-grow {
    flex: auto;
    max-width: none;
  }

  .xlarge-ungrow {
    flex: initial;
    max-width: none;
  }
}

@media only screen and (max-width: 1068px) {
  .medium-offset-0 {
    margin-left: 0;
  }

  .medium-order-0 {
    order: 0;
  }

  .medium-1 {
    flex-basis: 8.33333%;
    max-width: 8.33333%;
  }

  .medium-offset-1 {
    margin-left: 8.33333%;
  }

  .medium-order-1 {
    order: 1;
  }

  .medium-2 {
    flex-basis: 16.66667%;
    max-width: 16.66667%;
  }

  .medium-offset-2 {
    margin-left: 16.66667%;
  }

  .medium-order-2 {
    order: 2;
  }

  .medium-3 {
    flex-basis: 25%;
    max-width: 25%;
  }

  .medium-offset-3 {
    margin-left: 25%;
  }

  .medium-order-3 {
    order: 3;
  }

  .medium-4 {
    flex-basis: 33.33333%;
    max-width: 33.33333%;
  }

  .medium-offset-4 {
    margin-left: 33.33333%;
  }

  .medium-order-4 {
    order: 4;
  }

  .medium-5 {
    flex-basis: 41.66667%;
    max-width: 41.66667%;
  }

  .medium-offset-5 {
    margin-left: 41.66667%;
  }

  .medium-order-5 {
    order: 5;
  }

  .medium-6 {
    flex-basis: 50%;
    max-width: 50%;
  }

  .medium-offset-6 {
    margin-left: 50%;
  }

  .medium-order-6 {
    order: 6;
  }

  .medium-7 {
    flex-basis: 58.33333%;
    max-width: 58.33333%;
  }

  .medium-offset-7 {
    margin-left: 58.33333%;
  }

  .medium-order-7 {
    order: 7;
  }

  .medium-8 {
    flex-basis: 66.66667%;
    max-width: 66.66667%;
  }

  .medium-offset-8 {
    margin-left: 66.66667%;
  }

  .medium-order-8 {
    order: 8;
  }

  .medium-9 {
    flex-basis: 75%;
    max-width: 75%;
  }

  .medium-offset-9 {
    margin-left: 75%;
  }

  .medium-order-9 {
    order: 9;
  }

  .medium-10 {
    flex-basis: 83.33333%;
    max-width: 83.33333%;
  }

  .medium-offset-10 {
    margin-left: 83.33333%;
  }

  .medium-order-10 {
    order: 10;
  }

  .medium-11 {
    flex-basis: 91.66667%;
    max-width: 91.66667%;
  }

  .medium-offset-11 {
    margin-left: 91.66667%;
  }

  .medium-order-11 {
    order: 11;
  }

  .medium-12 {
    flex-basis: 100%;
    max-width: 100%;
  }

  .medium-offset-12 {
    margin-left: 100%;
  }

  .medium-order-12 {
    order: 12;
  }

  .medium-centered {
    margin-left: auto;
    margin-right: auto;
  }

  .medium-uncentered {
    margin-left: 0;
    margin-right: 0;
  }

  .medium-last {
    margin-left: auto;
  }

  .medium-notlast {
    margin-left: 0;
  }

  .medium-grow {
    flex: auto;
    max-width: none;
  }

  .medium-ungrow {
    flex: initial;
    max-width: none;
  }
}

@media only screen and (max-width: 1068px) {
  .small-offset-0 {
    margin-left: 0;
  }

  .small-order-0 {
    order: 0;
  }

  .small-1 {
    flex-basis: 8.33333%;
    max-width: 8.33333%;
  }

  .small-offset-1 {
    margin-left: 8.33333%;
  }

  .small-order-1 {
    order: 1;
  }

  .small-2 {
    flex-basis: 16.66667%;
    max-width: 16.66667%;
  }

  .small-offset-2 {
    margin-left: 16.66667%;
  }

  .small-order-2 {
    order: 2;
  }

  .small-3 {
    flex-basis: 25%;
    max-width: 25%;
  }

  .small-offset-3 {
    margin-left: 25%;
  }

  .small-order-3 {
    order: 3;
  }

  .small-4 {
    flex-basis: 33.33333%;
    max-width: 33.33333%;
  }

  .small-offset-4 {
    margin-left: 33.33333%;
  }

  .small-order-4 {
    order: 4;
  }

  .small-5 {
    flex-basis: 41.66667%;
    max-width: 41.66667%;
  }

  .small-offset-5 {
    margin-left: 41.66667%;
  }

  .small-order-5 {
    order: 5;
  }

  .small-6 {
    flex-basis: 50%;
    max-width: 50%;
  }

  .small-offset-6 {
    margin-left: 50%;
  }

  .small-order-6 {
    order: 6;
  }

  .small-7 {
    flex-basis: 58.33333%;
    max-width: 58.33333%;
  }

  .small-offset-7 {
    margin-left: 58.33333%;
  }

  .small-order-7 {
    order: 7;
  }

  .small-8 {
    flex-basis: 66.66667%;
    max-width: 66.66667%;
  }

  .small-offset-8 {
    margin-left: 66.66667%;
  }

  .small-order-8 {
    order: 8;
  }

  .small-9 {
    flex-basis: 75%;
    max-width: 75%;
  }

  .small-offset-9 {
    margin-left: 75%;
  }

  .small-order-9 {
    order: 9;
  }

  .small-10 {
    flex-basis: 83.33333%;
    max-width: 83.33333%;
  }

  .small-offset-10 {
    margin-left: 83.33333%;
  }

  .small-order-10 {
    order: 10;
  }

  .small-11 {
    flex-basis: 91.66667%;
    max-width: 91.66667%;
  }

  .small-offset-11 {
    margin-left: 91.66667%;
  }

  .small-order-11 {
    order: 11;
  }

  .small-12 {
    flex-basis: 100%;
    max-width: 100%;
  }

  .small-offset-12 {
    margin-left: 100%;
  }

  .small-order-12 {
    order: 12;
  }

  .small-centered {
    margin-left: auto;
    margin-right: auto;
  }

  .small-uncentered {
    margin-left: 0;
    margin-right: 0;
  }

  .small-last {
    margin-left: auto;
  }

  .small-notlast {
    margin-left: 0;
  }

  .small-grow {
    flex: auto;
    max-width: none;
  }

  .small-ungrow {
    flex: initial;
    max-width: none;
  }
}

.row-reverse .column {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-width: 0;
}

.row-reverse .large-offset-0 {
  margin-right: 0;
}

.row-reverse .large-offset-1 {
  margin-right: 8.33333%;
}

.row-reverse .large-offset-2 {
  margin-right: 16.66667%;
}

.row-reverse .large-offset-3 {
  margin-right: 25%;
}

.row-reverse .large-offset-4 {
  margin-right: 33.33333%;
}

.row-reverse .large-offset-5 {
  margin-right: 41.66667%;
}

.row-reverse .large-offset-6 {
  margin-right: 50%;
}

.row-reverse .large-offset-7 {
  margin-right: 58.33333%;
}

.row-reverse .large-offset-8 {
  margin-right: 66.66667%;
}

.row-reverse .large-offset-9 {
  margin-right: 75%;
}

.row-reverse .large-offset-10 {
  margin-right: 83.33333%;
}

.row-reverse .large-offset-11 {
  margin-right: 91.66667%;
}

.row-reverse .large-offset-12 {
  margin-right: 100%;
}

.row-reverse .large-last {
  margin-right: auto;
}

.row-reverse .large-notlast {
  margin-right: 0;
}

@media only screen and (min-width: 1441px) {
  .row-reverse .xlarge-offset-0 {
    margin-right: 0;
  }

  .row-reverse .xlarge-offset-1 {
    margin-right: 8.33333%;
  }

  .row-reverse .xlarge-offset-2 {
    margin-right: 16.66667%;
  }

  .row-reverse .xlarge-offset-3 {
    margin-right: 25%;
  }

  .row-reverse .xlarge-offset-4 {
    margin-right: 33.33333%;
  }

  .row-reverse .xlarge-offset-5 {
    margin-right: 41.66667%;
  }

  .row-reverse .xlarge-offset-6 {
    margin-right: 50%;
  }

  .row-reverse .xlarge-offset-7 {
    margin-right: 58.33333%;
  }

  .row-reverse .xlarge-offset-8 {
    margin-right: 66.66667%;
  }

  .row-reverse .xlarge-offset-9 {
    margin-right: 75%;
  }

  .row-reverse .xlarge-offset-10 {
    margin-right: 83.33333%;
  }

  .row-reverse .xlarge-offset-11 {
    margin-right: 91.66667%;
  }

  .row-reverse .xlarge-offset-12 {
    margin-right: 100%;
  }

  .row-reverse .xlarge-last {
    margin-right: auto;
  }

  .row-reverse .xlarge-notlast {
    margin-right: 0;
  }
}

@media only screen and (max-width: 1068px) {
  .row-reverse .medium-offset-0 {
    margin-right: 0;
  }

  .row-reverse .medium-offset-1 {
    margin-right: 8.33333%;
  }

  .row-reverse .medium-offset-2 {
    margin-right: 16.66667%;
  }

  .row-reverse .medium-offset-3 {
    margin-right: 25%;
  }

  .row-reverse .medium-offset-4 {
    margin-right: 33.33333%;
  }

  .row-reverse .medium-offset-5 {
    margin-right: 41.66667%;
  }

  .row-reverse .medium-offset-6 {
    margin-right: 50%;
  }

  .row-reverse .medium-offset-7 {
    margin-right: 58.33333%;
  }

  .row-reverse .medium-offset-8 {
    margin-right: 66.66667%;
  }

  .row-reverse .medium-offset-9 {
    margin-right: 75%;
  }

  .row-reverse .medium-offset-10 {
    margin-right: 83.33333%;
  }

  .row-reverse .medium-offset-11 {
    margin-right: 91.66667%;
  }

  .row-reverse .medium-offset-12 {
    margin-right: 100%;
  }

  .row-reverse .medium-last {
    margin-right: auto;
  }
}

@media only screen and (max-width: 1068px) {
  .row-reverse .medium-notlast,
  .row-reverse .small-offset-0 {
    margin-right: 0;
  }

  .row-reverse .small-offset-1 {
    margin-right: 8.33333%;
  }

  .row-reverse .small-offset-2 {
    margin-right: 16.66667%;
  }

  .row-reverse .small-offset-3 {
    margin-right: 25%;
  }

  .row-reverse .small-offset-4 {
    margin-right: 33.33333%;
  }

  .row-reverse .small-offset-5 {
    margin-right: 41.66667%;
  }

  .row-reverse .small-offset-6 {
    margin-right: 50%;
  }

  .row-reverse .small-offset-7 {
    margin-right: 58.33333%;
  }

  .row-reverse .small-offset-8 {
    margin-right: 66.66667%;
  }

  .row-reverse .small-offset-9 {
    margin-right: 75%;
  }

  .row-reverse .small-offset-10 {
    margin-right: 83.33333%;
  }

  .row-reverse .small-offset-11 {
    margin-right: 91.66667%;
  }

  .row-reverse .small-offset-12 {
    margin-right: 100%;
  }

  .row-reverse .small-last {
    margin-right: auto;
  }

  .row-reverse .small-notlast {
    margin-right: 0;
  }
}

.as-grid {
  display: flex;
  flex-wrap: wrap;
}

.as-grid-item {
  flex: 0 auto;
}

.icon:after,
.icon:before,
.more:after,
.more:before {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
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

.icon:before {
  display: none;
}

.icon-after:after,
.more:after {
  padding-left: 0.3em;
  top: 0;
}

.icon-before:before {
  padding-right: 0.3em;
  display: inline-block;
  top: 0;
}

.icon-before:after {
  display: none;
}

.icon-before.icon-apple:before {
  padding-right: 0;
  display: inline-block;
  top: 0;
}

.icon-before.icon-apple:after {
  display: none;
}

.icon-apple:after,
.icon-apple:before {
  content: '';
}

.more-block {
  margin-top: 0.5em;
}

.icon-wrapper .icon,
.icon-wrapper .icon-after:after,
.icon-wrapper .icon-before:before,
.icon-wrapper .more:not(.icon-before):after {
  display: inline;
  position: static;
}

a.icon-wrapper {
  text-decoration: none;
}

a.icon-wrapper:hover .icon-copy {
  text-decoration: underline;
}

html[dir='rtl'] .icon-wrapper {
  unicode-bidi: bidi-override;
}

html[dir='rtl'] .icon-copy {
  unicode-bidi: embed;
}

@font-face {
  font-family: AOS Icons;
  font-style: normal;
  font-weight: 400;
  src: url(https://store.storeimages.cdn-apple.com/dist/assets/as-icons/fonts/aosicons_regular.eot);
  src: url(https://store.storeimages.cdn-apple.com/dist/assets/as-icons/fonts/aosicons_regular.eot#iefix)
      format('embedded-opentype'),
    url(https://store.storeimages.cdn-apple.com/dist/assets/as-icons/fonts/aosicons_regular.woff)
      format('woff'),
    url(https://store.storeimages.cdn-apple.com/dist/assets/as-icons/fonts/aosicons_regular.ttf)
      format('truetype');
}

body {
  min-width: 320px;
}

.large-hide {
  display: none;
}

.large-show {
  display: block;
}

.large-show-inline {
  display: inline;
}

.large-show-inlineblock {
  display: inline-block;
}

@media only screen and (min-width: 1441px) {
  .xlarge-hide {
    display: none;
  }

  .xlarge-show {
    display: block;
  }

  .xlarge-show-inline {
    display: inline;
  }

  .xlarge-show-inlineblock {
    display: inline-block;
  }
}

@media only screen and (max-width: 1068px) {
  .medium-hide {
    display: none;
  }

  .medium-show {
    display: block;
  }

  .medium-show-inline {
    display: inline;
  }

  .medium-show-inlineblock {
    display: inline-block;
  }
}

@media only screen and (max-width: 1068px) {
  .small-hide {
    display: none;
  }

  .small-show {
    display: block;
  }

  .small-show-inline {
    display: inline;
  }

  .small-show-inlineblock {
    display: inline-block;
  }
}

.viewport-content {
  margin-left: auto;
  margin-right: auto;
  width: 980px;
}

@media only screen and (min-width: 1441px) {
  .viewport-content {
    margin-left: auto;
    margin-right: auto;
    width: 980px;
  }
}

@media only screen and (max-width: 1068px) {
  .viewport-content {
    margin-left: auto;
    margin-right: auto;
    width: 94.14966%;
    width: 87.5%;
  }
}

#rr-viewport {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

#rr-viewport:before {
  content: 'large';
}

@media only screen and (min-width: 1441px) {
  #rr-viewport:before {
    content: 'xlarge';
  }
}

@media only screen and (max-width: 1068px) {
  #rr-viewport:before {
    content: 'medium';
    content: 'small';
  }
}

@media only screen and (max-width: 1068px) {
  .as-l-container-mobileoverflow {
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    white-space: nowrap;
    width: auto;
  }

  .as-l-container-mobileoverflow::-webkit-scrollbar {
    display: none;
  }
}

@media only screen and (max-width: 1068px) {
  .as-l-container-mobileoverflow-content {
    box-sizing: border-box;
    display: inline-block;
    min-width: 100%;
  }
}

@media only screen and (max-width: 1068px) and (max-width: 1068px) {
  .as-l-container-mobileoverflow-content {
    width: auto;
    padding-left: calc((100vw - 87.5%) / 2);
    padding-right: calc((100vw - 87.5%) / 2);
  }
}

@media only screen and (max-width: 1068px) {
  .as-l-container-full-small {
    margin-left: -7.14286%;
    margin-right: -7.14286%;
  }
}

.as-l-container-fluid {
  box-sizing: border-box;
  max-width: 1439px;
  min-width: 320px;
  width: 100%;
}

.as-l-bleedcolumn-left,
.as-l-bleedcolumn-right {
  width: 490px;
}

.as-l-bleedcolumn-left {
  margin-left: auto;
}

.as-l-bleedcolumn-right {
  margin-right: auto;
}

@media only screen and (max-width: 1068px) {
  .as-l-bleedcolumn-left,
  .as-l-bleedcolumn-leftbleed,
  .as-l-bleedcolumn-right,
  .as-l-bleedcolumn-rightbleed {
    width: 87.5%;
    margin-left: auto;
    margin-right: auto;
  }
}

.as-l-fullwidth {
  width: 100%;
  overflow: hidden;
}

.theme-dark .link,
.theme-dark a {
  color: #2997ff;
}

.theme-dark .footnote a {
  color: inherit;
}

.theme-dark .footnote a:hover {
  color: #2997ff;
}

.rs-covers {
  text-align: center;
}

.rs-covers-container {
  height: calc(100vh - 44px - 36px);
  min-height: 650px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

@media only screen and (max-width: 1068px) {
  .rs-covers-container {
    min-height: calc(100vh - 48px - 36px);
    margin: auto;
  }
}

.rs-covers-transtion {
  transition-duration: 0.2s;
}

.rs-covers-media {
  display: block;
  width: 260px;
  height: 316px;
}

.rs-covers-media {
  position: absolute;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.rs-covers-textovervideo {
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 1068px) {
  .rs-covers-textovervideo {
    height: unset;
    min-height: calc(100vh - 48px - 36px);
  }
}

.rs-covers-textovervideo .rs-covers-content {
  position: absolute;
}

.rs-covers-media-centered.rs-covers-container {
  justify-content: center;
}

.rs-covers-mediabtn {
  position: absolute;
  right: 40px;
  top: 90px;
  height: 52px;
  width: 52px;
  font-size: 24px;
  background-color: #565656;
  border-radius: 50%;
  z-index: 2;
  opacity: 0;
  cursor: none;
  pointer-events: none;
}

@media only screen and (max-width: 1068px) {
  .rs-covers-mediabtn {
    top: 65px;
    width: 35px;
    height: 35px;
    right: 17px;
    font-size: 18px;
  }
}

.as-keyboarduser .rs-covers-mediabtn {
  opacity: 1;
}

.icon-thumbnailpause:after,
.icon-thumbnailpause:before,
.icon-thumbnailplay:after,
.icon-thumbnailplay:before {
  color: #888;
  padding-left: 16px;
}

@media only screen and (max-width: 1068px) {
  .icon-thumbnailpause:after,
  .icon-thumbnailpause:before,
  .icon-thumbnailplay:after,
  .icon-thumbnailplay:before {
    padding-left: 10px;
  }
}

.rs-covers-heading {
  font-size: 80px;  
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  padding-top: 50px;
}

@media only screen and (max-width: 1068px) {
  .rs-covers-heading {
    font-size: 48px;    
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}

@media only screen and (max-width: 1068px) {
  .rs-covers-heading {
    font-size: 64px;    
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}

@media only screen and (max-width: 1068px) and (max-width: 1068px) {
  .rs-covers-heading {
    font-size: 48px;    
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}

@media only screen and (max-width: 1068px) and (max-width: 1068px) {
  .rs-covers-heading {
    font-size: 40px;    
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}

.rs-covers-desc {
  font-size: 17px;  
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  padding: 19px 0 48px;
  margin: 0 auto;
}

@media only screen and (max-width: 1068px) {
  .rs-covers-desc {
    padding-top: 10px;
  }
}

.nojs {
  text-align: center;
}

.nojs .rs-covers-media-img {
  display: block;
  padding-top: 40px;
  position: static;
  margin: 0 auto;
}
</style>
