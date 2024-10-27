interface Color {
  name: string;
  var: string;
  hex: string;
}

export const useColor = () => {
  const developmentColors = useState<Color[]>("devColors", () => [
    {
      name: "orange",
      var: "var(--color-figure-orange)",
      hex: "f56300",
    },
    {
      name: "teal",
      var: "var(--color-figure-teal)",
      hex: "00c2bb",
    },
    {
      name: "purple",
      var: "var(--color-figure-purple)",
      hex: "a95ed2",
    },
  ]);

  const randomDevelopmentColor = useState<Color | undefined>(
    "randomDevColor",
    () => {
      const randomNumber = Math.floor(
        Math.random() * developmentColors.value.length,
      )
      return developmentColors.value[randomNumber];
    }
  )

  return {
    randomDevColor: randomDevelopmentColor,
  };
}
