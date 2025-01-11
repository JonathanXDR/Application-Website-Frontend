<script setup lang="ts">
import type { LinkType } from '#shared/types/common/link'

withDefaults(
  defineProps<{
    legalLinks?: LinkType[]
    newsLinks?: LinkType[]
    colorSchemeToggle?: boolean
    languageDropdown?: boolean
    loading?: boolean
  }>(),
  {
    legalLinks: () => [],
    newsLinks: () => [],
    loading: false,
  },
)
</script>

<template>
  <section
    class="footer-mini"
    vocab="http://schema.org/"
    typeof="Organization"
  >
    <div
      v-if="newsLinks.length"
      class="footer-mini-news"
    >
      <div class="copy">
        To view the latest developer news, visit
        <a href="/news/">News and Updates</a>.
      </div>
      <div
        v-if="colorSchemeToggle"
        class="content"
      >
        <ColorSchemeToggle />
      </div>
    </div>
    <LanguagePickerDropdown
      v-if="languageDropdown"
      class="float-right"
      component-size="xsmall"
    />

    <div class="footer-mini-legal">
      <!-- render FooterCopyright here if componentSize is small -->
      <FooterCopyright
        v-if="!loading"
        component-size="small"
      />
      <div
        v-if="legalLinks.length"
        class="footer-mini-legal-links"
      >
        <LinkItem
          v-for="(link, index) in legalLinks"
          :key="index"
          v-bind="link"
          class="footer-mini-legal-link"
        />
      </div>
      <!-- render FooterCopyright here if componentSize is large -->
      <FooterCopyright
        v-if="!loading"
        component-size="large"
      />
    </div>
  </section>
</template>
