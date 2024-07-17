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
      <figure :class="['stat left', componentSize]">
        <span v-if="progress" class="stat-values title">{{ progress }}%</span>
        <span v-if="eyebrow" class="stat-label eyebrow">{{ eyebrow }}</span>
      </figure>
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
  padding-left: 10px;
  display: block;
  color: var(--color-fill-gray);
}
.stat .stat-label {
  padding-left: 10px;
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
  /* border-top: 1px solid var(--color-figure-gray-secondary); */
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
  /* padding-left: 10px; */
  margin-left: 10px;
}

.divider .stat.center {
  border-left: 1px solid var(--color-figure-gray-secondary);
}

.divider .stat:before {
  content: '';
  position: absolute;
  border: 1px solid var(--color-figure-gray-secondary);
}

.divider .stat.left:before {
  /* top: -52%; */
  /* left: -10%;
  width: 10%; */
  left: -20%;
  width: 20%;
  height: 100%;
  border-left: none;
}
.divider .stat.right:before {
  top: -15%;
  /* left: 0%; */
  width: 20%;
  height: 130%;
  border-right: none;
}
</style>
