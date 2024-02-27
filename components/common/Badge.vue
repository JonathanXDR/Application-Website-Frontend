<template>
  <span
    :class="['badge', size, { hover: hover }]"
    :style="{
      '--color-figure': colors?.primary,
      '--color-figure-background': colors?.secondary,
      '--color-figure-background-hover': colors?.tertiary,
      '--color-figure-border': border ? colors?.tertiary : 'transparent'
    }"
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
  size: 'small',
  colors: () => ({
    primary: 'var(--color-fill-gray)',
    secondary: 'var(--color-fill-tertiary)',
    tertiary: 'var(--color-figure-blue)'
  }),
  border: false,
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
  white-space: nowrap;
  background: var(--color-figure-background);
  border-radius: 18px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--color-figure-border);
  color: var(--color-figure);
}

.badge.hover:hover {
  transition: background-color 0.2s, color 0.2s;
  border-color: var(--color-figure-border);
  background-color: var(--color-figure-background-hover);
  color: white;
  cursor: pointer;
}

.badge.small {
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 400;
}

.badge.medium {
  padding: 4px 10px;
  font-size: 14px;
  font-weight: 400;
}

.badge.large {
  padding: 6px 14px;
  font-size: 16px;
  font-weight: 400;
}

.tag {
  display: inline-block;
  padding-right: 10px;
}
.tag a {
  color: var(--color-figure-gray);
  background-color: var(--color-fill-tertiary);
  font-size: 14px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  border-radius: 14px;
  padding: 4px 10px;
  white-space: nowrap;
  border: 1px solid transparent;
}
@media (hover: hover) {
  .tag a:hover {
    transition: background-color 0.2s, color 0.2s;
    background-color: var(--color-fill-blue);
    color: #fff;
  }
}
</style>
