<template>
  <NuxtIcon
    v-bind="props"
    mode="svg"
    :name="`sf-symbols-${props.weight}:${props.name}`"
    :customize="customize"
  />
</template>

<script setup lang="ts">
import type { IconType } from '#shared/types/common/icon'

const props = withDefaults(defineProps<IconType>(), {
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

<style scoped>
.icon {
  display: inline-block;
}
</style>
