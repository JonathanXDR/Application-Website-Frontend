<template>
  <NuxtLink
    :class="['links', { divider }, { loading }]"
    :style="{ columnGap: !divider ? '12px' : '0' }"
  >
    <component
      :is="getLinkComponentType(link)"
      v-for="(link, index) in enhancedLinks"
      :key="index"
      :to="link.to"
      :href="link.href"
      :target="link.target"
      :class="['link', { 'animate-color': shouldAnimate }]"
    >
      <template v-if="!loading">
        {{ link.title }}
      </template>
      <template v-else>
        <LoadingSkeleton width="200px" height="15px" />
      </template>

      <Icon
        v-if="link.icon"
        :loading="loading"
        :name="link.icon.name"
        :size="link.icon.size"
        :colors="link.icon.colors"
        class="icon icon-small"
      />
    </component>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { LinkType } from '~/types/common/Link'
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
    loading: false
  }
)

const { links } = toRefs(props)

const getLinkComponentType = (link: LinkType) => {
  return link.url?.startsWith('#') || link.url?.startsWith('/')
    ? 'router-link'
    : 'a'
}

const enhancedLinks = computed(() => {
  return links?.value?.map(link => ({
    ...link,
    to:
      link.url?.startsWith('#') || link.url?.startsWith('/') ? link.url : null,
    href: !(link.url?.startsWith('#') || link.url?.startsWith('/'))
      ? link.url
      : null,
    target:
      link.url?.startsWith('#') || link.url?.startsWith('/')
        ? '_self'
        : '_blank'
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
  border-right: 1px solid var(--color-fill-gray-secondary);
}

.links.divider .link:last-of-type {
  border-right: none;
  padding-right: 10px;
  margin-right: 20px;
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
