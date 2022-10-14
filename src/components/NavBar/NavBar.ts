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
      navOpen: false,
    };
  },
  methods: {
    storeTheme(themeName: string): void {
      localStorage.setItem('theme', themeName);
      document.documentElement.className = themeName;
    },

    toggleTheme(): void {
      if (localStorage.getItem('theme') === 'dark') {
        this.storeTheme('light');
      } else {
        this.storeTheme('dark');
      }
    },

    themeSettings(): void {
      const themeButton = document.getElementById(
        'theme-checkbox'
      ) as HTMLInputElement;

      if (localStorage.getItem('theme') === 'light') {
        this.storeTheme('light');
        themeButton.checked = false;
      } else {
        this.storeTheme('dark');
        themeButton.checked = true;
      }

      const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)');
      if (preferedTheme.matches) {
        this.storeTheme('dark');
        themeButton.checked = true;
      } else {
        this.storeTheme('light');
        themeButton.checked = false;
      }

      themeButton.addEventListener('change', function () {
        const elementsAndClassNames = [
          {
            element: document.getElementById('ac-ln-background'),
            className: 'ac-ln-background-transition',
          },
          {
            element: document.getElementById('ribbon-content-wrapper'),
            className: 'ribbon-content-wrapper-animation',
          },
          {
            element: document.getElementById('ribbon-content'),
            className: 'ribbon-content-animation',
          },
          {
            element: document.getElementById('ribbon-link'),
            className: 'ribbon-link-animation',
          },
        ] as Array<{ element: HTMLElement; className: string }>;

        elementsAndClassNames.forEach((elementAndClassName) => {
          elementAndClassName.element?.classList.remove(
            elementAndClassName.className
          );
        });

        setTimeout(() => {
          elementsAndClassNames[0].element.classList.add(
            elementsAndClassNames[0].className
          );
        }, 500);

        setTimeout(() => {
          elementsAndClassNames.forEach((elementAndClassName) => {
            elementAndClassName.element?.classList.add(
              elementAndClassName.className
            );
          });
        }, 1);
      });
    },

    toggleNav(): void {
      this.navOpen = !this.navOpen;

      if ((this.navOpen = true && window.scrollY > 0)) {
        this.navOpen = false;
      }
    },
  },
});
