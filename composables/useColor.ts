export const useColor = () => {
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

  const colorBadge = useState<{
    colorName: string
    colorVar: string
    colorHex: string
  } | null>('colorBadge', () => null)

  const randomizeColor = () => {
    if (!colorBadge.value) {
      const randomColor = Math.floor(
        Math.random() * colorBadgeArray.value.length
      )
      colorBadge.value = colorBadgeArray.value[randomColor] || {
        colorName: 'orange',
        colorVar: 'var(--color-figure-orange)',
        colorHex: 'f56300'
      }
    }
    return colorBadge.value
  }

  return {
    colorBadgeArray,
    colorBadge,
    randomizeColor
  }
}
