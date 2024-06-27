import { useSection } from "~/composables/useSection";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("section", (el, binding) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            useSection().setCurrentSection(
              el.getAttribute("id"),
              el.getAttribute("name"),
              binding.value,
            );
          }
        });
      },
      {
        rootMargin: `-${window.innerWidth < 1250 ? 48 : 52}px 0px -95% 0px`,
      },
    );
    observer.observe(el);
  });
});
