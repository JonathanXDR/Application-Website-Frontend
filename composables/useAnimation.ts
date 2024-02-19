interface Animation {
  element: HTMLElement
  class: string
  timeout: number
}

export const useAnimation = (): {
  headerAnimations: Ref<Animation[]>
  setHeaderAnimation: (headerAnimation: Animation) => void
} => {
  const headerAnimations = useState<Animation[]>('headerAnimations', () => [])

  const setHeaderAnimation = (headerAnimation: Animation): void => {
    headerAnimations.value.push(headerAnimation)
  }

  return {
    headerAnimations,
    setHeaderAnimation
  }
}
