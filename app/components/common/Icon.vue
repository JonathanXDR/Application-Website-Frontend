<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { NuxtIcon } from '#components'

const props = withDefaults(defineProps<IconType>(), {
  weight: 'medium',
  loading: false,
  colors: () => ({
    primary: 'currentColor',
    secondary: 'currentColor',
    tertiary: 'currentColor',
  }),
})

const customize = (content: string) => {
  return content
    .replace(/var\(--color-primary\)/g, props.colors.primary || 'currentColor')
    .replace(
      /var\(--color-secondary\)/g,
      props.colors.secondary || 'currentColor',
    )
    .replace(
      /var\(--color-tertiary\)/g,
      props.colors.tertiary || 'currentColor',
    )
}
</script>

<template>
  <template v-if="!loading && name">
    <NuxtIcon
      v-bind="props"
      mode="svg"
      :name
      :customize
    />
  </template>
</template>

<style>
.icon.icon-xxs {
  width: 0.25em;
  height: 0.25em;
}

.icon.icon-xs {
  width: 0.5em;
  height: 0.5em;
}

.icon.icon-sm {
  width: 0.75em;
  height: 0.75em;
}

.icon.icon-md {
  width: 1em;
  height: 1em;
}

.icon.icon-lg {
  width: 1.25em;
  height: 1.25em;
}

.icon.icon-xl {
  width: 1.5em;
  height: 1.5em;
}

.icon.icon-xxl {
  width: 1.75em;
  height: 1.75em;
}

.icon.icon-3xl {
  width: 2em;
  height: 2em;
}

.icon.icon-4xl {
  width: 2.25em;
  height: 2.25em;
}

.icon.icon-5xl {
  width: 2.5em;
  height: 2.5em;
}

.icon.icon-6xl {
  width: 2.75em;
  height: 2.75em;
}

.icon.icon-7xl {
  width: 3em;
  height: 3em;
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
