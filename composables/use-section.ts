export const useSection = () => {
  const currentSection = useState('currentSection', () => ({
    id: undefined as string | undefined,
    name: undefined as string | undefined,
    index: undefined as number | undefined,
  }))

  const setCurrentSection = (
    sectionId: string,
    sectionName: string,
    sectionIndex: number
  ) => {
    currentSection.value.id = sectionId
    currentSection.value.name = sectionName.replace(/^\w/, c =>
      c.toUpperCase()
    )
    currentSection.value.index = sectionIndex
  }

  return {
    currentSection,
    setCurrentSection,
  }
}
