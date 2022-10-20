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
      age: [] as number[],
    };
  },
  mounted() {
    const inViewport = (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        entry.target.classList.toggle('is-inViewport', entry.isIntersecting);
        // if class is added once, keep it
        if (entry.target.classList.contains('is-inViewport')) {
          observer.unobserve(entry.target);
        }
      });
    };

    const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    const observer = new IntersectionObserver(inViewport, obsOptions);

    // Attach observer to every [animation] element:
    const dataInViewport = document.querySelectorAll('[animation]');
    dataInViewport.forEach((el) => {
      observer.observe(el);
    });
  },
});
