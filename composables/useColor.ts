interface Color {
  name: string;
  var: string;
  hex: string;
}

export const useColor = () => {
  const devColors = useState("devColors", (): Color[] => [
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

  const randomDevColor = useState<Color | undefined>(
    "devColor",
    () => undefined,
  );

  const randomNumber = Math.floor(Math.random() * devColors.value.length);
  randomDevColor.value = devColors.value[randomNumber];

  return {
    randomDevColor,
  };
};
