import AboutSection from '@/components/containers/AboutSection/AboutSection.vue'
import LanguagesSection from '@/components/containers/LanguagesSection/LanguagesSection.vue'
import OtherSection from '@/components/containers/OtherSection/OtherSection.vue'
import ProjectsSection from '@/components/containers/ProjectsSection/ProjectsSection.vue'
import ReferencesSection from '@/components/containers/ReferencesSection/ReferencesSection.vue'
import TechnologiesSection from '@/components/containers/TechnologiesSection/TechnologiesSection.vue'
import type { SectionType } from '@/types/common/Section'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

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
    const { tm } = useI18n()
    const sections = computed(() => tm('components.common.NavBar') as SectionType[])

    return {
      sections
    }
  }
})
