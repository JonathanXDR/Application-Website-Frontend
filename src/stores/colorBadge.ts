import { defineStore } from "pinia";

export const useColorStore = defineStore({
  id: "colorBadge",
  state: () => ({
    colorBadgeArray: [
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
    colorBadge: null as {
      colorName: string;
      colorVar: string;
      colorHex: string;
    } | null,
  }),
  actions: {
    randomizeColor() {
      const randomColor = Math.floor(
        Math.random() * this.colorBadgeArray.length,
      );

      if (this.colorBadge === null) {
        this.colorBadge = this.colorBadgeArray[randomColor];
      }
      return this.colorBadge;
    },
  },
});

export default useColorStore;
