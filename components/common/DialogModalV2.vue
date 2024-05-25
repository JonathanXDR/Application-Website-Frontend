<template>
  <div :class="['modal modal-page-overlay', { 'modal-open': open }]">
    <div class="modal-overlay-container">
      <div class="modal-overlay">
        <div class="modal-content-container">
          <div
            id="icon-card-modal-content-delivery"
            class="icon-card icon-card-modal-content modal-content delivery"
          >
            <h2 v-if="eyebrow" class="typography-site-modal-topic-label">
              {{ eyebrow }}
            </h2>
            <p v-if="title" class="typography-site-modal-headline">
              {{ title }}
            </p>
            <p v-if="description" class="typography-site-modal-body">
              {{ description }}
            </p>
            <slot />
          </div>
        </div>
        <button class="modal-close-button" @click="toggle()">
          <span class="modal-close-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DialogModalType } from '~/types/common/DialogModal'

withDefaults(defineProps<DialogModalType>(), {
  orientation: 'vertical',
  full: false,
  blurredBackground: false
})

const open = ref(true)
const toggle = () => {
  open.value = !open.value
}
</script>

<style scoped>
.visuallyhidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0 0 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}
.icon:after,
.icon:before,
.more:after,
.more:before {
  font-family: SF Pro Icons;
  color: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: inherit;
  font-size: inherit;
  line-height: 1;
  text-decoration: underline;
  position: relative;
  z-index: 1;
  alt: '';
  text-decoration: none;
}
.icon:before,
.more:before {
  display: none;
}
.icon-after:after,
.more:after {
  padding-inline-start: 0.24em;
  top: 0;
}
html:not([dir='rtl']) .more:after,
html:not([dir='rtl']) .more:before {
  content: '';
}
.icon-wrapper .icon,
.icon-wrapper .icon-after:after,
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
.typography-site-modal-body {
  font-size: 19px;
  line-height: 1.4211026316;
  font-weight: 400;
  letter-spacing: 0.012em;
  font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
    sans-serif;
}
@media only screen and (max-width: 734px) {
  .typography-site-modal-body {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 400;
    letter-spacing: -0.022em;
    font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}
.typography-site-modal-headline {
  font-size: 56px;
  line-height: 1.0714285714;
  font-weight: 600;
  letter-spacing: -0.005em;
  font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
    sans-serif;
}
@media only screen and (max-width: 1068px) {
  .typography-site-modal-headline {
    font-size: 48px;
    line-height: 1.0834933333;
    font-weight: 600;
    letter-spacing: -0.003em;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .typography-site-modal-headline {
    font-size: 40px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: 0em;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}
.typography-site-modal-inline-headline {
  font-size: 19px;
  line-height: 1.4211026316;
  font-weight: 600;
  letter-spacing: 0.012em;
  font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
    sans-serif;
}
@media only screen and (max-width: 734px) {
  .typography-site-modal-inline-headline {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 600;
    letter-spacing: -0.022em;
    font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}
.typography-site-modal-topic-label {
  font-size: 19px;
  line-height: 1.4211026316;
  font-weight: 600;
  letter-spacing: 0.012em;
  font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
    sans-serif;
}
@media only screen and (max-width: 734px) {
  .typography-site-modal-topic-label {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 600;
    letter-spacing: -0.022em;
    font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}
.theme-dark .modal {
  --modal-overlay-background: rgb(29, 29, 31);
}
.theme-dark .modal:not(.modal-close-button-light) {
  --modal-close-background: rgb(51, 51, 54);
  --modal-close-background-hover: #37373a;
  --modal-close-background-active: #2f2f32;
  --modal-close-color: rgba(255, 255, 255, 0.8);
  --modal-close-color-hover: rgb(255, 255, 255);
}
.modal-close-button {
  cursor: auto;
  position: var(--modal-close-button-position);
  order: 1;
  display: flex;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  height: var(--modal-close-button-size);
  width: var(--modal-close-button-size);
  margin: 0;
  padding: 0;
  border: 0;
  margin-inline-end: var(--modal-close-button-offset-inline-start);
  margin-top: var(--modal-close-button-offset-top);
  top: var(--modal-close-button-offset-top);
}
.modal-close-button {
  cursor: pointer;
}
.modal-close-button:hover .modal-close-icon {
  background: var(--modal-close-background-hover);
  color: var(--modal-close-color-hover);
}
.modal-close-button:active .modal-close-icon {
  background: var(--modal-close-background-active);
}
.modal-close-button .modal-close-icon {
  background: var(--modal-close-background);
  border-radius: var(--modal-close-border-radius);
  color: var(--modal-close-color);
  display: flex;
  align-items: center;
  height: var(--modal-close-icon-size);
  width: var(--modal-close-icon-size);
  outline: none;
  transition: color 100ms linear, background 100ms linear;
  position: relative;
}
.modal-close-button .modal-close-icon svg {
  fill: currentColor;
  position: absolute;
  inset-inline-start: 50%;
  height: var(--modal-close-icon-svg-size);
  width: var(--modal-close-icon-svg-size);
}
html:not([dir='rtl']) .modal-close-button .modal-close-icon svg {
  transform: translateX(-50%);
}
.modal-close-button .modal-close-icon * {
  pointer-events: none;
}
.modal {
  --modal-overlay-background: rgb(255, 255, 255);
  --modal-overlay-padding-top: 76px;
  --modal-overlay-padding-bottom: 76px;
  --modal-overlay-padding-inline: 76px;
  --modal-close-button-offset-top: 16px;
  --modal-close-button-offset-inline-start: 16px;
  --modal-close-button-size: 44px;
  --modal-close-background: rgb(232, 232, 237);
  --modal-close-background-hover: #ececf0;
  --modal-close-background-active: #dfdfe4;
  --modal-close-color: rgba(0, 0, 0, 0.56);
  --modal-close-color-hover: rgba(0, 0, 0, 0.72);
  --modal-close-border-radius: 50%;
  --modal-close-button-position: sticky;
  --modal-close-icon-size: 36px;
  --modal-close-icon-svg-size: 20px;
  background: var(--modal-scrim-background, var(--modal-overlay-background));
  position: fixed;
  z-index: -1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  overflow: auto;
}
@media only screen and (max-width: 480px) {
  .modal {
    --modal-overlay-padding-inline: 6.25%;
  }
}
.modal .modal-overlay-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 100%;
}
.modal .modal-overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}
.modal .modal-content-container {
  background: var(--modal-overlay-background);
  order: 2;
  box-sizing: border-box;
  padding-inline-start: var(--modal-overlay-padding-inline);
  padding-inline-end: var(--modal-overlay-padding-inline);
  padding-top: var(--modal-overlay-padding-top);
  padding-bottom: var(--modal-overlay-padding-bottom);
  margin-top: calc(-44px + var(--modal-close-button-offset-top) * -1);
}
.modal-open {
  display: block;
  z-index: 11000;
}
.modal-page-overlay {
  --modal-scrim-background: rgba(0, 0, 0, 0.48);
  --modal-overlay-margin-top: 40px;
  --modal-overlay-margin-bottom: var(--modal-overlay-margin-top);
  --modal-overlay-border-radius-top: 18px;
  --modal-overlay-border-radius-bottom: var(--modal-overlay-border-radius-top);
  --modal-overlay-width: 816.6666666667px;
}
@media only screen and (max-width: 1068px) {
  .modal-page-overlay {
    --modal-overlay-width: 692px;
  }
}
@media only screen and (max-width: 734px) {
  .modal-page-overlay {
    --modal-overlay-width: max(87.5%, 480px);
    --modal-overlay-padding-bottom: 60px;
  }
}
@media only screen and (max-width: 480px) {
  .modal-page-overlay {
    --modal-overlay-border-radius-bottom: 0;
    --modal-overlay-width: 100%;
    --modal-close-button-offset-top: max(16px, env(safe-area-inset-top));
  }
  html:not([dir='rtl']) .modal-page-overlay {
    --modal-close-button-offset-inline-start: max(
      16px,
      env(safe-area-inset-left)
    );
  }
}
@media only screen and (max-width: 480px) {
  .modal-page-overlay .modal-overlay-container {
    flex-direction: column;
  }
}
.modal-page-overlay .modal-overlay {
  margin-inline-start: auto;
  margin-inline-end: auto;
  box-sizing: border-box;
  border-radius: var(--modal-overlay-border-radius-top)
    var(--modal-overlay-border-radius-top)
    var(--modal-overlay-border-radius-bottom)
    var(--modal-overlay-border-radius-bottom);
  width: var(--modal-overlay-width);
  margin-top: var(--modal-overlay-margin-top);
  margin-bottom: var(--modal-overlay-margin-bottom);
}
@media only screen and (max-width: 480px) {
  .modal-page-overlay .modal-overlay {
    --modal-overlay-margin-top: 20px;
    --modal-overlay-margin-bottom: 0;
    flex-grow: 1;
  }
  .modal-page-overlay .modal-overlay .modal-content-container {
    flex-grow: 1;
  }
}
.modal-page-overlay .modal-overlay .modal-content-container {
  border-radius: inherit;
  mask-image: radial-gradient(white, black);
}
.icon-card {
  position: relative;
  height: 100%;
}
@media only screen and (max-width: 734px) {
  .icon-card-modal-content h2.typography-site-modal-topic-label {
    max-width: none;
  }
}
</style>
