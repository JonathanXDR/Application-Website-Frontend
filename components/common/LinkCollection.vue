<template>
  <a class="links">
    <component
      :is="
        link.url.startsWith('#') || link.url.startsWith('/')
          ? 'router-link'
          : 'a'
      "
      v-for="(link, index) in links"
      :key="index"
      :to="(link.url.startsWith('#') || link.url.startsWith('/')) && link.url"
      :href="
        !(link.url.startsWith('#') || link.url.startsWith('/')) && link.url
      "
      :target="
        link.url.startsWith('#') || link.url.startsWith('/')
          ? '_self'
          : '_blank'
      "
      class="link"
    >
      {{ link.title
      }}<Icon
        v-if="link.icon"
        :name="link.icon.name"
        :size="link.icon.size"
        :colors="link.icon.colors"
        class="icon icon-small"
      />
    </component>
  </a>
</template>

<script setup lang="ts">
import type { LinkType } from "~/types/common/Link";

const props = withDefaults(
  defineProps<{
    links: LinkType[];
  }>(),
  {
    links: () => [],
  },
);

const { links } = toRefs(props);
</script>

<style scoped>
.links {
  display: flex;
  align-items: center;
  gap: 12px;
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
</style>
