import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LanguagePicker',
  props: {
    introText: {
      type: Boolean,
      required: true,
      default: () => true
    },
    shortForm: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  data() {
    return {
      languages: [
        { title: 'Deutsch', key: 'de', abbr: 'DE' },
        { title: 'English', key: 'en', abbr: 'EN' },
        { title: 'Français', key: 'fr', abbr: 'FR' },
        { title: 'Italiano', key: 'it', abbr: 'IT' }
      ]
    }
  },
  created() {
    if (localStorage.getItem('language') === null) {
      const preferedLanguage = window.navigator.language
      this.changeLang(preferedLanguage)
    } else {
      this.changeLang(localStorage.getItem('language') as string)
    }
  },
  methods: {
    getLabel(lang: { abbr: string; title: string }) {
      return this.shortForm ? lang.abbr : lang.title
    },
    changeLang(lang: string) {
      this.$i18n.locale = ['de', 'en', 'fr', 'it'].includes(lang) ? lang : 'de'
      localStorage.setItem('language', this.$i18n.locale)
    }
  }
})
