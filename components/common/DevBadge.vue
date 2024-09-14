<template>
  <small
    :style="{ color: color.primary }"
    class="dev-badge"
    data-tag-name="Dev"
  />
</template>

<script setup lang="ts">
import type { ColorType } from "~/types/common/Color";

withDefaults(
  defineProps<{
    color: ColorType;
  }>(),
  {
    color: () => ({
      primary: "var(--color-figure-orange)",
    }),
  },
);
</script>

<style scoped>
.dev-badge {
  font-size: 18px;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  padding-left: 10px;
  -webkit-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  -o-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  -moz-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
}
.dev-badge:before {
  content: attr(data-tag-name);
}
</style>
