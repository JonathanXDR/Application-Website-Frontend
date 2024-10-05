<template>
  <div
    ref="stickyWrapper"
    class="filter-input-sticky-wrapper"
    :class="{ 'is-sticky': isSticky }"
    :style="{
      'transform': transformValue,
      '--navbar-height': `${navbarHeight}px`,
    }"
  >
    <div class="filter-input-container">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { setState } = useNavbar()
const { width: windowWidth } = useWindowSize()

const shouldHideNavbar = useState<boolean>('shouldHideNavbar')
const stickyWrapper = ref<HTMLElement | undefined>(undefined)
const isSticky = ref(false)
const navbarHeight = computed(() => (windowWidth.value < 768 ? 48 : 52))

const handleScroll = () => {
  if (!stickyWrapper.value) return

  const stickyOffset = stickyWrapper.value.offsetTop
  const adjustedScroll =
    window.scrollY + (shouldHideNavbar.value ? 0 : navbarHeight.value)

  isSticky.value = adjustedScroll >= stickyOffset
  setState({ extensionAttached: isSticky.value })
}

const transformValue = computed(() => {
  if (!isSticky.value && !shouldHideNavbar.value) return 'translateY(0)'
  return isSticky.value && shouldHideNavbar.value
    ? 'translateY(0)'
    : `translateY(${navbarHeight.value}px)`
})

useEventListener(window, 'scroll', handleScroll, { passive: true })
onMounted(() => {
  handleScroll()
})
</script>

<style scoped>
.filter-input-sticky-wrapper {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 5;
  transition: transform 0.23s ease;
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
