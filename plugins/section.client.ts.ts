import { defineNuxtPlugin } from '#app';
import { useSectionStore } from '@/stores/section';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('section', (el, binding) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            useSectionStore().setCurrentSection(
              el.getAttribute('name'),
              binding.value
            );
          }
        });
      },
      {
        rootMargin: '-52px 0px -94% 0px',
      }
    );
    observer.observe(el);
  });
});
