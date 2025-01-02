<template>
  <component
    :is="variant"
    :href="url"
    :class="['badge', componentSize, { hover }, { loading }]"
    :style="computedStyle"
    @click="onClick"
  >
    <DynamicIcon
      v-if="icon"
      v-bind="icon"
      :class="`icon icon-md mr-1`"
      :loading="loading"
    />
    <template v-if="!loading">
      {{ title }}
    </template>
    <template v-else>
      <LoadingSkeleton
        width="80px"
        height="15px"
      />
    </template>
  </component>
</template>

<script setup lang="ts">
import type { BadgeItemType } from '#shared/types/common/badge-item'

const props = withDefaults(defineProps<BadgeItemType>(), {
  variant: 'a',
  componentSize: 'medium',
  colors: () => ({
    primary: 'var(--color-fill-gray)',
    secondary: 'var(--color-fill-tertiary)',
    tertiary: 'var(--color-fill-blue)',
  }),
  border: false,
  hover: true,
  loading: false,
  onClick: () => {},
})

const defaultColors = {
  primary: 'var(--color-fill-gray)',
  secondary: 'var(--color-fill-tertiary)',
  tertiary: 'var(--color-fill-blue)',
}

const computedStyle = computed(() => ({
  '--color-figure': props.loading
    ? defaultColors.primary
    : props.colors?.primary,
  '--color-figure-background': props.loading
    ? defaultColors.secondary
    : props.colors?.secondary,
  '--color-figure-background-hover': props.loading
    ? defaultColors.tertiary
    : props.colors?.tertiary,
  '--color-figure-border':
    props.loading || !props.border ? 'transparent' : props.colors?.tertiary,
}))
</script>

<style scoped>
.loading {
  pointer-events: none !important;
}

.badge {
  display: flex;
  align-items: center;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  white-space: nowrap;
  background: var(--color-figure-background);
  border-radius: 25px;
  border-style: solid;
  border-color: var(--color-figure-border);
  color: var(--color-figure);
}

.badge.hover:hover {
  transition:
    background-color 0.2s,
    color 0.2s;
  border-color: var(--color-figure-border);
  background-color: var(--color-figure-background-hover);
  color: white;
  cursor: pointer;
}

.badge.xsmall {
  border-width: 0.5px;
  padding: 2px 10px;
  font-size: 11px;
  font-weight: 400;
}

.badge.small {
  border-width: 1px;
  padding: 3px 11px;
  font-size: 12px;
  font-weight: 400;
}

.badge.medium {
  border-width: 1px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 450;
}

.badge.large {
  border-width: 1.5px;
  padding: 6px 14px;
  font-size: 15px;
  font-weight: 450;
}

.badge.xlarge {
  border-width: 2px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
}
</style>
