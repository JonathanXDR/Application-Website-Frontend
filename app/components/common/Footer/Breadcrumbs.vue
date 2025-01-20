<script setup lang="ts">
import type { IconType } from '#shared/types/common/icon'
import type { LinkType } from '#shared/types/common/link'

withDefaults(
  defineProps<{
    label?: string
    icon?: IconType
    links?: LinkType[]
    loading?: boolean
  }>(),
  {
    links: () => [],
    loading: false,
  },
)
</script>

<template>
  <nav
    class="footer-breadcrumbs"
    aria-label="Breadcrumbs"
  >
    <NuxtLink
      v-if="icon || label"
      to="/"
      class="home footer-breadcrumbs-home"
    >
      <!-- width: 14px; padding-left: 25px; -->
      <span
        v-if="icon"
        class="footer-breadcrumbs-home-icon"
        aria-hidden="true"
        data-hires-status="pending"
      >
        <DynamicIcon
          v-bind="icon"
          :loading="loading"
          class="icon icon-sm"
        />
      </span>
      <SiteLogo
        v-else
        class="footer-breadcrumbs-home-icon !w-auto"
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
          v-for="(link, index) in links"
          :key="index"
          class="footer-breadcrumbs-item"
        >
          <LinkItem v-bind="link" />
        </li>
      </ol>
    </div>
  </nav>
</template>
