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
const { state: navbarState, setState } = useNavbar();
const breakpoints = useAppBreakpoints();

const stickyWrapper = ref<HTMLElement | null>(null);
const isSticky = ref(false);
const shouldHideNavbar = useState<boolean>("shouldHideNavbar", () => false);
const initialOffset = ref<number | null>(null);

const navbarHeight = computed(() =>
  breakpoints.smaller("md").value ? 48 : 52,
)

const containerStyle = computed(() => {
  const styles: Record<string, string> = {
    "--navbar-height": `${navbarHeight.value}px`,
  };

  if (!isSticky.value) {
    return styles;
  }

  if (shouldHideNavbar.value) {
    styles.transform = "translateY(0)";
  } else {
    styles.top = `${navbarHeight.value}px`;
    styles.transform = "translateY(0)";
  }

  return styles;
})

const handleScroll = () => {
  if (!stickyWrapper.value || initialOffset.value === null) return;

  const previousState = isSticky.value;
  const currentScroll = window.scrollY;

  const triggerPoint = shouldHideNavbar.value
    ? initialOffset.value
    : initialOffset.value - navbarHeight.value;

  isSticky.value = currentScroll >= triggerPoint;
  setState({ extensionAttached: isSticky.value });
};

onMounted(() => {
  if (stickyWrapper.value) {
    initialOffset.value = stickyWrapper.value.offsetTop;
  }
  handleScroll();
  useEventListener(window, "scroll", handleScroll, { passive: true });
})

watch([navbarHeight], () => {
  if (stickyWrapper.value) {
    initialOffset.value = stickyWrapper.value.offsetTop;
  }
});
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
  transition: transform 0.23s ease;
  transition: top 0.23s ease;
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
