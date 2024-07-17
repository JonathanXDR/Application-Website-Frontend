<template>
  <div
    :class="[
      'h-full items-center gap-8 md:gap-16 lg:gap-24',
      {
        'grid-cols-[100px_1fr] sm:grid-cols-[150px_1fr] lg:grid-cols-[200px_1fr]':
          width === 'full' && direction === 'right',
      },
      {
        'grid-cols-[1fr_100px] sm:grid-cols-[1fr_150px] lg:grid-cols-[1fr_200px]':
          width === 'full' && direction === 'left',
      },
      { 'grid auto-rows-[1fr]': width === 'full' },
      { flex: width === 'compact' },
      { divider },
      direction,
      componentSize,
    ]"
  >
    <div
      :class="[
        'bar-content-container bar-chip-1 no-badge',
        { 'order-1': direction === 'right' },
      ]"
      :style="{
        width: width === 'full' ? '100%' : `${progress}%`,
      }"
    >
      <span v-if="title" class="bar-caption title pb-3 md:pb-4 lg:pb-5">
        {{ title }}
      </span>
      <LoadingBar
        :progress="width === 'full' ? progress : 100"
        :background="width === 'full' ? true : false"
      />
      <div class="pt-3 md:pt-4 lg:pt-5">
        <!-- CardItem start -->
        <span v-if="eyebrow" class="stat-label">
          {{ description }}
        </span>
        <BadgeBar v-if="badges?.length" :badges="badges" :loading="loading" />
        <div v-if="links?.length" class="ctas-wrapper">
          <LinkCollection
            :links="links"
            :loading="loading"
            :class="{ link: applyHover }"
          />
        </div>
        <InfoBar v-if="info" v-bind="{ ...info, loading }" />
        <!-- CardItem end -->
      </div>
    </div>

    <figure :class="['stat', `divider-${divider?.direction}`]">
      <span v-if="progress" class="stat-values title">{{ progress }}%</span>
      <span
        v-if="eyebrow"
        :class="['stat-label eyebrow', { 'hyphens-auto': width === 'full' }]"
      >
        {{ eyebrow }}
      </span>
    </figure>
  </div>
</template>

<script setup lang="ts">
import type { LanguageBarType } from "~/types/common/LanguageBar";

const props = withDefaults(defineProps<LanguageBarType>(), {
  progress: 0,
  componentSize: "medium",
  loading: false,
  width: "compact",
  hover: "auto",
  direction: "left",
});

const applyHover = computed(
  () =>
    (props.hover === "auto" && props.links && props.links.length >= 1) ||
    props.hover === "true",
);
</script>

<style scoped>
.stat {
  height: 100%;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.divider.left .stat {
  align-items: flex-start;
}
.divider.right .stat {
  align-items: flex-end;
}
.stat {
  position: relative;
  z-index: 1;
}
.stat {
  color: var(--color-figure-gray-secondary);
}
.bar-content-container {
  height: 100%;
  position: relative;
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
.stat .stat-values {
  display: block;
  color: var(--color-fill-gray);
}
.divider.left .stat .stat-values,
.divider.left .stat .stat-label {
  padding-left: 20px;
}
.divider.right .stat .stat-values,
.divider.right .stat .stat-label {
  padding-right: 20px;
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
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}

.small .eyebrow {
  font-size: 15px;
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

.medium .eyebrow {
  font-size: 17px;
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

.large .eyebrow {
  font-size: 20px;
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

.full .eyebrow {
  font-size: 17px;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  color: var(--color-welcome-featured-card-eyebrow-text);
}

.xsmall .title {
  font-size: 14px;
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

.small .title {
  font-size: 17px;
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

.medium .title {
  font-size: 21px;
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

.large .title {
  font-size: 28px;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  color: var(--color-card-content-text);
}

.full .title {
  font-size: 21px;
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

.divider .stat {
  margin-left: 10px;
}

.divider .stat.divider-center {
  border-left: 1px solid var(--color-figure-gray-secondary);
}

.divider .stat:before {
  content: "";
  position: absolute;
  border: 1px solid var(--color-figure-gray-secondary);
  height: 100%;
}

.divider.right .stat.divider-left:before {
  right: -15%;
  width: 15%;
  border-right: none;
}
.divider.left .stat.divider-left:before {
  left: -15%;
  width: 15%;
  border-left: none;
}
.divider.right .stat.divider-right:before {
  width: 25%;
  border-left: none;
}
.divider.left .stat.divider-right:before {
  width: 25%;
  border-right: none;
}
</style>
