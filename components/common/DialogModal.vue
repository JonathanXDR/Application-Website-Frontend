<template>
  <div
    :class="[
      'fade-transition-wrapper overlay overlay-cover rc-overlay rc-overlay-popup rc-overlay-fixed-width',
      { 'r-fade-transition-enter-done': open },
      { 'r-fade-transition-exit-done': !open }
    ]"
  >
    <div class="content">
      <div class="rc-overlay-popup-outer">
        <div class="rc-overlay-popup-content">
          <div class="rc-overlay-loader-content">
            <div class="dd-modal">
              <slot />
            </div>
          </div>
        </div>
        <button type="button" class="rc-overlay-close" @click="toggleModal()">
          <span class="rc-overlay-closesvg"
            ><svg
              width="21"
              height="21"
              class="as-svgicon as-svgicon-close as-svgicon-tiny as-svgicon-closetiny"
            >
              <path fill="none" d="M0 0h21v21H0z" />
              <path
                d="m12.12 10 4.07-4.06a1.5 1.5 0 1 0-2.11-2.12L10 7.88 5.94 3.81a1.5 1.5 0 1 0-2.12 2.12L7.88 10l-4.07 4.06a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L10 12.12l4.06 4.07a1.45 1.45 0 0 0 1.06.44 1.5 1.5 0 0 0 1.06-2.56Z"
              /></svg
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
  }>(),
  {
    title: 'Title',
    description: 'Description'
  }
)

const open = ref(false)
const toggleModal = () => {
  open.value = !open.value
}
</script>

<style scoped>
.more:after,
.more:before {
  alt: '';
  color: inherit;
  display: inline-block;
  font-family: SF Pro Icons;
  font-size: inherit;
  font-style: normal;
  font-weight: inherit;
  line-height: 1;
  position: relative;
  text-decoration: underline;
  text-decoration: none;
  z-index: 1;
}

.more:before {
  display: none;
}

.more:after {
  padding-inline-start: 0.24em;
  top: 0;
}

html:not([dir='rtl']) .more:after,
html:not([dir='rtl']) .more:before {
  content: '';
}

a.more {
  text-decoration: none;
}

a.more:hover {
  text-decoration: underline;
}

.a11y {
  clip: rect(1px, 1px, 1px, 1px);
  border: 0;
  -webkit-clip-path: inset(0 0 99.9% 99.9%);
  clip-path: inset(0 0 99.9% 99.9%);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.as-svgicon {
  fill: currentColor;
}

.as-svgicon {
  display: block;
}

.fade-transition-wrapper {
  opacity: 0;
  transition-duration: 0.4s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}

.r-fade-transition-enter-done {
  opacity: 1;
}

.overlay.r-fade-transition-exit-done {
  display: none;
}

.overlay {
  align-items: flex-start;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  inset-inline-end: 0;
  inset-inline-start: 0;
  overflow: auto;
  padding: 54px 0;
  position: fixed;
  top: 0;
  z-index: 99999;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;
}

.overlay.fade-transition-wrapper {
  transition-duration: 0.1s;
}

.content {
  background: var(--color-fill);
  margin: auto;
  padding: 30px;
  position: relative;
}

.overlay-cover {
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  background: var(--color-dialog-background);
  -webkit-tap-highlight-color: transparent;
}

.rc-overlay-close {
  align-items: center;
  align-self: flex-end;
  cursor: pointer;
  display: flex;
  height: 44px;
  justify-content: center;
  margin-inline-end: 20px;
  margin-top: 20px;
  order: -1;
  width: 44px;
  z-index: 1;
}

.rc-overlay-close .rc-overlay-closesvg {
  align-items: center;
  background: var(--color-fill-gray-quaternary);
  border-radius: 50%;
  color: var(--color-figure-gray-secondary);
  display: flex;
  height: 36px;
  outline: none;
  position: relative;
  transition: color 0.1s linear, background 0.1s linear;
  width: 36px;
}

.rc-overlay-close .rc-overlay-closesvg svg {
  fill: currentColor;
  height: 20px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 20px;
}

.rc-overlay-close:hover .rc-overlay-closesvg {
  background: var(--base-color);
  color: var(--color-figure-gray-secondary-alt);
}

.rc-overlay-close:active .rc-overlay-closesvg {
  background: var(--color-fill-gray-tertiary);
}

.rc-overlay-popup.overlay {
  margin: 0;
  padding: 0;
}

@media (max-width: 734px) and (max-device-width: 736px) {
  .rc-overlay-popup.overlay {
    padding: 0 20px;
  }
}

.rc-overlay-popup .content {
  background: transparent;
  max-width: 816px;
  padding: 0;
}

@media (max-width: 734px) and (max-device-width: 736px) {
  .rc-overlay-popup .content {
    border: none;
    max-width: 640px;
    padding: 0;
  }

  .rc-overlay-popup .content:focus {
    outline-offset: -4px;
  }
}

.rc-overlay-popup-outer {
  background: var(--color-fill);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  margin: 40px 0;
}

.rc-overlay-popup-content {
  border-radius: 18px;
  margin-top: -64px;
  overflow: hidden;
  padding: 76px;
}

@media (max-width: 734px) and (max-device-width: 736px) {
  .rc-overlay-popup-content {
    padding: 76px 6.25% 60px;
  }
}

@media (max-width: 734px) and (max-device-width: 736px) {
  .rc-overlay-fixed-width.overlay {
    padding: 0;
  }

  .rc-overlay-fixed-width .rc-overlay-popup-outer {
    border-radius: 18px 18px 0 0;
    margin-bottom: 0;
    margin-top: 20px;
    min-height: calc(100vh - 20px);
  }
}

.rc-overlay-fixed-width .content {
  min-width: min(48rem, 100vw);
}

@media (max-width: 734px) and (max-device-width: 736px) {
  .rc-overlay-fixed-width .content {
    min-height: 100vh;
    min-width: 320px;
    width: 100%;
  }
}

.dd-modal p + .t-label {
  margin-top: 1em;
}

.t-headline-reduced {
  font-size: 40px;
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: 0;
  font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
}

@media only screen and (max-width: 734px) and (max-device-width: 736px) {
  .t-headline-reduced {
    font-size: 28px;
    line-height: 1.1428571429;
    font-weight: 600;
    letter-spacing: 0.007em;
    font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
  }
}

.t-label {
  font-size: 24px;
  line-height: 1.1666666667;
  font-weight: 600;
  letter-spacing: 0.009em;
  font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
}

@media only screen and (max-width: 734px) and (max-device-width: 736px) {
  .t-label {
    font-size: 21px;
    line-height: 1.1904761905;
    font-weight: 600;
    letter-spacing: 0.011em;
    font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
  }
}

.t-headline-reduced + .t-body,
.t-headline-reduced + p {
  --sk-headline-plus-first-element-margin: 1em;
}
</style>
