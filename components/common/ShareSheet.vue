<template>
  <ul class="sharesheet-options">
    <li
      class="social-option"
      v-for="(link, index) in links"
      :key="index"
      v-animation="{ toggle: ['visible'] }"
    >
      <a class="link" :href="link.url" :title="link.title" target="_blank">
        <font-awesome-icon :icon="`fa-${link.category} fa-${link.icon.name}`" />
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import LoadingSpinner from "~/components/common/LoadingSpinner.vue";
import type { FaLinkType } from "~/types/common/FaLink";

export default defineComponent({
  name: "ShareSheet",
  components: {
    LoadingSpinner,
  },
  setup() {
    const { tm } = useI18n();
    const links: Ref<FaLinkType[]> = computed(() =>
      tm("components.common.ShareSheet.links")
    );

    return {
      tm,
      links,
    };
  },
});
</script>

<style scoped>
/* --------------------------- sharesheet-options --------------------------- */

.sharesheet-options {
  display: flex;
  align-items: center;
  visibility: visible;
  margin-top: 10px;
}

/* -------------------- social-option ------------------- */

@keyframes FadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.social-option ~ .social-option {
  margin-left: 19px;
}

.sharesheet-options .social-option {
  opacity: 1;
}

.sharesheet-options .social-option {
  animation: FadeIn 0.2s linear;
  -webkit-animation: FadeIn 0.2s linear;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
}

.sharesheet-options .social-option:nth-child(1) {
  animation-delay: 0.1s;
  -webkit-animation-delay: 0.1s;
}

.sharesheet-options .social-option:nth-child(2) {
  animation-delay: 0.15s;
  -webkit-animation-delay: 0.15s;
}

.sharesheet-options .social-option:nth-child(3) {
  animation-delay: 0.2s;
  -webkit-animation-delay: 0.2s;
}

.sharesheet-options .social-option:nth-child(4) {
  animation-delay: 0.25s;
  -webkit-animation-delay: 0.25s;
}

/* ------------------------------------ a ----------------------------------- */

.sharesheet-options .social-option a {
  color: #666;
}
</style>
