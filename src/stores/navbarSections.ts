import { defineStore } from "pinia";

export const useSectionStore = defineStore({
  id: "navbarSections",
  state: () => ({
    currentSectionName: null as string | null,
    currentSectionIndex: null as number | null,
  }),
  actions: {
    setCurrentSection(sectionName: string, sectionIndex: number) {
      const modifiedSectionName = sectionName.replace(/^\w/, (c) =>
        c.toUpperCase()
      );
      this.currentSectionName = modifiedSectionName;
      this.currentSectionIndex = sectionIndex;
    },
  },
});

export default useSectionStore;
