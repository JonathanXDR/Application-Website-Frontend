<script setup lang="ts">
import type { BasicSizeType } from '#shared/types/common/basic-size'
import type { LinkType } from '#shared/types/common/link'

withDefaults(
  defineProps<{
    componentSize?: Exclude<BasicSizeType, 'medium'>
    legalLinks?: LinkType[]
    news?: {
      title: string
      link: LinkType
    }
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
      v-if="news"
      class="footer-mini-news"
    >
      <div class="copy">
        {{ news.title }}
        <LinkItem v-bind="news.link" />
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
      <FooterCopyright
        v-if="!loading && componentSize === 'small'"
        :component-size="componentSize"
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

      <FooterCopyright
        v-if="!loading && componentSize === 'large'"
        :component-size="componentSize"
      />
    </div>
  </section>
</template>
