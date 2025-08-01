<script setup lang="ts">
import type { IconItemType } from '#shared/types/components/icon-item'

const props = withDefaults(defineProps<IconItemType>(), {
  weight: 'medium',
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
  <NuxtIcon
    v-bind="props"
    mode="svg"
    :name="`sf-symbols-${props.weight}:${props.name}`"
    :customize
  />
</template>

<style scoped>
.icon {
  display: inline-block;
}
</style>
