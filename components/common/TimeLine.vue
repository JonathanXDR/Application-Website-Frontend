<template>
  <svg
    ref="svg"
    class="svg-timeline"
    :viewBox="`0 0 8 ${ulHeightRounded}`"
    :xmlns="`http://www.w3.org/${ulHeightRounded}/svg`"
    :height="ulHeightValue"
  >
    <path
      ref="path"
      class="path-timeline"
      stroke="var(--color-fill-gray)"
      stroke-width="5"
      :d="`M 4 0 L 4 ${ulHeightRounded}`"
      :stroke-dashoffset="ulHeightValue"
      :stroke-dasharray="ulHeightValue"
    ></path>
  </svg>
</template>

<script setup lang="ts">
const ulHeight: Ref<number> = ref(0)
const ulHeightValue: Ref<number> = ref(0)
const ulHeightRounded: Ref<number> = ref(0)

const svg: Ref<SVGElement | undefined> = ref(undefined)
const path: Ref<SVGPathElement | undefined> = ref(undefined)

const initPath = () => {
  const instance = getCurrentInstance()
  const ul = instance?.parent?.refs.ul as HTMLElement

  ulHeightValue.value = ul.getBoundingClientRect().height
  ulHeightRounded.value = Math.round(ulHeightValue.value)
}

const animateLine = () => {
  const height = ulHeight.value || 0
  const center = window.innerHeight / 2
  const boundaries = path.value?.getBoundingClientRect()

  const percentage =
    (center - (boundaries?.top || 0)) / (boundaries?.height || 1)
  const drawLength = percentage > 0 ? height * percentage : 0

  ulHeightValue.value = drawLength < height ? height - drawLength : 0
}

onMounted(() => {
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

  observer.observe(svg.value as SVGElement)
})
</script>

<style scoped>
.svg-timeline {
  position: absolute;
}

.path-timeline {
  transition: stroke-dashoffset 1s ease;
}

@media screen and (min-width: 900px) {
  .path-timeline {
    stroke-width: 8px;
  }
}
</style>
