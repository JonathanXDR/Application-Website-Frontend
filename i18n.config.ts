import de from "./lang/de.json";
import en from "./lang/en.json";
import fr from "./lang/fr.json";
import it from "./lang/it.json";

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: "de",
  fallBackLocale: "de",
  messages: {
    de,
    en,
    fr,
    it,
  },
}));
