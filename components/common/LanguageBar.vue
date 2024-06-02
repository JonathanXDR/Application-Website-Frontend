<template>
  <div class="item-container">
    <div
      id="standard-gallery-item-1"
      class="gallery-item current"
      style="z-index: 2; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        {{ language.title }}
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" :style="`width: ${language.progress}%`">
              <hr
                class="bar bar-1"
                style="transform: matrix(1, 0, 0, 1, 0, 0); opacity: 1"
              >
            </div>
            <span class="bar-caption">
              {{ language.description }}
            </span>
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">7.6</span>
                <span class="badge-unit">%</span>
              </div>
              <span class="badge-caption" />
            </div>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LanguageBarType } from '~/types/common/LanguageBar'

withDefaults(
  defineProps<{
    language: LanguageBarType
  }>(),
  {
    language: () => ({} as LanguageBarType)
  }
)
</script>

<style scoped>
.footnote a {
  vertical-align: inherit;
  color: inherit;
}
.footnote a:hover {
  color: #06c;
  text-decoration: none;
}
.footnote-number {
  position: relative;
  vertical-align: initial;
  font-feature-settings: 'numr';
  font-size: 1em;
}
sup.footnote-number {
  top: auto;
}
br.small {
  display: none;
}
@media only screen and (max-width: 1068px) {
  br.small {
    display: none;
  }
}
@media only screen and (max-width: 734px) {
  br.small {
    display: block;
  }
}
.badge {
  margin-right: 2em;
  box-sizing: border-box;
  display: inline-block;
  font-size: 20px;
  min-width: 5em;
  position: relative;
  z-index: 1;
}
.badge .badge-content {
  margin: 1em 0;
  padding-top: 4px;
  padding-bottom: 2px;
  position: relative;
  z-index: 1;
}
.badge .badge-value {
  left: -2px;
  display: block;
  white-space: nowrap;
  position: relative;
  z-index: 1;
}
.badge .badge-caption {
  left: 0;
  box-sizing: border-box;
  display: block;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;
}
.badge .badge-value {
  font-size: 48px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}
.badge .badge-caption {
  font-size: 14px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}
sup.footnote-number {
  font-size: 0.6em;
  top: -0.5em;
}
.item-container {
  position: relative;
  margin-top: 78px;
}
@media only screen and (max-width: 1068px) {
  .item-container {
    margin-top: 68px;
  }
}
@media only screen and (max-width: 734px) {
  .item-container {
    margin-top: 36px;
  }
}
.item-container .disclaimer,
.item-container .total-column-1 {
  grid-column: span 12;
}
.item-container .disclaimer {
  font-size: 28px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}
@media only screen and (max-width: 1068px) {
  .item-container .disclaimer {
    font-size: 21px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
.item-container .gallery-item {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  width: 100%;
}
.item-container .gallery-item:not(.current) {
  pointer-events: none;
  opacity: 0 !important;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
@media only screen and (max-width: 1068px) {
  .item-container .gallery-item {
    display: block;
  }
}
.item-container .gallery-item .group {
  margin-top: 0;
}
.item-container .gallery-item .bars-container {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-auto-rows: 1fr;
  grid-row-gap: 15px;
  row-gap: 15px;
  grid-column-gap: 30px;
  column-gap: 30px;
  margin-top: 0;
  padding-top: 46px;
}
@media only screen and (max-width: 1068px) {
  .item-container .gallery-item .bars-container {
    grid-column-gap: 22px;
    column-gap: 22px;
  }
}
@media only screen and (max-width: 734px) {
  .item-container .gallery-item .bars-container {
    padding-top: 48px;
  }
}
.item-container .gallery-item .bars-container .bar-content-container {
  position: relative;
  width: 100%;
  grid-column-start: 1;
}
.item-container .gallery-item .bars-container .bar-mask {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  height: 10px;
  z-index: 1;
}
.item-container .gallery-item .bars-container .bar {
  margin: 0;
  border: 0;
  opacity: 0;
  height: 100%;
  transform-origin: left;
  border-radius: inherit;
  background-color: var(--color-fill-gray);
}
.item-container .gallery-item .bars-container .bar-caption {
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  display: inline-block;
  padding-top: 12px;
}
@media only screen and (max-width: 734px) {
  .item-container .gallery-item .bars-container .bar-caption {
    white-space: normal;
  }
}
.item-container .gallery-item .bars-container .badge {
  border-top: none;
  padding: 0;
  margin: 0;
  min-width: unset;
}
.item-container .gallery-item .bars-container .badge-content {
  margin: 0;
  top: -10px;
  padding-top: 0;
  padding-bottom: 0;
}
@media only screen and (max-width: 1068px) {
  .item-container .gallery-item .bars-container .badge-content {
    top: -8px;
  }
}
.item-container .gallery-item .bars-container .badge-value-container {
  display: flex;
  align-items: center;
}
.item-container .gallery-item .bars-container .badge-unit,
.item-container .gallery-item .bars-container .badge-value {
  font-size: 48px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  display: inline-block;
}
@media only screen and (max-width: 1068px) {
  .item-container .gallery-item .bars-container .badge-unit,
  .item-container .gallery-item .bars-container .badge-value {
    font-size: 28px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
.item-container .gallery-item .bars-container .badge-caption {
  position: relative;
  top: -3px;
}
hr {
  margin: 90px 0;
  border: 0;
  height: 1px;
  background-color: #86868b;
}
@media only screen and (max-width: 1068px) {
  hr {
    margin: 52px 0;
  }
}
@media only screen and (max-width: 734px) {
  hr {
    margin: 54px 6.25%;
  }
}
@media only screen and (max-width: 734px) {
  .item-container {
    padding-left: 6.25% !important;
    padding-right: 6.25% !important;
  }
}
.item-container {
  margin-top: 62px !important;
}
@media only screen and (max-width: 1068px) {
  .item-container {
    margin-top: 52px !important;
  }
}
@media only screen and (max-width: 734px) {
  .item-container {
    margin-top: 40px !important;
  }
}
.item-container .gallery-item:not(.current) {
  visibility: hidden !important;
}
.item-container .disclaimer {
  padding-bottom: 15px !important;
}
@media only screen and (max-width: 1068px) {
  .item-container .disclaimer {
    padding-bottom: 39px !important;
  }
}
.item-container .bars-container {
  padding-top: 45px !important;
  grid-row-gap: 40px !important;
  row-gap: 40px !important;
  grid-auto-rows: auto !important;
}
@media only screen and (max-width: 1068px) {
  .item-container .bars-container {
    padding-top: 21px !important;
  }
}
@media only screen and (min-width: 735px) and (max-width: 1068px) {
  .item-container .bars-container .bar-caption {
    padding-top: 13px !important;
  }
}
@media only screen and (max-width: 734px) {
  .item-container .bars-container .badge {
    margin-top: 2px !important;
  }
}
.item-container .bars-container .badge-unit,
.item-container .bars-container .badge-value {
  font-size: 56px !important;
  font-weight: 600 !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}
@media only screen and (max-width: 1068px) {
  .item-container .bars-container .badge-unit,
  .item-container .bars-container .badge-value {
    font-size: 48px !important;
    font-weight: 600 !important;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .item-container .bars-container .badge-unit,
  .item-container .bars-container .badge-value {
    font-size: 28px !important;
    font-weight: 600 !important;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
.item-container .bars-container .bar:not(.bar-baseline .bar) {
  background: var(--color-fill-gray);
}
.item-container .bars-container .bar:is(.bar-baseline .bar) {
  background-color: var(--color-fill-gray) !important;
}
</style>
