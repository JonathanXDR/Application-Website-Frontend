<template>
  <div v-html="icon"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'SvgComponent',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string): boolean => ['small', 'medium', 'large'].includes(value)
    }
  },
  setup(props) {
    const icon = ref('')

    // const getImageUrl = (size: string, name: string): string => {
    //   return new URL(`@/assets/icons/${size}/${name}.svg`, import.meta.url).href
    // }

    const importIcon = async (name: string, size: string) => {
      return import(`/src/assets/icons/${size}/${name}.svg`)
    }

    const fetchIcon = async () => {
      const module = await importIcon(props.name, props.size)
      const url = module.default
      const response = await fetch(url)
      if (response.ok) {
        const text = await response.text()
        icon.value = text
      } else {
        console.error('Failed to fetch icon:', response.status, response.statusText)
      }
    }

    onMounted(fetchIcon)

    return { icon }
  }
})
</script>

<style>
#references .icon-article {
  width: 1.25em;
  height: 1.25em;
}

#projects .icon-article {
  width: 1.5em;
  height: 1.5em;
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
