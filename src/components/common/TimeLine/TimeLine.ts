import { defineComponent, ref } from 'vue';
import json from '@/assets/data/data.json';

/**
 * A Vue component that animates a vertical line on an SVG element as the user scrolls down the page.
 */
export default defineComponent({
  name: 'TimeLine',
  components: {},

  /**
   * The component's data.
   *
   * @returns {object} An object containing the component's data properties.
   */
  data() {
    return {
      totalLength: 0,
      updatePath: false,
      lastScrollPos: 0,
    };
  },
  mounted() {
    // Initialize the path and set up the intersection observer and scroll event listener.
    this.initPath();
    const path = this.$refs.path as SVGPathElement;
    const observer = new IntersectionObserver(this.handleEntries, {
      rootMargin: '0px 0px 0px 0px',
    });
    observer.observe(path);
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    /**
     * Initializes the path element.
     */
    initPath() {
      const path = this.$refs.path as SVGPathElement;

      this.totalLength = path.getTotalLength();
      path.style.strokeDasharray = `${this.totalLength}`;
      path.style.strokeDashoffset = `${this.totalLength}`;
    },
    /**
     * Handles intersection observer entries.
     *
     * @param {IntersectionObserverEntry[]} entries - The intersection observer entries.
     */
    handleEntries(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.updatePath = true;
        } else {
          this.updatePath = false;
        }
      });
    },
    /**
     * Handles the scroll event.
     */
    handleScroll() {
      this.lastScrollPos = window.scrollY;
      this.animateLine();
    },
    /**
     * Animates the line on the path element.
     */
    animateLine() {
      if (!this.updatePath) {
        return;
      }
      const path = this.$refs.path as SVGPathElement;
      const center = window.innerHeight / 2;
      const boundaries = path.getBoundingClientRect();
      const top = boundaries.top;
      const height = boundaries.height;
      const percentage = (center - top) / height;
      const drawLength = percentage > 0 ? this.totalLength * percentage : 0;

      path.style.strokeDashoffset = `${
        drawLength < this.totalLength ? this.totalLength - drawLength : 0
      }`;
    },
  },
});
