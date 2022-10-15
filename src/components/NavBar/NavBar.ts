import LogoIcon from '@/components/Icons/LogoIcon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavBar',
  components: {
    LogoIcon,
  },
  data() {
    return {
      items: [
        { name: 'About', route: '#about' },
        { name: 'Sprachkenntnisse', route: '#languages' },
        { name: 'Referenzen', route: '#references' },
        { name: 'Anderes', route: '#other' },
        { name: 'Technologien', route: '#technologies' },
        { name: 'Projekte', route: '#projects' },
      ],
      themeDark: false,
      navOpen: false,
    };
  },
  created() {
    if (localStorage.getItem('theme') === null) {
      const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)');

      if (preferedTheme.matches) {
        this.storeTheme('dark');
      } else {
        this.storeTheme('light');
      }
    } else {
      if (localStorage.getItem('theme') === 'dark') {
        this.storeTheme('dark');
      } else {
        this.storeTheme('light');
      }
    }
  },
  methods: {
    toggleTheme() {
      // this.updateAnimations();
      this.themeDark = !this.themeDark;

      if (this.themeDark) {
        this.storeTheme('dark');
      } else {
        this.storeTheme('light');
      }
    },

    storeTheme(themeName: string): void {
      this.themeDark = themeName === 'dark';
      localStorage.setItem('theme', themeName);
      document.documentElement.className = themeName;
    },

    updateAnimations() {
      const animations = [
        {
          ref: 'ac-ln-background',
          className: 'ac-ln-background-transition',
        },
        {
          ref: 'ribbon-content-wrapper',
          className: 'ribbon-content-wrapper-animation',
        },
        {
          ref: 'ribbon-content',
          className: 'ribbon-content-animation',
        },
        {
          ref: 'ribbon-link',
          className: 'ribbon-link-animation',
        },
      ] as Array<{ ref: string; className: string }>;

      animations.forEach((animation) => {
        const element = this.$refs[animation.ref] as HTMLElement;
        // console.log(element);
        element.classList.remove(animation.className);
      });

      setTimeout(() => {
        const element = this.$refs[animations[0].ref] as HTMLElement;
        element.classList.add(animations[0].className);
      }, 500);

      setTimeout(() => {
        animations.forEach((animation) => {
          const element = this.$refs[animation.ref] as HTMLElement;
          element.classList.add(animation.className);
        });
      }, 1);
    },

    toggleNav(): void {
      this.navOpen = !this.navOpen;

      if ((this.navOpen = true && window.scrollY > 0)) {
        this.navOpen = false;
      }
    },
  },
});
