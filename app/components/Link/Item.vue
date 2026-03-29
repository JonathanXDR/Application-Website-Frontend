<script setup lang="ts">
import type { LinkItemType } from '#shared/types/components/link-item'

const props = defineProps<LinkItemType>()
</script>

<template>
  <component
    :is="getLinkComponentType(props)"
    v-bind="getLinkAttributes(props)"
  >
    <template v-if="!loading">
      {{ props.title }}
    </template>
    <template v-else>
      <LoadingSkeleton
        width="200px"
        height="15px"
      />
    </template>

    <Icon
      v-if="props.icon"
      v-bind="props.icon"
      :loading
      class="icon icon-sm"
    />
  </component>
</template>

<style scoped>
.links.divider.loading .link {
  border: none !important;
}

.links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 10px;
}

.links.divider .link {
  padding-right: 10px;
  margin-right: 10px;
  border-right: 1px solid var(--color-figure-gray-secondary);
}

.links.divider .link:last-of-type {
  border-right: none;
  padding-right: 0;
  margin-right: 0;
}

.card.color .link {
  color: var(--color-fill-gray) !important;
}

.card.hover:hover .link {
  text-decoration: underline !important;
}

.icon {
  margin-left: 0.3em;
}

.ribbon-blue-to-default .ribbon-link .link.animate-color {
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
