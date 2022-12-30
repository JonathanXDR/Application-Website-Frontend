import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TimeLine',
  data() {
    return {
      pathD: undefined as string | undefined,
      ulHeight: undefined as number | undefined,
      viewBox: undefined as string | undefined,
      xmlns: undefined as string | undefined,

      strokeDasharray: 0,
      strokeDashoffset: 0,
    };
  },
  mounted() {
    this.initPath();

    const svg = this.$refs.svg as SVGElement;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', this.animateLine);
          window.addEventListener('resize', this.initPath);
        } else {
          window.removeEventListener('scroll', this.animateLine);
          window.removeEventListener('resize', this.initPath);
        }
      });
    });

    observer.observe(svg);
  },
  methods: {
    initPath() {
      const ul = this.$parent?.$refs.ul as HTMLElement;

      const ulHeight = ul.getBoundingClientRect().height;
      const ulHeightRounded = Math.round(ulHeight);

      this.pathD = `M 4 0 L 4 ${ulHeightRounded}`;
      this.ulHeight = ulHeight;
      this.viewBox = `0 0 8 ${ulHeightRounded}`;
      this.xmlns = `http://www.w3.org/${ulHeightRounded}/svg`;

      this.strokeDasharray = this.ulHeight;
      this.strokeDashoffset = this.ulHeight;
    },

    animateLine() {
      const ulHeight = this.ulHeight || 0;
      const path = this.$refs.path as SVGPathElement;
      const center = window.innerHeight / 2;
      const boundaries = path.getBoundingClientRect();

      const percentage = (center - boundaries.top) / boundaries.height;
      const drawLength = percentage > 0 ? ulHeight * percentage : 0;

      this.strokeDashoffset = drawLength < ulHeight ? ulHeight - drawLength : 0;
    },
  },
});
