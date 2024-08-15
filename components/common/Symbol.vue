<template>
  <template v-if="!loading">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      :style="styles"
    >
      <use :xlink:href="icon" />
    </svg>
  </template>
</template>

<script setup lang="ts">
import type { BasicSizeType } from "~/types/common/BasicSize";
import type { IconType } from "~/types/common/Icon";

const props = withDefaults(defineProps<IconType>(), {
  componentSize: "medium",
  loading: false,
  colors: () => ({
    primary: "currentColor",
    secondary: "currentColor",
    tertiary: "currentColor",
  }),
});

const icon = computed(
  () => `${getSpriteUrl(props.componentSize)}#${props.name}`,
);

const getSpriteUrl = (size: BasicSizeType) => {
  return `/icons/${size}.svg`;
};

const styles = reactive({
  "--color-primary": props.colors.primary || "currentColor",
  "--color-secondary": props.colors.secondary || "currentColor",
  "--color-tertiary": props.colors.tertiary || "currentColor",
});
</script>

<style>
.icon.icon-xsmall {
  width: 0.5em;
  height: 0.5em;
}

.icon.icon-small {
  width: 0.75em;
  height: 0.75em;
}

.icon.icon-medium {
  width: 1em;
  height: 1em;
}

.icon.icon-large {
  width: 1.25em;
  height: 1.25em;
}

.icon.icon-xlarge {
  width: 1.5em;
  height: 1.5em;
}

.icon.icon-xxlarge {
  width: 1.75em;
  height: 1.75em;
}

.apple-logo {
  width: 100%;
  height: 330px;
}

.apple-logo path {
  fill: none;
  stroke: var(--color-fill-gray);
  stroke-width: 0.2;
}
</style>
