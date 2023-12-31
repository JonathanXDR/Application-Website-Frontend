<template>
  <svg
    ref="svg"
    class="svg-timeline"
    :viewBox="viewBox"
    :xmlns="xmlns"
    :height="ulHeight"
  >
    <path
      ref="path"
      class="path-timeline"
      :d="pathD"
      stroke="var(--color-fill-gray)"
      stroke-width="5"
      :stroke-dashoffset="strokeDashoffset"
      :stroke-dasharray="strokeDasharray"
    ></path>
  </svg>
</template>

<script lang="ts" setup>
const pathD = ref<string | undefined>(undefined);
const ulHeight = ref<number | undefined>(undefined);
const viewBox = ref<string | undefined>(undefined);
const xmlns = ref<string | undefined>(undefined);

const strokeDasharray = ref(0);
const strokeDashoffset = ref(0);

const svg = ref<SVGElement | null>(null);
const path = ref<SVGPathElement | null>(null);

const initPath = () => {
  const instance = getCurrentInstance();
  const ul = instance?.parent?.refs.ul as HTMLElement;

  const ulHeightValue = ul.getBoundingClientRect().height;
  const ulHeightRounded = Math.round(ulHeightValue);

  pathD.value = `M 4 0 L 4 ${ulHeightRounded}`;
  ulHeight.value = ulHeightValue;
  viewBox.value = `0 0 8 ${ulHeightRounded}`;
  xmlns.value = `http://www.w3.org/${ulHeightRounded}/svg`;

  strokeDasharray.value = ulHeightValue;
  strokeDashoffset.value = ulHeightValue;
};

const animateLine = () => {
  const ulHeightValue = ulHeight.value || 0;
  const center = window.innerHeight / 2;
  const boundaries = path.value?.getBoundingClientRect();

  const percentage =
    (center - (boundaries?.top || 0)) / (boundaries?.height || 1);
  const drawLength = percentage > 0 ? ulHeightValue * percentage : 0;

  strokeDashoffset.value =
    drawLength < ulHeightValue ? ulHeightValue - drawLength : 0;
};

onMounted(() => {
  initPath();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", animateLine);
        window.addEventListener("resize", initPath);
      } else {
        window.removeEventListener("scroll", animateLine);
        window.removeEventListener("resize", initPath);
      }
    });
  });

  observer.observe(svg.value as SVGElement);
});
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
