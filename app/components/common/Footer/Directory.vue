<script setup lang="ts">
import type { SectionType } from '#shared/types/common/section'

withDefaults(
  defineProps<{
    items?: SectionType[]
  }>(),
  {
    items: () => [],
  },
)
</script>

<template>
  <nav
    class="footer-directory"
    aria-label="Apple Developer Directory"
  >
    <div
      v-for="column in items"
      :key="column.id"
      class="footer-directory-column"
    >
      <input
        :id="`footer-directory-column-section-state-${column.id}`"
        class="footer-directory-column-section-state"
        type="checkbox"
      >
      <div class="footer-directory-column-section">
        <label
          class="footer-directory-column-section-label"
          :for="`footer-directory-column-section-state-${column.id}`"
        >
          <h3 class="footer-directory-column-section-title">
            {{ column.label }}
          </h3>
        </label>
        <a
          :href="`#footer-directory-column-section-state-${column.id}`"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-open"
        >
          <span class="footer-directory-column-section-anchor-label">Open Menu</span>
        </a>
        <a
          href="#"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
        >
          <span class="footer-directory-column-section-anchor-label">Close Menu</span>
        </a>
        <ul class="footer-directory-column-section-list">
          <li
            v-for="child in column.children"
            :key="child.id"
            class="footer-directory-column-section-item"
          >
            <a
              class="footer-directory-column-section-link"
              :href="child.route"
            >
              {{ child.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
