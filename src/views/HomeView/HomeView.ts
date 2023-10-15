import AboutSection from '@/components/containers/AboutSection/AboutSection.vue'
import LanguagesSection from '@/components/containers/LanguagesSection/LanguagesSection.vue'
import OtherSection from '@/components/containers/OtherSection/OtherSection.vue'
import ProjectsSection from '@/components/containers/ProjectsSection/ProjectsSection.vue'
import ReferencesSection from '@/components/containers/ReferencesSection/ReferencesSection.vue'
import TechnologiesSection from '@/components/containers/TechnologiesSection/TechnologiesSection.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    AboutSection,
    LanguagesSection,
    ReferencesSection,
    OtherSection,
    TechnologiesSection,
    ProjectsSection
  },
  setup() {
    const sections = ref([
      { id: 'about', class: 'section-separated' },
      { id: 'languages', class: 'section-separated' },
      { id: 'references', class: 'section-separated' },
      { id: 'other', class: 'section-separated' },
      { id: 'technologies' },
      { id: 'projects' }
    ])

    return {
      sections
    }
  }
})
