import 'dayjs/locale/de'
import 'dayjs/locale/en'
import 'dayjs/locale/fr'
import 'dayjs/locale/it'
import de from './locales/de.json'
import en from './locales/en.json'
import fr from './locales/fr.json'
import it from './locales/it.json'

export default defineI18nConfig(() => {
  const locale = 'de'
  const fallbackLocale = 'en'

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
  }
})
