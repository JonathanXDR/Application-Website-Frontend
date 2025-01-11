<script setup lang="ts">
import type { LinkType } from '#shared/types/common/link'

withDefaults(
  defineProps<{
    label: string
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
    <a
      class="home footer-breadcrumbs-home"
      href="/"
    >
      <span class="footer-breadcrumbs-home-label">
        {{ label }}
      </span>
    </a>
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
