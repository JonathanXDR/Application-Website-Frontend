import { defineStore } from 'pinia';

export const useSectionStore = defineStore({
  id: 'section',
  state: () => ({
    currentSection: null as number | null,
  }),
  actions: {
    setCurrentSection(section: number) {
      this.currentSection = section;
      // console.log(section);
    },
  },
});

export default useSectionStore;
