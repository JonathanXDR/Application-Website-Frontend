<template>
  <div
    v-svg="{
      path: `src/assets/icons/${size}/${name}.svg`,
      attrs: $attrs
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const svgDirective = {
  async mounted(el, binding) {
    const { path, attrs } = binding.value
    const response = await fetch(path)
    if (response.ok) {
      const text = await response.text()
      const tempContainer = document.createElement('div')
      tempContainer.innerHTML = text
      const svgElement = tempContainer.firstChild as Element
      for (const [key, value] of Object.entries(attrs)) {
        if (key === 'style' && value && typeof value === 'object') {
          Object.assign(svgElement.style, value)
        } else {
          svgElement.setAttribute(key, value as string)
        }
      }
      el.parentNode.replaceChild(svgElement, el)
    } else {
      console.error(`Failed to load SVG: ${response.statusText}`)
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
      validator: (value: string) => ['big', 'medium', 'small'].includes(value)
    }
  }
})
</script>
