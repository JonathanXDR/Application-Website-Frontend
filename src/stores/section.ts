import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useSectionStore = defineStore('section', () => {
  const state = reactive({
    currentSectionName: undefined as string | undefined,
    currentSectionIndex: undefined as number | undefined
  })

  const setCurrentSection = (sectionName: string, sectionIndex: number) => {
    const modifiedSectionName = sectionName.replace(/^\w/, (c) => c.toUpperCase())
    state.currentSectionName = modifiedSectionName
    state.currentSectionIndex = sectionIndex
  }

  return {
    state,
    setCurrentSection
  }
})
