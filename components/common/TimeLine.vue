<template>
  <svg
    ref="svg"
    class="svg-timeline"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    :height="ulHeight"
  >
    <path
      ref="path"
      class="path-timeline"
      stroke="var(--color-fill-gray)"
      stroke-width="5"
      :d="pathD"
      :stroke-dashoffset="strokeDashoffset"
      :stroke-dasharray="strokeDasharray"
    />
  </svg>
</template>

<script setup lang="ts">
const pathD = ref<string>('')
const ulHeight = ref<number>(0)
const viewBox = ref<string>('0 0 8 0')
const strokeDasharray = ref<number>(0)
const strokeDashoffset = ref<number>(0)

const svg = ref<SVGElement | null>(null)
const path = ref<SVGPathElement | null>(null)
const ul = ref<HTMLElement | null>(null)

const initPath = () => {
  if (ul.value) {
    const ulHeightValue = ul.value.getBoundingClientRect().height
    const ulHeightRounded = Math.round(ulHeightValue)

    pathD.value = `M 4 0 L 4 ${ulHeightRounded}`
    ulHeight.value = ulHeightRounded
    viewBox.value = `0 0 8 ${ulHeightRounded}`
    strokeDasharray.value = ulHeightValue
    strokeDashoffset.value = ulHeightValue
  }
}

const animateLine = () => {
  const ulHeightValue = ulHeight.value || 0
  const center = window.innerHeight / 2
  const boundaries = path.value?.getBoundingClientRect()

  const percentage =
    (center - (boundaries?.top || 0)) / (boundaries?.height || 1)
  const drawLength = percentage > 0 ? ulHeightValue * percentage : 0

  strokeDashoffset.value =
    drawLength < ulHeightValue ? ulHeightValue - drawLength : 0
}

onMounted(async () => {
  const instance = getCurrentInstance()
  ul.value = instance?.parent?.refs.ul as HTMLElement

  await nextTick()
  initPath()

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', animateLine)
        window.addEventListener('resize', initPath)
      } else {
        window.removeEventListener('scroll', animateLine)
        window.removeEventListener('resize', initPath)
      }
    })
  })

  if (svg.value) {
    observer.observe(svg.value)
  }
})

watchEffect(async () => {
  await nextTick()
  initPath()
})
</script>

<style scoped>
/* ------------------------------ svg-timeline ------------------------------ */

.svg-timeline {
  position: absolute;
}

/* ------------------------------ path-timeline ----------------------------- */

.path-timeline {
  transition: stroke-dashoffset 1s ease;
}

@media screen and (min-width: 900px) {
  .path-timeline {
    stroke-width: 8px;
  }
}
</style>
