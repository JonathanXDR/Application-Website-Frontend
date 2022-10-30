import { RouterLink, RouterView } from 'vue-router';

import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue';
import NavBar from '@/components/common/NavBar/NavBar.vue';
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue';
import FooterItem from '@/components/common/FooterItem/FooterItem.vue';

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    LoadingSpinner,
    NavBar,
    RibbonBar,
    FooterItem,
  },
};
