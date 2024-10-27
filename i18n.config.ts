import "dayjs/locale/de";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import "dayjs/locale/it";
import de from "./app/lang/de.json";
import en from "./app/lang/en.json";
import fr from "./app/lang/fr.json";
import it from "./app/lang/it.json";

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
