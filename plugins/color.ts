interface Color {
  name: string;
  var: string;
  hex: string;
}

export default defineNuxtPlugin(() => {
  const devColors: Color[] = [
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
  ];

  const randomDevColor =
    devColors[Math.floor(Math.random() * devColors.length)];

  return {
    provide: {
      randomDevColor,
    },
  };
});
