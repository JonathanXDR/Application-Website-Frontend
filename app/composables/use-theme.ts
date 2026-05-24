export const useTheme = () => {
  const colorMode = useColorMode()
  const themeCookie = useCookie<string>('theme', { default: () => 'auto' })

  // `useState` is shared across components and survives SSR hydration,
  // so the one-time client sync below only runs the first time
  // `useTheme()` mounts.
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
