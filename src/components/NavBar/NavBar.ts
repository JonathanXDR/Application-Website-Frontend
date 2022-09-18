import LogoIcon from '@/components/Icons/LogoIcon.vue';

export default {
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

    // currentItem() {
    //   const items = document.getElementsByClassName('ac-ln-menu-link');
    //   for (let i = 0; i < 6; i++) {
    //     items[i].addEventListener('click', function () {
    //       // closeNav();
    //       const current = document.getElementsByClassName('current');
    //       if (current.length > 0) {
    //         current[0].className = current[0].className.replace(' current', '');
    //       }
    //       this.className += ' current';
    //     });
    //   }
    // },

    openNav() {
      const menuState = this.$refs.menustate as HTMLInputElement;
      const nav = this.$refs.localnav as HTMLDivElement;
      if (menuState.checked) {
        nav.classList.add('nav-open');
      }
      menuState.addEventListener('change', function () {
        if (this.checked) {
          nav.classList.add('nav-open');
        } else {
          nav.classList.remove('nav-open');
        }
      });
    },

    closeNav() {
      const menuState = this.$refs.menustate as HTMLInputElement;
      const nav = this.$refs.localnav as HTMLDivElement;
      window.addEventListener('scroll', function () {
        if (nav.classList.contains('nav-open') && window.scrollY > 0) {
          nav.classList.remove('nav-open');
          menuState.checked = false;
        }
      });
    },

    // isIntoView(elem) {
    //   const documentViewTop = $(window).scrollTop();
    //   const documentViewBottom = documentViewTop + $(window).height();

    //   const elementTop = $(elem).offset().top;
    //   const elementBottom = elementTop + $(elem).height();

    //   return (
    //     elementBottom <= documentViewBottom && elementTop >= documentViewTop
    //   );
    // },

    // let lastItertionInView = true;

    // $(window).scroll(function () {
    //   const scrollTop = $(window).scrollTop();
    //   const sections = $('section');
    //   const navbarLinks = $('nav ul li a');
    //   let currentId = '';
    //   sections.each(function () {
    //     const section = $(this);
    //     const sectionId = section.attr('id');
    //     const sectionTop = section.offset().top - 52;
    //     const sectionBottom = sectionTop + section.height();
    //     if (scrollTop >= sectionTop && scrollTop <= sectionBottom) {
    //       currentId = sectionId;
    //     }
    //   });

    //   navbarLinks.each(function () {
    //     const link = $(this);
    //     const linkId = link.attr('href').split('#')[1];
    //     if (currentId === linkId) {
    //       link.addClass('current');
    //     } else {
    //       link.removeClass('current');
    //       lastItertionInView = false;
    //     }
    //   });
    // });
  },
};
