<template>
  <NuxtIcon
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
</script>

<style scoped>
.icon {
  display: inline-block;
}
</style>
