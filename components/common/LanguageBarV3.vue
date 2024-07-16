<template>
  <div class="bar-content-container bar-chip-1 no-badge">
    <LoadingBar :progress="progress" />
    <!-- <div class="bar-mask bar-mask-1" :style="`width: ${progress}%`">
      <hr class="bar bar-1" >
    </div> -->
    <span class="bar-caption typography-graph-label">
      {{ title }}
      <sup class="footnote footnote-number">
        <a href="#footnote-7" aria-label="Footnote 4, Close" />
      </sup>
    </span>
  </div>
  <figure class="stat">
    <!-- <span class="stat-label typography-graph-label">Up to</span> -->
    <span class="stat-values typography-graph-stat">{{ progress }}%</span>
    <span class="stat-label typography-graph-label">Fliessend</span>
  </figure>
</template>

<script setup lang="ts">
import type { LanguageBarType } from "~/types/common/LanguageBar";

defineProps<LanguageBarType>();
</script>

<style scoped>
.theme-dark .stat {
  --sk-stat-value-color: rgb(245, 245, 247);
  --sk-stat-caption-color: rgb(245, 245, 247);
}
sup {
  position: relative;
  font-size: 0.6em;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
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
  vertical-align: baseline;
  font-feature-settings: "numr";
  font-size: 1em;
}
sup.footnote-number {
  top: initial;
}
.page-ipad-pro .footnote a {
  text-decoration: underline;
}
sup {
  position: relative;
  font-size: var(--sk-footnote-font-size, 0.6em);
  vertical-align: initial;
}
sup {
  top: var(--sk-footnote-offset-top, -0.5em);
}
.footnote a {
  vertical-align: inherit;
  color: inherit;
}
.footnote-number {
  position: relative;
  vertical-align: initial;
  text-underline-offset: -0.28em;
  font-feature-settings: "numr";
  font-size: 1em;
}
sup.footnote-number {
  top: auto;
}
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
  min-width: 5em;
}
.stat {
  position: relative;
  z-index: 1;
}
.theme-dark .stat {
  --sk-stat-value-color: rgb(245, 245, 247);
  --sk-stat-caption-color: rgb(245, 245, 247);
}
.typography-graph-stat {
  font-size: 48px;
  line-height: 1.0834933333;
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
  .typography-graph-stat {
    font-size: 48px;
    line-height: 1.0834933333;
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
  .typography-graph-stat {
    font-size: 32px;
    line-height: 1.125;
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
.typography-graph-label {
  font-size: 14px;
  line-height: 1.2857742857;
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
  .typography-graph-label {
    font-size: 14px;
    line-height: 1.2857742857;
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
  .typography-graph-label {
    font-size: 14px;
    line-height: 1.2857742857;
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
/*! CSS Used from: https://www.apple.com/v/ipad-pro/aq/built/styles/overview.built.css */
.stat {
  --above-offset: 1.4em;
  position: relative;
}
.stat {
  color: var(--color-figure-gray-secondary);
}
.theme-dark .stat {
  color: var(--color-figure-gray-secondary);
}

.bar-content-container {
  position: relative;
  width: 100%;
  grid-column-start: 1;
}
.bar-mask {
  position: relative;
  overflow: hidden;
  border-radius: calc(10px / 2);
  height: 10px;
  z-index: 1;
}
.bar-mask.bar-mask-2 {
  margin-top: 10px;
}
.bar {
  margin: 0;
  border: 0;
  height: 100%;
  width: 100%;
  transform-origin: left;
  border-radius: inherit;
  background: var(--color-fill-gray);
}
.bar-caption {
  font-size: 17px;
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

.bar-chip-3 .bar-1 {
  background-image: linear-gradient(269deg, #c0d590, #8acad2 94%);
}

.bar-chip-3 + .stat .stat-values {
  color: #c0d590;
}
</style>
