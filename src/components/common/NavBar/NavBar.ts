import Logo from '@/components/common/Icons/Logo.vue'
import LanguagePicker from '@/components/common/LanguagePicker/LanguagePicker.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { useAnimationStore } from '@/stores/animation'
import { useColorStore } from '@/stores/color'
import { useSectionStore } from '@/stores/section'
import type { NavBarLinkType } from '@/types/common/NavBarLink'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'NavBar',
  components: {
    Logo,
    LoadingSpinner,
    LanguagePicker
  },
  setup() {
    const { tm } = useI18n()
    const items = computed(() => tm('components.common.ShareSheet.links') as NavBarLinkType[])
    const themeDark = ref<boolean>(false)
    const navOpen = ref<boolean>(false)
    const navDisabled = ref<boolean>(false)

    const nodeEnv = computed(() => process.env.NODE_ENV)
    const currentSectionIndex = computed(() => useSectionStore().state.currentSectionIndex)
    const colorBadge = computed(() => useColorStore().randomizeColor())
    const headerAnimations = computed(() => {
      useAnimationStore().setHeaderAnimation({
        element: document.querySelector('.ac-ln-background') as HTMLElement,
        class: 'ac-ln-background-transition',
        timeout: 500
      })

      return useAnimationStore().headerAnimations
    })

    const toggleTheme = () => {
      themeDark.value = !themeDark.value
      storeTheme(themeDark.value ? 'dark' : 'light')
      updateAnimations()
    }

    const storeTheme = (themeName: string) => {
      themeDark.value = themeName === 'dark'
      localStorage.setItem('theme', themeName)
      document.documentElement.className = themeName
    }

    const toggleNav = () => {
      navOpen.value = !navOpen.value
      checkboxTimeout()
    }

    const checkboxTimeout = () => {
      navDisabled.value = true
      setTimeout(() => {
        navDisabled.value = false
      }, 1000)
    }

    const handleScroll = () => {
      if (navOpen.value && window.scrollY > 0) {
        navOpen.value = false
      }
    }

    const updateAnimations = () => {
      headerAnimations.value.forEach((element) => {
        element.element.classList.remove(element.class)

        setTimeout(() => {
          element.element.classList.add(element.class)
        }, element.timeout)
      })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)

      const storedTheme = localStorage.getItem('theme')
      if (storedTheme === null) {
        const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
        storeTheme(preferredTheme.matches ? 'dark' : 'light')
      } else {
        storeTheme(storedTheme)
      }
    })

    return {
      tm,
      items,
      themeDark,
      navOpen,
      navDisabled,
      nodeEnv,
      currentSectionIndex,
      colorBadge,
      headerAnimations,
      toggleTheme,
      toggleNav,
      handleScroll,
      updateAnimations
    }
  }
})
