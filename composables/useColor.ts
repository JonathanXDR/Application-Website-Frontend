interface Color {
  colorName: string
  colorVar: string
  colorHex: string
}

export const useColor = (): {
  colorBadgeArray: Ref<Color[]>
  colorBadge: Ref<Color | null>
  randomizeColor: () => Color
} => {
  const colorBadgeArray = useState('colorBadgeArray', () => [
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

  const colorBadge = useState<null | Color>(' colorBadge', () => null)

  const randomizeColor = (): Color => {
    if (colorBadge.value != null) {
      return colorBadge.value
    }

    const randomColor = Math.floor(Math.random() * colorBadgeArray.value.length)
    return (colorBadge.value = colorBadgeArray.value[randomColor])
  }

  return {
    colorBadgeArray,
    colorBadge,
    randomizeColor
  }
}
