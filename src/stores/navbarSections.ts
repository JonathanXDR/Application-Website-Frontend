import { defineStore } from 'pinia';

export const useSectionStore = defineStore({
  id: 'navbarSections',
  state: () => ({
    currentSection: null as number | null,
  }),
  actions: {
    setCurrentSection(section: number) {
      this.currentSection = section;
    },
  },
});

export default useSectionStore;
