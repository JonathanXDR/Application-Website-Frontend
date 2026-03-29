<script setup lang="ts">
import type { IconItemType } from '#shared/types/components/icon-item'
import type { LinkItemType } from '#shared/types/components/link-item'

const props = withDefaults(
  defineProps<{
    label?: string
    icon?: IconItemType
    links?: LinkItemType[]
    loading?: boolean
  }>(),
  {
    links: () => [],
    loading: false,
  },
)

const { shouldShowBreadcrumbs, computedLinks, requestURL, route }
  = useBreadcrumbs(props)
</script>

<template>
  <nav
    v-if="shouldShowBreadcrumbs"
    class="footer-breadcrumbs"
    aria-label="Breadcrumbs"
  >
    <NuxtLink
      v-if="icon || label"
      :to="requestURL.host?.split('.').slice(-2).join('.')"
      class="home footer-breadcrumbs-home"
    >
      <Icon
        v-if="icon"
        v-bind="icon"
        :loading
        class="icon icon-sm"
      />
      <SiteLogo
        v-else
        class="h-[12px] !w-auto"
      />
      <span
        v-if="label"
        class="footer-breadcrumbs-home-label"
      >
        {{ label }}
      </span>
    </NuxtLink>

    <div class="footer-breadcrumbs-path">
      <ol class="footer-breadcrumbs-list">
        <li
          v-for="(link, index) in computedLinks"
          :key="index"
          class="footer-breadcrumbs-item"
        >
          <template v-if="link.url === route.path">
            {{ link.title }}
          </template>
          <template v-else>
            <LinkItem v-bind="link" />
          </template>
        </li>
      </ol>
    </div>
  </nav>
</template>
