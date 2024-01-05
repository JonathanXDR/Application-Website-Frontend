export const useColor = () => {
  const colorBadgeArray = useState("colorBadgeArray", () => [
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
  ]);

  const colorBadge = useState<null | {
    colorName: string;
    colorVar: string;
    colorHex: string;
  }>("colorBadge", () => null);

  const randomizeColor = () => {
    const randomColor = Math.floor(
      Math.random() * colorBadgeArray.value.length
    );
    colorBadge.value = colorBadgeArray.value[randomColor];
    return colorBadge.value;
  };

  return {
    colorBadgeArray,
    colorBadge,
    randomizeColor,
  };
};
