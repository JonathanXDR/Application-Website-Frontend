export const useAnimation = () => {
  const animations = useState<
    {
      element: HTMLElement
      class: string
      timeout: number
    }[]
  >('header-animations', () => [])

  const setAnimation = (headerAnimation: {
    element: HTMLElement
    class: string
    timeout: number
  }) => {
    animations.value.push(headerAnimation)
  }

  return {
    animations,
    setAnimation,
  }
}
