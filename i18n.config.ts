import de_DE from "~/lang/de-DE.json";
import en_US from "~/lang/en-US.json";
import fr_FR from "~/lang/fr-FR.json";
import it_IT from "~/lang/it-IT.json";

/** @type {import('i18n').Config} */
export default {
  legacy: false,
  lazy: true,
  langDir: "lang",
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
    },
    {
      code: "en",
      iso: "en-US",
      name: "English",
    },
    {
      code: "fr",
      iso: "fr-FR",
      name: "Français",
    },
    {
      code: "it",
      iso: "it-IT",
      name: "Italiano",
    },
  ],
  messages: {
    de: de_DE,
    en: en_US,
    fr: fr_FR,
    it: it_IT,
  },
};
