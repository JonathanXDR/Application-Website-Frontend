/**
 * Pages are prerendered, so a year computed at render time would stay at
 * the build year. `useState` keeps the prerendered and client markup
 * identical, so the correction on mount cannot break hydration.
 */
export const useCurrentYear = () => {
  const year = useState('current-year', () => new Date().getFullYear())

  onMounted(() => {
    year.value = new Date().getFullYear()
  })

  return year
}
