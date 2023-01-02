import { RouterLink, RouterView } from "vue-router";
import { useMeta } from "vue-meta";
import useSectionStore from "@/stores/navbarSections";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner.vue";
import NavBar from "@/components/common/NavBar/NavBar.vue";
import RibbonBar from "@/components/common/RibbonBar/RibbonBar.vue";
import FooterItem from "@/components/common/FooterItem/FooterItem.vue";

export default {
  name: "App",
  components: {
    RouterLink,
    RouterView,
    LoadingSpinner,
    NavBar,
    RibbonBar,
    FooterItem,
  },
  data() {
    return {};
  },
  computed: {
    currentSectionName(): string | null {
      return useSectionStore().currentSectionName;
    },
  },
  // created() {
  //   const { setMeta } = useMeta();
  //   setMeta({
  //     title: 'Alexander Czichos',
  //     meta: [
  //       {
  //         name: 'description',
  //         content:
  //       }
  //     ]
  //   });
  // },
};
