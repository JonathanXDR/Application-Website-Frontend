import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useColorStore = defineStore('color', () => {
  const colorBadgeArray = reactive([
    {
      colorName: 'orange',
      colorVar: 'var(--color-figure-orange)',
      colorHex: 'f56300'
    },
    {
      colorName: 'teal',
      colorVar: 'var(--color-figure-teal)',
      colorHex: '00c2bb'
    },
    {
      colorName: 'purple',
      colorVar: 'var(--color-figure-purple)',
      colorHex: 'a95ed2'
    }
  ])

  const colorBadge = ref<
    | {
        colorName: string
        colorVar: string
        colorHex: string
      }
    | undefined
  >(undefined)

  const randomizeColor = () => {
    const randomColor = Math.floor(Math.random() * colorBadgeArray.length)

    if (colorBadge.value === undefined) {
      colorBadge.value = colorBadgeArray[randomColor]
    }
    return colorBadge.value
  }

  return {
    colorBadgeArray,
    colorBadge,
    randomizeColor
  }
})
