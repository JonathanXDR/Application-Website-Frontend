import json from "@/assets/lang/de.json";

export default {
  name: "LanguageBar",
  props: ["language"],
  data() {
    return {
      json: json.components.containers.languages,
    };
  },
};
