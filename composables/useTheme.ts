export const useTheme = (): {
  getTheme: () => string
  setTheme: (theme: string) => void
} => {
  const colorMode = useColorMode()
  const themeCookie = useCookie('theme')

  const setTheme = (theme: string): void => {
    if (theme === 'auto') {
      colorMode.preference = 'system'
    } else {
      colorMode.preference = theme
    }
    themeCookie.value = theme
  }

  const getTheme = (): string => themeCookie.value ?? 'auto'

  const initializeTheme = (): void => {
    setTheme(getTheme())
  }

  if (process.client !== null && process.client !== undefined) {
    initializeTheme()
  }

  return { getTheme, setTheme }
}
