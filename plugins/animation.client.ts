export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animation", {
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const operations = binding.value;
              if (operations.add) {
                for (const className of operations.add) {
                  entry.target.classList.add(className);
                }
              }
              if (operations.remove) {
                for (const className of operations.remove) {
                  entry.target.classList.remove(className);
                }
              }
              if (operations.toggle) {
                for (const className of operations.toggle) {
                  entry.target.classList.toggle(className);
                }
              }
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 1,
          rootMargin: "-52px 0px 0px 0px",
        },
      );

      observer.observe(el);
    },
  });
});
