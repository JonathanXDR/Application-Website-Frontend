export const useTheme = () => {
  const colorMode = useColorMode()
  const themeCookie = useCookie('theme')

  const setTheme = (theme: string) => {
    colorMode.preference = theme === 'auto' ? 'system' : theme
    themeCookie.value = theme
  }

  const getTheme = () => colorMode.value || themeCookie.value || 'auto'

  const initializeTheme = () => {
    const theme = getTheme()
    return setTheme(theme)
  }

  onMounted(() => {
    initializeTheme()
  })

  return { getTheme, setTheme }
}
