// No route watcher in here. The composable is also called from the
// v-section IntersectionObserver callback outside any component scope,
// where a watcher would never be disposed and would pile up one route
// watcher per intersection. The route-change reset lives in
// app/layouts/default.vue, which is instantiated exactly once.
export const useSection = () => {
  const currentSection = useState<
    { id: string, name?: string, index: number } | undefined
  >('current-section', () => undefined)

  const setCurrentSection = (
    sectionId: string,
    sectionName: string,
    sectionIndex: number,
  ) => {
    currentSection.value = {
      id: sectionId,
      name: sectionName
        ? sectionName.replace(/^\w/, c => c.toUpperCase())
        : undefined,
      index: sectionIndex,
    }
  }

  return {
    currentSection,
    setCurrentSection,
  }
}
