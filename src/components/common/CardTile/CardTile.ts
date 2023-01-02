import json from "@/assets/lang/de.json";

export default {
  name: "CardTile",
  props: ["card"],
  data() {
    return {
      json: json,
      cardOpen: false,
    };
  },
};
