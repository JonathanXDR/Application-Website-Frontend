import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  type Ref,
} from "vue";

export default defineComponent({
  name: "TimeLine",
  setup() {
    const pathD: Ref<string | undefined> = ref(undefined);
    const ulHeight: Ref<number | undefined> = ref(undefined);
    const viewBox: Ref<string | undefined> = ref(undefined);
    const xmlns: Ref<string | undefined> = ref(undefined);

    const strokeDasharray: Ref<number | undefined> = ref(undefined);
    const strokeDashoffset: Ref<number | undefined> = ref(undefined);

    const svg: Ref<SVGElement | undefined> = ref(undefined);
    const path: Ref<SVGPathElement | undefined> = ref(undefined);

    const initPath = () => {
      const instance = getCurrentInstance();
      const ul = instance?.parent?.refs.ul as HTMLElement;

      const ulHeightValue = ul.getBoundingClientRect().height;
      const ulHeightRounded = Math.round(ulHeightValue);

      pathD.value = `M 4 0 L 4 ${ulHeightRounded}`;
      ulHeight.value = ulHeightValue;
      viewBox.value = `0 0 8 ${ulHeightRounded}`;
      xmlns.value = `http://www.w3.org/${ulHeightRounded}/svg`;

      strokeDasharray.value = ulHeightValue;
      strokeDashoffset.value = ulHeightValue;
    };

    const animateLine = () => {
      const ulHeightValue = ulHeight.value || 0;
      const center = window.innerHeight / 2;
      const boundaries = path.value?.getBoundingClientRect();

      const percentage =
        (center - (boundaries?.top || 0)) / (boundaries?.height || 1);
      const drawLength = percentage > 0 ? ulHeightValue * percentage : 0;

      strokeDashoffset.value =
        drawLength < ulHeightValue ? ulHeightValue - drawLength : 0;
    };

    onMounted(() => {
      initPath();

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", animateLine);
            window.addEventListener("resize", initPath);
          } else {
            window.removeEventListener("scroll", animateLine);
            window.removeEventListener("resize", initPath);
          }
        });
      });

      observer.observe(svg.value as SVGElement);
    });

    return {
      pathD,
      ulHeight,
      viewBox,
      xmlns,
      strokeDasharray,
      strokeDashoffset,
      svg,
      path,
    };
  },
});
