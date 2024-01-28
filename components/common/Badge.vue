<template>
  <span class="badge" :style="`--color-figure: var(--color-figure-${color})`">
    <Icon
      v-if="icon"
      :name="icon.name"
      :size="icon.size"
      :colors="icon.colors"
    />
    {{ title }}
  </span>
</template>

<script lang="ts" setup>
import type { IconType } from "~/types/common/Icon";

withDefaults(
  defineProps<{
    title: string;
    color?: string;
    icon?: IconType;
  }>(),
  {
    color: "blue",
  },
);
</script>

<style scoped>
.badge {
  display: flex;
  align-items: center;
  font-size: 11px;
  line-height: 1.3333733333;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  padding-inline: 10px;
  white-space: nowrap;
  background: none;
  border-radius: 18px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--color-figure);
  color: var(--color-figure);
}

.small .badge {
  font-size: 12px;
  font-weight: 400;
}

.medium .badge {
  font-size: 14px;
  font-weight: 400;
}

.large .badge {
  font-size: 16px;
  font-weight: 400;
}
</style>
