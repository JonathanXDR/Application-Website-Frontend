export const useSection = (): {
  currentSection: any
  setCurrentSection: (sectionName: string, sectionIndex: number) => void
} => {
  const currentSection = useState('currentSection', () => ({
    name: null as string | null,
    index: null as number | null
  }))

  const setCurrentSection = (
    sectionName: string,
    sectionIndex: number
  ): void => {
    const modifiedSectionName = sectionName.replace(/^\w/, c => c.toUpperCase())
    currentSection.value.name = modifiedSectionName
    currentSection.value.index = sectionIndex
  }

  return {
    currentSection,
    setCurrentSection
  }
}
