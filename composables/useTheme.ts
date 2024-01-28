export const useTheme = () => {
  const colorMode = useColorMode();
  const themeCookie = useCookie("theme");

  if (process.server) {
    colorMode.preference = themeCookie.value || "system";
  }

  const setTheme = (theme: string) => {
    colorMode.preference = theme;
    themeCookie.value = theme;
  };

  const getTheme = () => {
    return colorMode.preference;
  };

  return { getTheme, setTheme };
};
