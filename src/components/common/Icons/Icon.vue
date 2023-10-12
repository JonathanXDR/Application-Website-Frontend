<template>
  <div v-svg="svgOptions"></div>
</template>

<script lang="ts">
import { defineComponent, DirectiveBinding } from 'vue'

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
      return {
        path: `src/assets/icons/${this.size}/${this.name}.svg`,
        attrs: this.$attrs
      }
    }
  }
})
</script>

<style>
.icon-article {
  width: 1.25em;
  height: 1.25em;
}
</style>
