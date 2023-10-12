import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LanguagePicker',
  created() {
    if (localStorage.getItem('language') === null) {
      const preferedLanguage = window.navigator.language
      this.changeLang(preferedLanguage)
    } else {
      this.changeLang(localStorage.getItem('language') as string)
    }
  },
  methods: {
    changeLang(lang: string) {
      this.$i18n.locale = ['de', 'en', 'fr', 'it'].includes(lang) ? lang : 'de'
      localStorage.setItem('language', this.$i18n.locale)
    }
  }
})
