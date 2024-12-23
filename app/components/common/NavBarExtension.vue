<template>
  <div
    ref="stickyWrapper"
    class="filter-input-sticky-wrapper"
    :class="{
      'is-sticky': isSticky,
      'is-animating': navbarState.autoHide,
      'is-hiding': shouldHideNavbar,
    }"
    :style="containerStyle"
  >
    <div class="filter-input-container">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stickyWrapper = ref<HTMLElement | null>(null)
const initialOffset = ref<number | null>(null)
const isSticky = ref(false)

const viewport = useViewport()
const { state: navbarState, setState } = useNavbar()
const shouldHideNavbar = useState<boolean>('shouldHideNavbar', () => false)

const navbarHeight = computed(() =>
  viewport.isLessThan('tablet').value ? 48 : 52,
)

const containerStyle = computed(() => {
  const styles: Record<string, string> = {
    '--navbar-height': `${navbarHeight.value}px`,
  }

  if (isSticky.value) {
    styles.transform = 'translateY(0)'
    if (!shouldHideNavbar.value) {
      styles.top = `${navbarHeight.value}px`
    }
  }

  return styles
})

const updateInitialOffset = () => {
  if (stickyWrapper.value) {
    initialOffset.value = stickyWrapper.value.offsetTop
  }
}

const handleScroll = () => {
  if (initialOffset.value === null) return

  const currentScroll = window.scrollY
  const triggerPoint
    = initialOffset.value - (shouldHideNavbar.value ? 0 : navbarHeight.value)

  isSticky.value = currentScroll >= triggerPoint
  setState({ extensionAttached: isSticky.value })
}

onMounted(() => {
  updateInitialOffset()
  handleScroll()
  useEventListener(window, 'scroll', handleScroll, { passive: true })
})

watch(navbarHeight, () => {
  updateInitialOffset()
})
</script>

<style scoped>
.filter-input-sticky-wrapper {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 5;
  transform: translateY(0);
}

.filter-input-sticky-wrapper.is-animating {
  transition:
    transform 0.23s ease,
    top 0.23s ease;
}

.filter-input-sticky-wrapper.is-hiding {
  top: 0 !important;
}

.filter-input-sticky-wrapper.is-hiding.is-sticky {
  transform: translateY(0);
}

.filter-input-container {
  padding: 0.76471em 0;
  background-color: var(--color-menu);
  transition: border-bottom 0.2s ease-out;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

.filter-input-sticky-wrapper.is-sticky .filter-input-container {
  border-bottom-color: var(--color-fill-gray-tertiary);
}

@media only screen and (max-width: 767px) {
  .filter-input-sticky-wrapper.is-sticky .filter-input-container {
    height: auto;
  }
}

.container {
  margin-left: auto;
  margin-right: auto;
  width: 980px;
}

@media only screen and (max-width: 1279px) {
  .container {
    width: 692px;
  }
}

@media only screen and (max-width: 767px) {
  .container {
    width: 87.5%;
  }
}

@media only screen and (max-width: 319px) {
  .container {
    width: 215px;
  }
}
</style>
