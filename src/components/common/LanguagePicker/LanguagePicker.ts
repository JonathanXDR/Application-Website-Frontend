import { defineComponent, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LanguagePicker',
  props: {
    introText: {
      type: Boolean,
      required: false,
      default: () => true
    },
    shortForm: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  setup(props) {
    const { locale } = useI18n({ useScope: 'global' })
    const languages = reactive([
      { title: 'Deutsch', key: 'de', abbr: 'DE' },
      { title: 'English', key: 'en', abbr: 'EN' },
      { title: 'Français', key: 'fr', abbr: 'FR' },
      { title: 'Italiano', key: 'it', abbr: 'IT' }
    ])

    const changeLang = (lang: string) => {
      const localStorageLocale = ['de', 'en', 'fr', 'it'].includes(lang) ? lang : 'de'
      localStorage.setItem('language', localStorageLocale)
      locale.value = localStorageLocale
    }

    const getLabel = (lang: { abbr: string; title: string }) => {
      return props.shortForm ? lang.abbr : lang.title
    }

    onMounted(() => {
      if (localStorage.getItem('language') === undefined) {
        const preferredLanguage = window.navigator.language
        changeLang(preferredLanguage)
      } else {
        changeLang(localStorage.getItem('language') as string)
      }
    })

    return {
      languages,
      changeLang,
      getLabel
    }
  }
})
