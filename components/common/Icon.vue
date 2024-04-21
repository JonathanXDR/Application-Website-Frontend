<template>
  <template v-if="!loading">
    <svg :style="styles">
      <use :href="icon" /></svg
  ></template>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    size?: 'small' | 'medium' | 'large'
    loading?: boolean
    colors?: {
      primary?: string
      secondary?: string
      tertiary?: string
    }
  }>(),
  {
    size: 'medium',
    loading: false,
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
</style>
