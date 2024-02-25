<template>
  <svg :style="styles">
    <use :href="icon" />
  </svg>
</template>

<script setup lang="ts">
import type { SizeType } from '~/types/common/Size'

const props = withDefaults(
  defineProps<{
    name: string
    size?: Omit<SizeType, 'xsmall' & 'xlarge'>
    colors?: {
      primary?: string
      secondary?: string
      tertiary?: string
    }
  }>(),
  {
    size: 'medium',

    colors: () => ({
      primary: 'currentColor',
      secondary: 'currentColor',
      tertiary: 'currentColor'
    })
  }
)

const icon = computed(() => `${getSpriteUrl(props.size)}#${props.name}`)

const getSpriteUrl = (size: 'small' | 'medium' | 'large') => {
  return `/icons/${size}/symbol/sprite.svg`
}

const styles = reactive({
  '--color-primary': props.colors.primary || 'currentColor',
  '--color-secondary': props.colors.secondary || 'currentColor',
  '--color-tertiary': props.colors.tertiary || 'currentColor'
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

.media-icon {
  width: 5em;
  height: 5em;
}

@media screen and (min-width: 1069px) {
  .media-icon {
    width: 10em;
    height: 10em;
  }
}
</style>
