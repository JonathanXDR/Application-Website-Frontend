import LogoIcon from '@/components/common/Icons/LogoIcon.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { fetchData } from '@/helpers/locale-helper'
import useColorStore from '@/stores/colorBadge'
import useAnimationStore from '@/stores/headerAnimations'
import useSectionStore from '@/stores/navbarSections'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    LogoIcon,
    LoadingSpinner
  },
  data() {
    return {
      json: null as any,
      themeDark: false,
      navOpen: false,
      navDisabled: false
    }
  },
  computed: {
    nodeEnv(): string | undefined {
      return process.env.NODE_ENV
    },
    currentSectionIndex(): number | null {
      return useSectionStore().currentSectionIndex
    },
    colorBadge(): {
      colorName: string
      colorVar: string
      colorHex: string
    } {
      return useColorStore().randomizeColor()
    },
    headerAnimations(): {
      element: HTMLElement
      class: string
      timeout: number
    }[] {
      useAnimationStore().setHeaderAnimation({
        element: this.$refs['ac-ln-background'] as HTMLElement,
        class: 'ac-ln-background-transition' as string,
        timeout: 500 as number
      })

      return useAnimationStore().headerAnimations
    }
  },
  created() {
    this.fetchLocalizedData()
    window.addEventListener('scroll', this.handleScroll)

    if (localStorage.getItem('theme') === null) {
      const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)')

      if (preferedTheme.matches) {
        this.storeTheme('dark')
      } else {
        this.storeTheme('light')
      }
    } else {
      if (localStorage.getItem('theme') === 'dark') {
        this.storeTheme('dark')
      } else {
        this.storeTheme('light')
      }
    }
  },
  watch: {
    '$i18n.locale': 'fetchLocalizedData'
  },
  methods: {
    async fetchLocalizedData() {
      try {
        const data = await fetchData()
        this.json = data.components.common.NavBar
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    toggleTheme() {
      this.themeDark = !this.themeDark
      if (this.themeDark) {
        this.storeTheme('dark')
      } else {
        this.storeTheme('light')
      }
      this.updateAnimations()
    },

    storeTheme(themeName: string): void {
      this.themeDark = themeName === 'dark'
      localStorage.setItem('theme', themeName)
      document.documentElement.className = themeName
    },

    toggleNav(): void {
      this.navOpen = !this.navOpen
      this.checkboxTimeout()
    },

    checkboxTimeout(): void {
      this.navDisabled = true
      setTimeout(() => {
        this.navDisabled = false
      }, 1000)
    },

    handleScroll(): void {
      if ((this.navOpen = true && window.scrollY > 0)) {
        this.navOpen = false
      }
    },

    updateAnimations(): void {
      this.headerAnimations.forEach((element) => {
        element.element.classList.remove(element.class)

        setTimeout(() => {
          element.element.classList.add(element.class)
        }, element.timeout)
      })
    }
  }
})
