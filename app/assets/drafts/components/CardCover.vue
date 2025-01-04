<!--
  This source file is part of the Swift.org open source project

  Copyright (c) 2022 Apple Inc. and the Swift project authors
  Licensed under Apache License v2.0 with Runtime Library Exception

  See https://swift.org/LICENSE.txt for license information
  See https://swift.org/CONTRIBUTORS.txt for Swift project authors
-->

<template>
  <div
    class="card-cover-wrap"
    :class="{ rounded }"
  >
    <slot classes="card-cover">
      <img
        :variants="variants"
        :alt="alt"
        class="card-cover"
      >
      <!-- <img
      v-else
      v-bind="defaultAttributes"
      ref="img"
      decoding="async"
      :data-orientation="orientation"
      :loading="loading"
      :alt="alt"
      :width="defaultAttributes.width || optimalWidth"
      :height="(defaultAttributes.width || optimalWidth) ? 'auto' : null"
      @error="handleImageLoadError"
    > -->
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CardCover',
  props: {
    variants: {
      type: Array,
      required: true,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    alt: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped lang="scss">
@import "/app/assets/scss/_core.scss";

.card-cover-wrap {
  &.rounded {
    border-radius: $big-border-radius;
    overflow: hidden;
  }
}

.card-cover {
  background-color: var(--color-card-background);
  display: block;
  // default height for a card, if no size is specified
  height: var(--card-cover-height, 180px);

  &.fallback,
  :deep(img) {
    width: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    margin: 0;
  }

  // make sure we dont override the height for the fallback
  :deep(img) {
    height: 100%;
  }
}
</style>
