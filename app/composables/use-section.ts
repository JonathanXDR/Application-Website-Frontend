export const useSection = () => {
  const currentSection = useState<
    { id: string, name: string, index: number } | undefined
  >('currentSection', () => undefined)

  const route = useRoute()

  const setCurrentSection = (
    sectionId: string,
    sectionName: string,
    sectionIndex: number,
  ) => {
    currentSection.value = {
      id: sectionId,
      name: sectionName.replace(/^\w/, c => c.toUpperCase()),
      index: sectionIndex,
    }
  }

  watch(
    () => route.path,
    () => {
      currentSection.value = undefined
    },
  )

  return {
    currentSection,
    setCurrentSection,
  }
}
