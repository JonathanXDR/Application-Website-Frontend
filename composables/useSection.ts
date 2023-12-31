import { reactive } from "vue";

export const useSection = () => {
  const state = reactive({
    currentSectionName: null as string | null,
    currentSectionIndex: null as number | null,
  });

  const setCurrentSection = (sectionName: string, sectionIndex: number) => {
    const modifiedSectionName = sectionName.replace(/^\w/, (c) =>
      c.toUpperCase(),
    );
    state.currentSectionName = modifiedSectionName;
    state.currentSectionIndex = sectionIndex;
  };

  return {
    state,
    setCurrentSection,
  };
};
