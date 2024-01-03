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

/* ---------------------------------- card ---------------------------------- */

.card.color .link {
  color: var(--color-fill-gray) !important;
}

.card:hover .link {
  text-decoration: underline !important;
}

.icon {
  margin-left: 0.3em;
}

/* ------------------------------- ribbon-link ------------------------------ */

.ribbon-blue-to-default .ribbon-link .link {
  color: white;
  animation: animate-color-fff-06c 1s ease-in-out 1.8s forwards;
}

@keyframes animate-color-fff-06c {
  0% {
    color: white;
  }
  to {
    color: var(--color-figure-blue);
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
