// All pages are prerendered, so a year computed at render time is baked
// at build time and goes stale after New Year until the next deploy. The
// useState value keeps server and client markup identical during
// hydration, and the onMounted refresh corrects the year client side
// without a hydration mismatch.
export const useCurrentYear = () => {
  const year = useState('current-year', () => new Date().getFullYear())

  onMounted(() => {
    year.value = new Date().getFullYear()
  })

  return year
}
