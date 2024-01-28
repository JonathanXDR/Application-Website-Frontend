import { useColorMode, useCookie } from "#imports";

export const useTheme = () => {
  const colorMode = useColorMode();
  const themeCookie = useCookie("theme");

  const setTheme = (theme: string) => {
    if (theme === "auto") {
      colorMode.preference = "system";
    } else {
      colorMode.preference = theme;
    }
    themeCookie.value = theme;
  };

  const getTheme = () => themeCookie.value || "auto";

  const initializeTheme = () => setTheme(getTheme());

  if (process.client) {
    initializeTheme();
  }

  return { getTheme, setTheme };
};
