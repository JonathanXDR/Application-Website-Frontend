export const useTheme = () => {
  const colorMode = useColorMode();
  const themeCookie = useCookie("theme");

  const setTheme = (theme: string) => {
    colorMode.preference = theme === "auto" ? "system" : theme;
    themeCookie.value = theme;
  }

  const getTheme = () => themeCookie.value || "auto";

  const initializeTheme = () => setTheme(getTheme());

  if (import.meta.client) {
    initializeTheme();
  }

  return { getTheme, setTheme };
}
