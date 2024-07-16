<template>
  <div
    :class="[
      'bar-content-container bar-chip-1 no-badge divider',
      componentSize,
    ]"
  >
    <span v-if="title" class="bar-caption title">
      {{ title }}
    </span>
    <div class="flex items-center gap-12">
      <LoadingBar :progress="progress" />
      <figure :class="['stat', componentSize]">
        <span v-if="progress" class="stat-values title">{{ progress }}%</span>
        <span v-if="eyebrow" class="stat-label eyebrow">{{ eyebrow }}</span>
      </figure>

      <div
        class="pins animate will-change"
        data-anim-classname-1='{"start":"t + 50% - 100vh","cssClass":"animate"}'
        data-anim-classname-2='{"start":"t - 150vh","end":"b + 150vh","cssClass":"will-change","toggle":true}'
      >
        <div class="pin-wrapper pin-length">
          <span class="image-pin" />
          <span class="pin-caption typography-hardware-label"
            >One PCIe x4 gen 3<br /><span>Apple I/O card</span></span
          >
        </div>
        <div class="pin-wrapper pin-single-wide">
          <span class="image-pin" />
          <span class="pin-caption typography-hardware-label"
            >Four PCIe x8 gen 4<br /><span>Two single height</span><br /><span
              >Two double height</span
            ></span
          >
        </div>
        <div class="pin-wrapper pin-double-wide">
          <span class="image-pin" />
          <span class="pin-caption typography-hardware-label"
            >Two PCIe x16 gen 4<br /><span>Double height</span></span
          >
        </div>
      </div>
    </div>
    <LinkCollection :links="links" />
  </div>
</template>

<script setup lang="ts">
import type { LanguageBarType } from '~/types/common/LanguageBar';

withDefaults(defineProps<LanguageBarType>(), {
  componentSize: 'medium',
  progress: 0,
});
</script>

<style scoped>
.stat {
  --sk-stat-value-color: rgb(29, 29, 31);
  --sk-stat-caption-color: rgb(29, 29, 31);
  --sk-stat-currency-offset: -0.375em;
  --sk-stat-caption-lines-top: 1;
  --sk-stat-caption-lines-bottom: 1;
  --sk-stat-margin-top: calc(1em * var(--sk-stat-caption-lines-top));
  --sk-stat-margin-bottom: calc(1em * var(--sk-stat-caption-lines-bottom));
  margin-inline-end: 2em;
  color: var(--sk-stat-value-color);
  box-sizing: border-box;
  display: inline-block;
  font-size: 20px;
}
.stat {
  position: relative;
  z-index: 1;
}
.stat {
  --above-offset: 1.4em;
  position: relative;
}
.stat {
  color: var(--color-figure-gray-secondary);
}
.bar-content-container {
  position: relative;
  width: 100%;
  grid-column-start: 1;
}
.bar-caption {
  display: inline-block;
  padding-top: 12px;
  color: var(--color-fill-gray);
}
@media only screen and (max-width: 734px) {
  .bar-caption {
    white-space: normal;
  }
}
.stat {
  margin-top: -5px;
  margin-inline-end: 0;
}
.stat .stat-values {
  display: block;
  color: var(--color-fill-gray);
}
.stat .stat-label {
  display: block;
  color: var(--color-figure-gray-secondary);
}
.stat .stat-label:first-child {
  margin-top: -16px;
}
@media only screen and (max-width: 734px) {
  .stat .stat-label:first-child {
    margin-top: -3px;
  }
}
.stat .stat-label:last-child {
  margin-top: 2px;
}

.eyebrow {
  color: var(--color-figure-gray-secondary);
  display: block;
  margin: 0;
}

.xsmall .eyebrow {
  font-size: 14px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.small .eyebrow {
  font-size: 15px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.medium .eyebrow {
  font-size: 17px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.large .eyebrow {
  font-size: 20px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.full .eyebrow {
  font-size: 17px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  color: var(--color-welcome-featured-card-eyebrow-text);
}

.xsmall .title {
  font-size: 14px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.small .title {
  font-size: 17px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.medium .title {
  font-size: 21px;
  /* 20.2380952385px */
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.large .title {
  font-size: 28px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;

  /* Styles without cover */
  color: var(--color-card-content-text);
}

.full .title {
  font-size: 21px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.divider .stat {
  padding-left: 10px;
  margin-left: 10px;
  border-left: 1px solid var(--color-figure-gray-secondary);
}

.typography-hardware-label {
  font-size: 19px;
  line-height: 1.2105263158;
  font-weight: 600;
  letter-spacing: 0.012em;
  font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
    sans-serif;
}
@media only screen and (max-width: 1068px) {
  .typography-hardware-label {
    font-size: 19px;
    line-height: 1.2105263158;
    font-weight: 600;
    letter-spacing: 0.012em;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .typography-hardware-label {
    font-size: 14px;
    line-height: 1.4285914286;
    font-weight: 400;
    letter-spacing: -0.016em;
    font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}
.typography-hardware-label {
  font-weight: 700;
  color: var(--color-fill-gray);
}
.pins {
  position: absolute;
  top: 0;
  left: 88.5%;
  width: 41%;
  height: 100%;
}
@media only screen and (max-width: 1068px) {
  .pins {
    left: 80.5%;
    width: 55%;
  }
}
@media only screen and (max-width: 734px) {
  .pins {
    left: 87%;
    width: 200px;
  }
}
.pins.animate .pin-wrapper {
  opacity: 1;
}
.pins.will-change .pin-wrapper {
  will-change: opacity;
}
.pin-wrapper {
  position: absolute;
  width: 100%;
  opacity: 0;
  transition: opacity 1.5s;
}
.image-pin {
  position: absolute;
  width: 100%;
  border-top: 1px solid var(--color-figure-gray-secondary);
}
.pin-caption {
  display: block;
  position: absolute;
  right: 0;
  width: 100%;
  padding-top: 3.6%;
  text-align: right;
}
@media only screen and (max-width: 1068px) {
  .pin-caption {
    padding-top: 4.5%;
  }
}
@media only screen and (max-width: 734px) {
  .pin-caption {
    padding-top: 6px;
    max-width: 140px;
  }
}
.pin-caption span {
  font-weight: 500;
  color: #86868b;
}
.pin-length {
  top: 43.5%;
}
.pin-single-wide {
  top: 57.3%;
  height: 29.7%;
  transition-delay: 0.5s;
}
.pin-single-wide .image-pin {
  left: 2%;
  width: 98%;
  height: 72%;
}
.pin-single-wide .image-pin:before {
  content: '';
  position: absolute;
  top: -52%;
  left: -2%;
  width: 2%;
  height: 100%;
  border: 1px solid var(--color-figure-gray-secondary);
  border-left: none;
}
.pin-double-wide {
  top: 77.9%;
  height: 9.5%;
  transition-delay: 1s;
}
@media only screen and (max-width: 734px) {
  .pin-double-wide {
    top: 77.7%;
  }
}
.pin-double-wide .image-pin {
  left: 2%;
  width: 98%;
  height: 100%;
}
.pin-double-wide .image-pin:before {
  content: '';
  position: absolute;
  top: -50%;
  left: -2%;
  width: 2%;
  height: 100%;
  border: 1px solid var(--color-figure-gray-secondary);
  border-left: none;
}
</style>
