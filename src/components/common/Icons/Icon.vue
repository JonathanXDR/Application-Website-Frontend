<template>
  <svg v-if="viewBox" :viewBox="viewBox">
    <use :href="icon" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: { type: String, required: true },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string): boolean => ['small', 'medium', 'large'].includes(value)
    }
  },
  setup(props) {
    const viewBox = ref('')

    const getSpriteUrl = (size) => {
      return new URL(`/src/assets/icons/${size}/symbol/sprite.svg`, import.meta.url).href
    }

    const icon = computed(() => `${getSpriteUrl(props.size)}#${props.name}`)

    const loadViewBox = async () => {
      const response = await fetch(getSpriteUrl(props.size))
      const text = await response.text()
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(text, 'image/svg+xml')
      const symbol = svgDoc.getElementById(props.name)
      if (symbol) {
        viewBox.value = symbol.getAttribute('viewBox') || ''
      }
    }

    onMounted(loadViewBox)

    return { icon, viewBox }
  }
})
</script>

<style>
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
