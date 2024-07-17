<template>
  <div
    :class="[
      'h-full grid grid-cols-[1fr_auto] auto-rows-[1fr] items-center sm:gap-5 md:gap-8 lg:gap-12',
      { divider },
      componentSize,
    ]"
  >
    <div :class="['bar-content-container bar-chip-1 no-badge']">
      <span v-if="title" class="bar-caption title pb-3">{{ title }}</span>
      <LoadingBar :progress="progress" />
      <div class="pt-3">
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

    <figure :class="['stat', divider.direction]">
      <span v-if="progress" class="stat-values title">{{ progress }}%</span>
      <span v-if="eyebrow" class="stat-label eyebrow">{{ eyebrow }}</span>
    </figure>
  </div>
</template>

<script setup lang="ts">
import type { LanguageBarType } from "~/types/common/LanguageBar";

interface V3 extends LanguageBarType {
  loading?: boolean;
  hover?: "auto" | "true" | "false";
  divider: {
    direction: "left" | "right" | "center";
  };
}

const props = withDefaults(defineProps<V3>(), {
  progress: 0,
  componentSize: "medium",
  loading: false,
  hover: "auto",
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
.stat {
  position: relative;
  z-index: 1;
}
.stat {
  color: var(--color-figure-gray-secondary);
}
.bar-content-container {
  width: 100%;
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
  /* padding-left: 10px; */
  margin-left: 10px;
}

.divider .stat.center {
  border-left: 1px solid var(--color-figure-gray-secondary);
}

.divider .stat:before {
  content: "";
  position: absolute;
  border: 1px solid var(--color-figure-gray-secondary);
  height: 100%;
}

.divider .stat.left:before {
  left: -25%;
  width: 25%;
  border-left: none;
}
.divider .stat.right:before {
  /* left: 0%; */
  width: 25%;
  border-right: none;
}
</style>
