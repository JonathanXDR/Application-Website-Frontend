import de_DE from "./lang/de-DE.json";
import en_US from "./lang/en-US.json";
import fr_FR from "./lang/fr-FR.json";
import it_IT from "./lang/it-IT.json";

export default {
  legacy: false,
  lazy: true,
  globalInjection: true,
  langDir: "lang/",
  defaultLocale: "de",
  fallbackLocale: "en",
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    redirectOn: "root",
  },
  locales: [
    {
      code: "de",
      iso: "de-DE",
      name: "Deutsch",
      file: "de-DE.json",
    },
    {
      code: "en",
      iso: "en-US",
      name: "English",
      file: "en-US.json",
    },
    {
      code: "fr",
      iso: "fr-FR",
      name: "Français",
      file: "fr-FR.json",
    },
    {
      code: "it",
      iso: "it-IT",
      name: "Italiano",
      file: "it-IT.json",
    },
  ],
  messages: {
    de_DE,
    en_US,
    fr_FR,
    it_IT,
  },
};
