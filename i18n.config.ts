import de from "./lang/de.json";
import en from "./lang/en.json";
import fr from "./lang/fr.json";
import it from "./lang/it.json";

export default {
  lazy: true,
  langDir: "lang",
  strategy: "prefix_and_default",
  defaultLocale: "de",
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    redirectOn: "root",
  },
  locales: [
    {
      code: "de",
      name: "Deutsch",
      file: "de.json",
    },
    {
      code: "en",
      name: "English",
      file: "en.json",
    },
    {
      code: "fr",
      name: "Français",
      file: "fr.json",
    },
    {
      code: "it",
      name: "Italiano",
      file: "it.json",
    },
  ],
  messages: {
    de,
    en,
    fr,
    it,
  },
};
