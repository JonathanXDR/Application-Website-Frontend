<template>
  <div
    :class="['links', { divider }, { loading }]"
    :style="{ columnGap: !divider ? '12px' : '0' }"
  >
    <component
      :is="getLinkComponentType(link)"
      v-for="(link, index) in enhancedLinks"
      :key="index"
      v-bind="getLinkAttributes(link)"
      :class="['link', { 'animate-color': shouldAnimate }]"
    >
      <template v-if="!loading">
        {{ link.title }}
      </template>
      <template v-else>
        <LoadingSkeleton
          width="200px"
          height="15px"
        />
      </template>

      <DynamicIcon
        v-if="link.icon"
        v-bind="link.icon"
        :loading="loading"
        class="icon icon-sm"
      />
    </component>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import type { LinkType } from '#shared/types/common/link'

const props = withDefaults(
  defineProps<{
    links: LinkType[]
    divider?: boolean
    shouldAnimate?: boolean
    loading?: boolean
  }>(),
  {
    links: () => [],
    divider: true,
    shouldAnimate: false,
    loading: false,
  },
)

const { links } = toRefs(props)

const getLinkComponentType = (link: LinkType) => {
  return link.url?.startsWith('#') || link.url?.startsWith('/')
    ? NuxtLink
    : 'a'
}

const getLinkAttributes = (link: LinkType) => {
  return link.url?.startsWith('#') || link.url?.startsWith('/')
    ? { to: link.url, target: '_self' }
    : { href: link.url, target: '_blank', rel: 'noopener noreferrer' }
}

const enhancedLinks = computed(() => {
  return links.value.map(link => ({
    ...link,
    to:
      link.url?.startsWith('#') || link.url?.startsWith('/')
        ? link.url
        : undefined,
    href:
      link.url && !(link.url.startsWith('#') || link.url.startsWith('/'))
        ? link.url
        : undefined,
    target:
      link.url?.startsWith('#') || link.url?.startsWith('/')
        ? '_self'
        : '_blank',
  }))
})
</script>

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
