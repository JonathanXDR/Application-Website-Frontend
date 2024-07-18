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
const props = defineProps<{
  initialHeight: number;
  onUpdateHeight: (value: number) => void;
}>();

const pathData = ref<string>("");
const timelineHeight = ref<number>(props.initialHeight);
const viewBox = ref<string>("0 0 8 0");
const strokeDashArray = ref<number>(props.initialHeight);
const strokeDashOffset = ref<number>(props.initialHeight);
const strokeWidth = ref<number>(5);

const svgElement = ref<SVGElement | null>(null);
const pathElement = ref<SVGPathElement | null>(null);
const initialAnimationDone = ref<boolean>(false);

const initializePath = () => {
  const listHeight = props.initialHeight;
  const roundedHeight = Math.round(listHeight);

  pathData.value = `M 4 0 L 4 ${roundedHeight}`;
  timelineHeight.value = roundedHeight;
  viewBox.value = `0 0 8 ${roundedHeight}`;
  strokeDashArray.value = listHeight;
  strokeDashOffset.value = listHeight;
};

const animatePath = () => {
  const height = timelineHeight.value || 0;
  const centerY = window.innerHeight / 2;
  const pathBounds = pathElement.value?.getBoundingClientRect();

  if (!pathBounds) return;

  const scrollPercentage = (centerY - pathBounds.top) / pathBounds.height;
  const drawLength = scrollPercentage > 0 ? height * scrollPercentage : 0;

  strokeDashOffset.value = drawLength < height ? height - drawLength : 0;
  props.onUpdateHeight(strokeDashOffset.value);
};

const initialAnimatePath = () => {
  if (initialAnimationDone.value) return;

  animatePath();
  initialAnimationDone.value = true;
};

const setupIntersectionObserver = () => {
  if (!svgElement.value) return;

  useIntersectionObserver(svgElement, ([entry]) => {
    if (entry?.isIntersecting) {
      initialAnimatePath();
      window.addEventListener("scroll", animatePath);
      window.addEventListener("resize", initializePath);
    } else {
      window.removeEventListener("scroll", animatePath);
      window.removeEventListener("resize", initializePath);
    }
  });
};

onMounted(async () => {
  await nextTick();
  initializePath();
  setupIntersectionObserver();
});

watch(
  () => props.initialHeight,
  async () => {
    await nextTick();
    initializePath();
  },
);
</script>

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
