<script setup lang="ts">
const props = defineProps<{
  initialHeight: number
  onUpdateHeight: (value: number) => void
}>()

const { height: windowHeight } = useWindowSize()
const pathData = ref<string | undefined>(undefined)
const timelineHeight = ref<number>(props.initialHeight)
const viewBox = ref<string>('0 0 8 0')
const strokeDashArray = ref<number>(props.initialHeight)
const strokeDashOffset = ref<number>(props.initialHeight)
const strokeWidth = ref<number>(5)

const svg = useTemplateRef('svg')
const path = useTemplateRef('path')
const isVisible = useElementVisibility(svg)
const initialAnimationDone = ref<boolean>(false)

const initializePath = () => {
  const listHeight = props.initialHeight
  const roundedHeight = Math.round(listHeight)

  pathData.value = `M 4 0 L 4 ${roundedHeight}`
  timelineHeight.value = roundedHeight
  viewBox.value = `0 0 8 ${roundedHeight}`
  strokeDashArray.value = listHeight
  strokeDashOffset.value = listHeight
}

const animatePath = () => {
  const height = timelineHeight.value || 0
  const centerY = windowHeight.value / 2
  const pathBounds = path.value?.getBoundingClientRect()

  if (!pathBounds) return

  const scrollPercentage = (centerY - pathBounds.top) / pathBounds.height
  const drawLength = scrollPercentage > 0 ? height * scrollPercentage : 0

  strokeDashOffset.value = drawLength < height ? height - drawLength : 0
  props.onUpdateHeight(strokeDashOffset.value)
}

whenever(isVisible, () => {
  if (initialAnimationDone.value) return
  animatePath()
  initialAnimationDone.value = true
})

useEventListener(
  () => window,
  'scroll',
  () => {
    if (isVisible.value) animatePath()
  },
  { passive: true },
)
useEventListener(
  () => window,
  'resize',
  () => {
    if (isVisible.value) initializePath()
  },
  { passive: true },
)

onMounted(async () => {
  await nextTick()
  initializePath()
})

watch(
  () => props.initialHeight,
  async () => {
    await nextTick()
    initializePath()
  },
)
</script>

<template>
  <svg
    ref="svg"
    class="svg-timeline"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    :height="timelineHeight"
  >
    <path
      ref="path"
      class="path-timeline"
      stroke="var(--color-fill-gray)"
      :stroke-width="strokeWidth"
      :d="pathData"
      :stroke-dashoffset="strokeDashOffset"
      :stroke-dasharray="strokeDashArray"
    />
  </svg>
</template>

<style scoped>
.svg-timeline {
  position: absolute;
}

.path-timeline {
  transition: stroke-dashoffset 1s ease;
}

@media screen and (min-width: 768px) {
  .path-timeline {
    stroke-width: 8px;
  }
}
</style>
