export const useTheme = () => {
  const colorMode = useColorMode()
  const themeCookie = useCookie<string>('theme', { default: () => 'auto' })

  // Shared state, so the sync below runs once per app, not once per mount
  const initialized = useState('theme-initialized', () => false)

  const theme = computed(() => themeCookie.value || 'auto')

  const setTheme = (newTheme: string) => {
    colorMode.preference = newTheme === 'auto' ? 'system' : newTheme
    themeCookie.value = newTheme
  }

  if (import.meta.client) {
    onMounted(() => {
      if (initialized.value) return
      setTheme(themeCookie.value)
      initialized.value = true
    })
  }

  return {
    theme,
    setTheme,
    getTheme: () => theme.value,
  }
}
