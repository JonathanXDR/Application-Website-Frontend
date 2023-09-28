import LogoIcon from "@/components/common/Icons/LogoIcon.vue";
import useColorStore from "@/stores/colorBadge";
import useAnimationStore from "@/stores/headerAnimations";
import useSectionStore from "@/stores/navbarSections";
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  components: {
    LogoIcon,
  },
  data() {
    return {
      items: [
        { name: "About", route: "#about" },
        { name: "Sprachkenntnisse", route: "#languages" },
        { name: "Referenzen", route: "#references" },
        { name: "Anderes", route: "#other" },
        { name: "Technologien", route: "#technologies" },
        { name: "Projekte", route: "#projects" },
      ],
      themeDark: false,
      navOpen: false,
      navDisabled: false,
    };
  },
  computed: {
    currentSectionIndex(): number | null {
      return useSectionStore().currentSectionIndex;
    },
    colorBadge(): {
      colorName: string;
      colorVar: string;
      colorHex: string;
    } {
      return useColorStore().randomizeColor();
    },
    headerAnimations(): {
      element: HTMLElement;
      class: string;
      timeout: number;
    }[] {
      useAnimationStore().setHeaderAnimation({
        element: this.$refs["ac-ln-background"] as HTMLElement,
        class: "ac-ln-background-transition" as string,
        timeout: 500 as number,
      });

      return useAnimationStore().headerAnimations;
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);

    if (localStorage.getItem("theme") === null) {
      const preferedTheme = window.matchMedia("(prefers-color-scheme: dark)");

      if (preferedTheme.matches) {
        this.storeTheme("dark");
      } else {
        this.storeTheme("light");
      }
    } else {
      if (localStorage.getItem("theme") === "dark") {
        this.storeTheme("dark");
      } else {
        this.storeTheme("light");
      }
    }
  },
  methods: {
    changeTheme() {
      this.themeDark = !this.themeDark;
      if (this.themeDark) {
        this.storeTheme("dark");
      } else {
        this.storeTheme("light");
      }
      this.updateAnimations();
    },

    storeTheme(themeName: string): void {
      this.themeDark = themeName === "dark";
      localStorage.setItem("theme", themeName);
      document.documentElement.className = themeName;
    },

    toggleNav(): void {
      this.navOpen = !this.navOpen;
      this.checkboxTimeout();
    },

    checkboxTimeout(): void {
      this.navDisabled = true;
      setTimeout(() => {
        this.navDisabled = false;
      }, 1000);
    },

    handleScroll(): void {
      if ((this.navOpen = true && window.scrollY > 0)) {
        this.navOpen = false;
      }
    },

    updateAnimations(): void {
      this.headerAnimations.forEach((element) => {
        element.element.classList.remove(element.class);

        setTimeout(() => {
          element.element.classList.add(element.class);
        }, element.timeout);
      });
    },
  },
});
