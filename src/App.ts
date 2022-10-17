import { RouterLink, RouterView } from "vue-router";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner.vue";
import NavBar from "@/components/NavBar/NavBar.vue";
import RibbonBar from "./components/RibbonBar/RibbonBar.vue";
import FooterSection from "@/components/FooterSection/FooterSection.vue";

export default {
  name: "App",
  components: {
    RouterLink,
    RouterView,
    LoadingSpinner,
    NavBar,
    RibbonBar,
    FooterSection,
  },
};
