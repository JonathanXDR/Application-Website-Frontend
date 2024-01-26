import de from "~/lang/de-DE.json";
import en from "~/lang/en-US.json";
import fr from "~/lang/fr-FR.json";
import it from "~/lang/it-IT.json";

/** @type {import('i18n').Config} */
export default {
  legacy: false,
  locales: [
    {
      code: "de",
      name: "Deutsch",
    },
    {
      code: "en",
      name: "English",
    },
    {
      code: "fr",
      name: "Français",
    },
    {
      code: "it",
      name: "Italiano",
    },
  ],
  defaultLocale: "de",
  fallbackLocale: "en",
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    redirectOn: "root",
  },
  messages: {
    en,
    de,
    fr,
    it,
  },
};
