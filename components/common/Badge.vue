<template>
  <span
    :class="['badge', { hover: hover }]"
    :style="`--color-figure: var(--color-figure-${color})`"
  >
    <Icon
      class="icon icon-medium mr-1"
      v-if="icon"
      :name="icon.name"
      :size="icon.size"
      :colors="icon.colors"
    />
    {{ title }}
  </span>
</template>

<script setup lang="ts">
import type { BadgeType } from '~/types/common/Badge'

withDefaults(defineProps<BadgeType>(), {
  color: 'blue',
  hover: false
})
</script>

<style scoped>
.badge {
  display: flex;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  padding-inline: 10px;
  white-space: nowrap;
  background: none;
  border-radius: 18px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--color-figure);
  color: var(--color-figure);
}

.badge.hover:hover {
  background-color: var(--color-figure);
  color: var(--color-fill-white);
  cursor: pointer;
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
