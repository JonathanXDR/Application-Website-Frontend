export const useSection = () => {
  const currentSection = useState('currentSection', () => ({
    id: null as string | null,
    name: null as string | null,
    index: null as number | null,
  }))

  const setCurrentSection = (
    sectionId: string,
    sectionName: string,
    sectionIndex: number,
  ) => {
    currentSection.value.id = sectionId
    currentSection.value.name = sectionName.replace(/^\w/, c => c.toUpperCase())
    currentSection.value.index = sectionIndex
  }

  return {
    currentSection,
    setCurrentSection,
  }
}
