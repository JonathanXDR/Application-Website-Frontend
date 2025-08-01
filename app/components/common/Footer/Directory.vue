<script setup lang="ts">
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
    role="navigation"
  >
    <div
      v-for="column in items"
      :key="column.id"
      class="footer-directory-column"
    >
      <template v-if="column.label">
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
            <span class="footer-directory-column-section-anchor-label">
              Open Menu
            </span>
          </a>
          <a
            href="#"
            class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
          >
            <span class="footer-directory-column-section-anchor-label">
              Close Menu
            </span>
          </a>

          <ul class="footer-directory-column-section-list">
            <li
              v-for="link in column.children"
              :key="link.id"
              class="footer-directory-column-section-item"
            >
              <a
                class="footer-directory-column-section-link"
                :href="link.route"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </template>

      <template v-else>
        <template
          v-for="section in column.children"
          :key="section.id"
        >
          <input
            :id="`footer-directory-column-section-state-${section.id}`"
            class="footer-directory-column-section-state"
            type="checkbox"
          >
          <div class="footer-directory-column-section">
            <label
              class="footer-directory-column-section-label"
              :for="`footer-directory-column-section-state-${section.id}`"
            >
              <h3 class="footer-directory-column-section-title">
                {{ section.label }}
              </h3>
            </label>

            <a
              :href="`#footer-directory-column-section-state-${section.id}`"
              class="footer-directory-column-section-anchor footer-directory-column-section-anchor-open"
            >
              <span class="footer-directory-column-section-anchor-label">
                Open Menu
              </span>
            </a>
            <a
              href="#"
              class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
            >
              <span class="footer-directory-column-section-anchor-label">
                Close Menu
              </span>
            </a>

            <ul class="footer-directory-column-section-list">
              <li
                v-for="subLink in section.children"
                :key="subLink.id"
                class="footer-directory-column-section-item"
              >
                <a
                  class="footer-directory-column-section-link"
                  :href="subLink.route"
                >
                  {{ subLink.label }}
                </a>
              </li>
            </ul>
          </div>
        </template>
      </template>
    </div>
  </nav>
</template>
