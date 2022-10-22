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
      currentSection: 0,
    };
  },
  mounted() {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
          if (entry.isIntersecting) {
            animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1,
        rootMargin: '-52px 0px 0px 0px',
      }
    );

    const animationElements = document.querySelectorAll('[animation]');
    animationElements.forEach((el) => {
      animationObserver.observe(el);
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.currentSection = parseInt(
              entry.target.getAttribute('number') as string
            );
          }
        });
      },
      {
        rootMargin: '-52px 0px -90% 0px',
      }
    );

    const sections = document.querySelectorAll('[number]');
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  },
});
