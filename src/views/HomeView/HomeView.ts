import { defineComponent } from 'vue';

import AboutSection from '@/components/containers/AboutSection/AboutSection.vue';
import LanguagesSection from '@/components/containers/LanguagesSection/LanguagesSection.vue';
import ReferencesSection from '@/components/containers/ReferencesSection/ReferencesSection.vue';
import OtherSection from '@/components/containers/OtherSection/OtherSection.vue';
import TechnologiesSection from '@/components/containers/TechnologiesSection/TechnologiesSection.vue';
import ProjectsSection from '@/components/containers/ProjectsSection/ProjectsSection.vue';

import json from '@/assets/data/data.json';

export default defineComponent({
  name: 'HomeView',
  components: {
    AboutSection,
    LanguagesSection,
    ReferencesSection,
    OtherSection,
    TechnologiesSection,
    ProjectsSection,
  },
  data() {
    return {
      data: json.components[1].data,
    };
  },
});
