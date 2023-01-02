import { defineStore } from "pinia";

export const useColorStore = defineStore({
  id: "colorBadge",
  state: () => ({
    colorBadge: [
      {
        colorName: "orange",
        colorVar: "var(--color-figure-orange)",
        colorHex: "f56300",
      },
      {
        colorName: "teal",
        colorVar: "var(--color-figure-teal)",
        colorHex: "00c2bb",
      },
      {
        colorName: "purple",
        colorVar: "var(--color-figure-purple)",
        colorHex: "a95ed2",
      },
    ],
  }),
  actions: {
    randomizeColor() {
      const randomColor = Math.floor(Math.random() * this.colorBadge.length);
      return this.colorBadge[randomColor];
    },
  },
});

export default useColorStore;
