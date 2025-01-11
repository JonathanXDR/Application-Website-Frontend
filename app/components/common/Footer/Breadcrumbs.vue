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
          <component
            :is="getLinkComponentType(link)"
            v-bind="getLinkAttributes(link)"
            class="link"
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
        </li>
      </ol>
    </div>
  </nav>
</template>
