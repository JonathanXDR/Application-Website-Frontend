<template>
  <h2>{{ props.title }}</h2>

  <TabList />

  <LanguageBarV2
    v-for="(language, index) in languages"
    :key="index"
    :language="language"
  />

  <!-- <div class="graph-gallery-container">
    <ul class="tabnav-items">
      <li v-for="(language, index) in languages" :key="index" class="tabnav-item">
        <span class="tabnav-link current">{{ language.title }}</span>
      </li>
    </ul>

    <ul class="slide-container">
      <LanguageBar v-for="(language, index) in languages" :key="index" :language="language" />
    </ul>
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, type PropType, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageBar from "~/components/common/LanguageBar/LanguageBar.vue";
import LanguageBarV2 from "~/components/common/LanguageBarV2/LanguageBarV2.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner.vue";
import TabList from "~/components/common/TabList/TabList.vue";
import type { LanguageBarType } from "~/types/common/LanguageBar";

export default defineComponent({
  name: "LanguagesSection",
  components: {
    LoadingSpinner,
    TabList,
    LanguageBar,
    LanguageBarV2,
  },
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
      default: undefined,
    },
  },
  setup(props) {
    const { tm } = useI18n();
    const languages: Ref<LanguageBarType[]> = computed(() =>
      tm("components.containers.languages")
    );

    return {
      props,
      tm,
      languages,
    };
  },
});
</script>

<style scoped></style>
