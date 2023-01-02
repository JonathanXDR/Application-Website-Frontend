import LanguageBar from "@/components/common/LanguageBar/LanguageBar.vue";

export default {
  name: "LanguagesSection",
  components: {
    LanguageBar,
  },
  data() {
    return {
      // json: $i18n.locale === 'en' ? json.en : json.de,
    };
  },
};
