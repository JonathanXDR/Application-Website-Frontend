<template>
  <svg :style="styles">
    <use :href="icon" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, type PropType } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
      default: undefined
    },
    size: {
      type: String as PropType<'small' | 'large' | 'full'>,
      required: false,
      default: 'medium'
    },
    colors: {
      type: Object as PropType<{ primary?: string; secondary?: string; tertiary?: string }>,
      required: false,
      default: () => ({
        primary: 'currentColor',
        secondary: 'currentColor',
        tertiary: 'currentColor'
      })
    }
  },
  setup(props) {
    const icon = computed(() => `${getSpriteUrl(props.size)}#${props.name}`)

    const getSpriteUrl = (size) => {
      return new URL(`/src/assets/icons/${size}/symbol/sprite.svg`, import.meta.url).href
    }

    const styles = reactive({
      '--color-primary': props.colors.primary || 'currentColor',
      '--color-secondary': props.colors.secondary || 'currentColor',
      '--color-tertiary': props.colors.tertiary || 'currentColor'
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
  width: 5em;
  height: 5em;
}

@media screen and (min-width: 1069px) {
  .media-icon {
    width: 10em;
    height: 10em;
  }
}

.icon-dropdown {
  width: 0.5em;
  height: 0.5em;
}

.icon-cta {
  width: 1.25em;
  height: 1.25em;
}

.icon-live-result-summary {
  margin-right: 4px;
  width: 1em;
  height: 1em;
}

.tabnav-paddle-icon {
  width: 0.75em;
  height: 0.75em;
  opacity: 0.8;
  transition: opacity 200ms linear;
}

.tabnav-paddle-left .tabnav-paddle-icon {
  margin-left: -0.5px;
}

.tabnav-paddle-right .tabnav-paddle-icon {
  margin-right: -0.5px;
}

.icon-article {
  width: 1.25em;
  height: 1.25em;
}

#projects .timeline .icon-article {
  width: 1.75em !important;
  height: 1.75em !important;
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
