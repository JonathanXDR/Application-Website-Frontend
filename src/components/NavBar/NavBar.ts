import LogoIcon from "@/components/Icons/LogoIcon.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  emits: ["my-event"],
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
    };
  },
  created() {
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
    toggleTheme() {
      this.themeDark = !this.themeDark;

      if (this.themeDark) {
        this.storeTheme("dark");
      } else {
        this.storeTheme("light");
      }
      this.$emit("my-event");
    },

    storeTheme(themeName: string): void {
      this.themeDark = themeName === "dark";
      localStorage.setItem("theme", themeName);
      document.documentElement.className = themeName;
    },

    toggleNav(): void {
      this.navOpen = !this.navOpen;

      if ((this.navOpen = true && window.scrollY > 0)) {
        this.navOpen = false;
      }
    },
  },
});
