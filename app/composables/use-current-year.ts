/**
 * Current year, corrected on mount. Pages are prerendered, so a year
 * computed at render time stays at the build year until the next deploy.
 * `useState` keeps the server and client markup identical for hydration.
 */
export const useCurrentYear = () => {
  const year = useState('current-year', () => new Date().getFullYear())

  onMounted(() => {
    year.value = new Date().getFullYear()
  })

  return year
}
