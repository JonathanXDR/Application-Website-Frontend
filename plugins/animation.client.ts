export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animation", {
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const operations = binding.value;

              if (operations.add) {
                operations.add.forEach((className: string) => {
                  el.classList.add(className);
                });
              }
              if (operations.remove) {
                operations.remove.forEach((className: string) => {
                  el.classList.remove(className);
                });
              }
              if (operations.toggle) {
                operations.toggle.forEach((className: string) => {
                  el.classList.toggle(className);
                });
              }

              if (operations.onViewportChange) {
                operations.onViewportChange(true, el);
              }
            } else {
              if (binding.value.onViewportChange) {
                binding.value.onViewportChange(false, el);
              }
            }
          });
        },
        {
          threshold: 1,
          rootMargin: "-52px 0px 0px 0px",
        }
      );

      observer.observe(el);
    },
  });
});
