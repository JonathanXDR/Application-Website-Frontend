<template>
  <svg :style="styles">
    <use :href="icon" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
      default: undefined
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string): boolean => ['small', 'medium', 'large'].includes(value)
    },
    colors: {
      type: Object,
      required: false,
      default: () => ({
        primary: 'currentColor',
        secondary: 'currentColor',
        tertiary: 'currentColor'
      }),
      validator(value: { primary?: string; secondary?: string; tertiary?: string }): boolean {
        const isValidColor = (color: string | undefined): boolean => {
          return typeof color === 'string' || color === undefined
        }
        return (
          isValidColor(value.primary) &&
          isValidColor(value.secondary) &&
          isValidColor(value.tertiary)
        )
      }
    }
  },
  setup(props) {
    const icon = computed(() => `${getSpriteUrl(props.size)}#${props.name}`)

    const getSpriteUrl = (size) => {
      return new URL(`/src/assets/icons/${size}/symbol/sprite.svg`, import.meta.url).href
    }

    const styles = reactive({
      '--color-primary': props.colors.primary,
      '--color-secondary': props.colors.secondary,
      '--color-tertiary': props.colors.tertiary
    })

    return { icon, styles }
  }
})
</script>

<style>
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
  width: 10em;
  height: 10em;
}

.icon-article {
  width: 1.25em;
  height: 1.25em;
}

#projects .icon-article {
  width: 1.5em !important;
  height: 1.5em !important;
}

.link .link-icon {
  /* height: 0.6em;
  width: 0.6em; */
  height: 0.75em;
  width: 0.75em;
  margin-left: 0.3em;
}

.svg-icon {
  fill: var(--colors-svg-icon-fill-light, var(--color-svg-icon));
  transform: scale(1);
  -webkit-transform: scale(1);
  overflow: visible;
}

.svg-icon.icon-inline {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}
</style>
