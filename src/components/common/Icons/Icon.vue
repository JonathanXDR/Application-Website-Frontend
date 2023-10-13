<template>
  <div v-svg="svgOptions"></div>
</template>

<script lang="ts">
import { defineComponent, type DirectiveBinding } from 'vue'

interface SvgOptions {
  path: string
  attrs: Record<string, unknown>
}

const svgDirective = {
  async mounted(el: HTMLElement, binding: DirectiveBinding<SvgOptions>) {
    const { path, attrs } = binding.value
    try {
      const response = await fetch(path)
      if (!response.ok) {
        throw new Error(`Failed to load SVG: ${response.statusText}`)
      }
      const text = await response.text()
      const tempContainer = document.createElement('div')
      tempContainer.innerHTML = text
      const svgElement = tempContainer.firstChild as SVGElement
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'style' && typeof value === 'object' && value !== null) {
          Object.assign(svgElement.style, value)
        } else {
          svgElement.setAttribute(key, String(value))
        }
      })
      el.parentNode!.replaceChild(svgElement, el)
    } catch (error) {
      console.error((error as Error).message)
    }
  }
}

export default defineComponent({
  inheritAttrs: false,
  directives: {
    svg: svgDirective
  },
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string): boolean => ['big', 'medium', 'small'].includes(value)
    }
  },
  computed: {
    svgOptions(): SvgOptions {
      // const path = new URL(`/src/assets/icons/${this.size}/${this.name}.svg`, import.meta.url)

      return {
        path: `/src/assets/icons/${this.size}/${this.name}.svg`,
        attrs: this.$attrs
      }
    }
  }
})
</script>

<style>
#music .icon-cta {
  width: 1.25em;
  height: 1.25em;
}

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
