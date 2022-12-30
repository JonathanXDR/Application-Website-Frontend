import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TimeLine',
  components: {},

  data() {
    return {
      pathD: 'M 4 0 L 4 2500',
      height: 2500,
      viewBox: '0 0 8 2500',
      xmlns: 'http://www.w3.org/2500/svg',

      totalLength: 0,
      updatePath: false,
      lastScrollPos: 0,
      strokeDasharray: 0,
      strokeDashoffset: 0,
    };
  },
  mounted() {
    this.initPath();
    const svg = this.$refs.svg as SVGElement;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('intersecting');
            this.updatePath = true;
          } else {
            this.updatePath = false;
          }
        });
      },
      {
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(svg);
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    initPath() {
      const ul = this.$parent?.$refs.ul as HTMLElement;
      const path = this.$refs.path as SVGPathElement;

      const ulHeight = ul.getBoundingClientRect().height;
      const ulHeightRounded = Math.round(ulHeight);

      this.pathD = `M 4 0 L 4 ${ulHeightRounded}`;
      this.height = ulHeight;
      this.viewBox = `0 0 8 ${ulHeightRounded}`;
      this.xmlns = `http://www.w3.org/${ulHeightRounded}/svg`;

      this.totalLength = path.getTotalLength();
      this.strokeDasharray = this.totalLength;
      this.strokeDashoffset = this.totalLength;
    },

    handleScroll() {
      this.lastScrollPos = window.scrollY;
      this.animateLine();
    },

    animateLine() {
      if (!this.updatePath) {
        return;
      }
      const path = this.$refs.path as SVGPathElement;
      const center = window.innerHeight / 2;
      const boundaries = path.getBoundingClientRect();

      const percentage = (center - boundaries.top) / boundaries.height;
      const drawLength = percentage > 0 ? this.totalLength * percentage : 0;

      this.strokeDashoffset =
        drawLength < this.totalLength ? this.totalLength - drawLength : 0;
    },
  },
});
