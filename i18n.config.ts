import "dayjs/locale/de";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import "dayjs/locale/it";
import de from "~/lang/de.json";
import en from "~/lang/en.json";
import fr from "~/lang/fr.json";
import it from "~/lang/it.json";

export default defineI18nConfig(() => {
  const locale = "de";
  const fallbackLocale = "en";

  return {
    legacy: false,
    globalInjection: true,
    locale,
    fallbackLocale,
    messages: {
      de,
      en,
      fr,
      it,
    },
  };
});
