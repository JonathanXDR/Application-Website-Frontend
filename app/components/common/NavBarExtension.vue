<script setup lang="ts">
const viewport = useViewport()
const { state: navbarState, setState } = useNavbar()

const stickyWrapper = ref<HTMLElement | null>(null)
const originalOffset = ref<number | null>(null)
const isSticky = ref(false)
const isInitialized = ref(false)

const navbarHeight = computed(() => (viewport.isLessThan('tablet') ? 48 : 52))

const containerStyle = computed(() => {
  const styles: Record<string, string> = {
    '--navbar-height': `${navbarHeight.value}px`,
  }

  if (isSticky.value) {
    styles.transform = 'translateY(0)'
    if (!navbarState.value.isHidden) {
      styles.top = `${navbarHeight.value}px`
    }
  }

  return styles
})

const calculateOriginalOffset = (): void => {
  if (!stickyWrapper.value || isInitialized.value) return

  const currentScroll = window.scrollY
  window.scrollTo(0, 0)

  originalOffset.value
    = stickyWrapper.value.getBoundingClientRect().top + window.scrollY
  isInitialized.value = true

  window.scrollTo(0, currentScroll)
}

const updateStickiness = (): void => {
  if (originalOffset.value === null) return

  const currentScroll = window.scrollY
  const triggerPoint
    = originalOffset.value
    - (navbarState.value.isHidden ? 0 : navbarHeight.value)

  const newIsSticky = currentScroll >= triggerPoint
  if (newIsSticky !== isSticky.value) {
    isSticky.value = newIsSticky
    setState({ extensionAttached: newIsSticky })
  }
}

onMounted(() => {
  nextTick(() => {
    calculateOriginalOffset()
    updateStickiness()
    useEventListener(window, 'scroll', updateStickiness, { passive: true })
  })
})

watch(
  () => navbarState.value.isHidden,
  () => {
    if (!isInitialized.value) {
      calculateOriginalOffset()
    }
    updateStickiness()
  },
)

useEventListener(
  window,
  'resize',
  () => {
    isInitialized.value = false
    calculateOriginalOffset()
    updateStickiness()
  },
  { passive: true },
)
</script>

<template>
  <div
    ref="stickyWrapper"
    class="filter-input-sticky-wrapper"
    :class="{
      'is-sticky': isSticky,
      'is-animating': navbarState.autoHide,
      'is-hiding': navbarState.isHidden,
    }"
    :style="containerStyle"
  >
    <div class="filter-input-container">
      <slot />
    </div>
  </div>
</template>

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
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.76471em 0;
  background-color: var(--color-menu);
  transition: border-bottom 0.2s ease-out;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

@media screen and (min-width: 768px) {
  .filter-input-container {
    width: 82.5%;
  }
}

.filter-input-sticky-wrapper.is-sticky .filter-input-container {
  border-bottom-color: var(--color-fill-gray-tertiary);
}

@media only screen and (max-width: 767px) {
  .filter-input-sticky-wrapper.is-sticky .filter-input-container {
    height: auto;
  }
}
</style>
