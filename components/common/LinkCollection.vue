<template>
  <div class="links">
    <p v-for="(link, index) in links" :key="index">
      <a :href="link.url" class="link link-icon" target="_blank">
        {{ link.title }}
        <Icon
          v-if="link.icon"
          :name="link.icon.name"
          size="large"
          class="svg-icon inline-chevron-right-icon icon-inline link-icon"
        />
      </a>
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { LinkType } from "~/types/common/Link";

const props = defineProps({
  links: {
    type: Array as () => LinkType[],
    required: true,
    default: () => [],
  },
});

const { links } = toRefs(props);
</script>

<style scoped>
.links p:first-of-type {
  margin-top: 0.8em;
}

.links p {
  margin-top: 0.5em;
}

.links p .link {
  width: fit-content;
}

/* --------------------------------- ribbon --------------------------------- */

.ribbon .links p {
  margin: 0 !important;
}

/* ------------------------------- ribbon-link ------------------------------ */

.ribbon-link a.link,
.ribbon-link a.link path {
  color: var(--ribbon-link-color);
  fill: var(--ribbon-link-color);
}

/* -------------------------- ribbon-link-animation ------------------------- */

@keyframes animate-color-white-0066cc {
  0% {
    color: var(--ribbon-link-color-initial);
    fill: var(--ribbon-link-color-initial);
  }

  to {
    color: var(--ribbon-link-color);
    fill: var(--ribbon-link-color);
  }
}

.ribbon-link-animation a.link,
.ribbon-link-animation a.link path {
  color: var(--ribbon-link-color-initial);
  fill: var(--ribbon-link-color-initial);
  animation: animate-color-white-0066cc 1s ease-in-out 1.8s forwards;
}

/* ---------------------------------- about --------------------------------- */

#about .links p {
  display: flex;
  justify-content: center;
}

@media screen and (min-width: 1250px) {
  #about .links p {
    justify-content: flex-start !important;
  }
}
</style>
