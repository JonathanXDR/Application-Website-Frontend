<template>
  <svg>
    <use :xlink:href="iconHref" />
  </svg>
</template>

<script lang="ts">
import large from '@/assets/icons/large/symbol/sprite.svg'
import medium from '@/assets/icons/medium/symbol/sprite.svg'
import small from '@/assets/icons/small/symbol/sprite.svg'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgComponent',
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
    const iconHref = computed(() => {
      switch (props.size) {
        case 'small':
          return `${small}#${props.name}`
        case 'medium':
          return `${medium}#${props.name}`
        case 'large':
          return `${large}#${props.name}`
        default:
          return `${medium}#${props.name}`
      }
    })

    return { iconHref }
  }
})
</script>
