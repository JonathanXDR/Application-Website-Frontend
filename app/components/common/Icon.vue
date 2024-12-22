<template>
  <template v-if="!loading">
    <component
      :is="component"
      v-bind:="properties"
    />
  </template>
</template>

<script setup lang="ts">
import { NuxtIcon, SFSymbol } from '#components'
import type { IconType } from '#shared/types/common/icon'

const properties = withDefaults(defineProps<IconType>(), {
  size: '24px',
  weight: 'medium',
  loading: false,
  colors: () => ({
    primary: 'currentColor',
    secondary: 'currentColor',
    tertiary: 'currentColor',
  }),
})

const sfSymbolRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*$/

const component = computed(() => {
  return sfSymbolRegex.test(properties.name) ? SFSymbol : NuxtIcon
})
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
