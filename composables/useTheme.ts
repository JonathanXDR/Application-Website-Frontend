export const useTheme = () => {
  const colorMode = useColorMode();
  const themeCookie = useCookie("theme");

  if (process.server) {
    colorMode.preference = themeCookie.value || "system";
  }

  const setTheme = (theme: string) => {
    colorMode.preference = theme;
    themeCookie.value = theme;

    if (theme === "auto") {
      document.documentElement.className =
        colorMode.value === "dark" ? "dark-mode" : "light-mode";
    }
  };

  const getTheme = () => {
    return colorMode.preference;
  };

  return { getTheme, setTheme };
};
