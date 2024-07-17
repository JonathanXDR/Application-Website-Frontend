<template>
  <div
    :class="[
      'bar-content-container bar-chip-1 no-badge',
      componentSize,
      { divider },
    ]"
  >
    <span v-if="title" class="bar-caption title pb-3">
      {{ title }}
    </span>
    <LoadingBar :progress="progress" />
    <div class="pt-3">
      <BadgeBar
        v-if="hasBadgesOrTopics"
        :badges="badgesOrTopics"
        :loading="loading"
      />

      <div v-if="hasLinksOrHtmlUrl" class="ctas-wrapper">
        <!-- <ButtonItem variant="secondary" componentSize="small"> Test </ButtonItem> -->
        <!-- <NuxtLink href="photos://" class="icon-wrapper button button-reduced button-neutral">
            <span class="icon-copy"> Open</span>
          </NuxtLink> -->

        <LinkCollection
          :links="linkCollectionLinks"
          :loading="loading"
          :class="{ link: applyHover }"
        />
      </div>
      <InfoBar
        v-if="info"
        v-bind="{
          ...info,
          date: {
            ...info?.date,
            fixed: info?.date?.fixed,
          },
          loading: loading,
        }"
      />
    </div>
  </div>
  <div :class="[{ divider }, componentSize]">
    <figure :class="['stat', divider.direction]">
      <span v-if="progress" class="stat-values title">{{ progress }}%</span>
      <span v-if="eyebrow" class="stat-label eyebrow">{{ eyebrow }}</span>
    </figure>
  </div>
</template>

<script setup lang="ts">
import type { LanguageBarType } from '~/types/common/LanguageBar';

interface V3 extends LanguageBarType {
  loading?: boolean;
  hover?: 'auto' | 'true' | 'false';
  divider: {
    direction: 'left' | 'right' | 'center';
  };
}

const props = withDefaults(defineProps<V3>(), {
  progress: 0,
  componentSize: 'medium',
  loading: false,
  hover: 'auto',
});

const hasBadgesOrTopics = computed(() => props.badges?.length);
const badgesOrTopics = computed(() => props.badges);
const hasLinksOrHtmlUrl = computed(() => props.links?.length);
const linkCollectionLinks = computed(() => props.links);

const info = computed(() => {
  return {
    ...props.info,
  };
});

const applyHover = computed(
  () =>
    (props.hover === 'auto' && props.links && props.links.length >= 1) ||
    props.hover === 'true'
);
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
  padding-left: 20px;
  display: block;
  color: var(--color-fill-gray);
}
.stat .stat-label {
  padding-left: 20px;
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
  top: -25%;
  left: -25%;
  width: 25%;
  height: 150%;
  border-left: none;
}
.divider .stat.right:before {
  top: -25%;
  /* left: 0%; */
  width: 25%;
  height: 150%;
  border-right: none;
}
</style>
