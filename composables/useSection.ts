export const useSection = () => {
  const currentSection = useState("currentSection", () => ({
    name: null as string | null,
    index: null as number | null,
  }));

  const setCurrentSection = (sectionName: string, sectionIndex: number) => {
    const modifiedSectionName = sectionName.replace(/^\w/, (c) =>
      c.toUpperCase()
    );
    currentSection.value.name = modifiedSectionName;
    currentSection.value.index = sectionIndex;
  };

  return {
    currentSection,
    setCurrentSection,
  };
};
