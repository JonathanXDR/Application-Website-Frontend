export const useTheme = () => {
  const colorMode = useColorMode();
  const themeCookie = useCookie("theme");

  const setTheme = (theme: string) => {
    if (theme === "auto") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.className = `${systemTheme}-mode`;
      colorMode.preference = systemTheme;
    } else {
      document.documentElement.className = `${theme}-mode`;
      colorMode.preference = theme;
    }
    themeCookie.value = theme;
  };

  const getTheme = () => {
    return themeCookie.value || "auto";
  };

  const initializeTheme = () => {
    const savedTheme = themeCookie.value || "auto";
    setTheme(savedTheme);
  };

  if (process.client) {
    initializeTheme();
  }

  return { getTheme, setTheme };
};
