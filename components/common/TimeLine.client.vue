<template>
  <svg
    ref="svgElement"
    class="svg-timeline"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    :height="timelineHeight"
  >
    <path
      ref="pathElement"
      class="path-timeline"
      stroke="var(--color-fill-gray)"
      :stroke-width="strokeWidth"
      :d="pathData"
      :stroke-dashoffset="strokeDashOffset"
      :stroke-dasharray="strokeDashArray"
    />
  </svg>
</template>

<script setup lang="ts">
const pathData = ref<string>("");
const timelineHeight = ref<number>(0);
const viewBox = ref<string>("0 0 8 0");
const strokeDashArray = ref<number>(0);
const strokeDashOffset = ref<number>(0);
const strokeWidth = ref<number>(5);

const svgElement = ref<SVGElement | null>(null);
const pathElement = ref<SVGPathElement | null>(null);
const timelineList = ref<HTMLElement | null>(null);

const initializePath = () => {
  if (timelineList.value) {
    const listHeight = timelineList.value.getBoundingClientRect().height;
    const roundedHeight = Math.round(listHeight);

    pathData.value = `M 4 0 L 4 ${roundedHeight}`;
    timelineHeight.value = roundedHeight;
    viewBox.value = `0 0 8 ${roundedHeight}`;
    strokeDashArray.value = listHeight;
    strokeDashOffset.value = listHeight;
  }
};

const animatePath = () => {
  const height = timelineHeight.value || 0;
  const centerY = window.innerHeight / 2;
  const pathBounds = pathElement.value?.getBoundingClientRect();

  const scrollPercentage =
    (centerY - (pathBounds?.top || 0)) / (pathBounds?.height || 1);
  const drawLength = scrollPercentage > 0 ? height * scrollPercentage : 0;

  strokeDashOffset.value = drawLength < height ? height - drawLength : 0;
};

const setupIntersectionObserver = () => {
  if (svgElement.value) {
    useIntersectionObserver(svgElement, ([entry]) => {
      if (entry?.isIntersecting) {
        window.addEventListener("scroll", animatePath);
        window.addEventListener("resize", initializePath);
      } else {
        window.removeEventListener("scroll", animatePath);
        window.removeEventListener("resize", initializePath);
      }
    });
  }
};

onMounted(async () => {
  const instance = getCurrentInstance();
  timelineList.value = instance?.parent?.refs.ul as HTMLElement;

  await nextTick();
  initializePath();
  setupIntersectionObserver();
});

watch(timelineHeight, async () => {
  await nextTick();
  initializePath();
});
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
