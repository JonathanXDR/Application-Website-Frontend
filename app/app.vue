<script setup lang="ts">
const config = useRuntimeConfig()
const { randomDevColor } = useColor()
const siteConfig = useSiteConfig()

const color
  = config.public.appEnvironment === 'development'
    ? `var(--color-figure-${randomDevColor.value?.name})`
    : 'var(--color-fill-blue)'

// `knowsAbout` is sourced from the `technologies` collection so the
// `Person` node's skill list stays in sync with the cards rendered on
// `/technologies`.
const { data: technologies } = await useQueryCollection<{ title: string }>(
  'technologies',
).all()

// The `Person` identity is registered here rather than in
// `nuxt.config.ts` for several reasons:
//   * `image` resolves through `siteConfig.url` at runtime (no
//     build-time env), and relative URLs are auto-resolved against
//     `canonicalHost`.
//   * `description` tracks the per-locale value that the site-config
//     middleware writes from `content/config/site.yml` (DE, EN, FR, IT).
//   * `knowsAbout` is derived from the `technologies` collection.
//   * Omitting `@id` and `url` lets schema-org auto-derive
//     `@id = {host}#identity`, so this `Person` becomes the site's
//     identity, WebSite publisher, and page author. That is the
//     recommended pattern for single-identity portfolios.
//
// `defineWebSite()` is intentionally NOT called here. The schema-org
// automatic i18n integration creates per-locale `WebSite` nodes with
// the correct prefixed `@id` (`/de/#website`, `/en/#website`, and so
// on), linked via `workTranslation` and `translationOfWork`.
//
// TODO: under i18n `strategy: 'prefix'`, `nuxt-schema-org` 6.0.4 emits
// a dangling `translationOfWork.@id` for every non-default locale (it
// resolves to `https://host/#website` instead of
// `https://host/de/#website`). The cause is in
// `nuxt-schema-org/dist/runtime/app/plugins/i18n/defaults.js`
// `resolveIdForLocale`, which assumes the default locale is unprefixed.
// The attempted workaround `defineWebSite({ inLanguage: ... })` made
// things worse by collapsing every locale's `WebSite` `@id` to the
// unprefixed form, which broke `@id` uniqueness and turned
// `workTranslation`'s four valid references into four dangling ones.
// Leaving the auto-integration alone is the less bad state. Revisit
// once upstream honours `strategy: 'prefix'` for the default locale's
// URL (track upstream).
//
// https://nuxtseo.com/docs/schema-org/guides/setup-identity
// https://nuxtseo.com/docs/schema-org/guides/i18n
useSchemaOrg([
  definePerson({
    name: 'Jonathan Elias Russ',
    givenName: 'Jonathan',
    familyName: 'Russ',
    additionalName: 'Elias',
    birthDate: '2005-12-12',
    image: '/img/portrait.webp',
    description: () => siteConfig.description,
    jobTitle: 'Software Engineer',
    email: 'contact@jonathan-russ.com',
    knowsAbout: () => technologies.value?.map(t => t.title) ?? [],
    knowsLanguage: ['de-DE', 'en-US', 'fr-FR', 'it-IT'],
    nationality: { '@type': 'Country', 'name': 'Switzerland' },
    contactPoint: {
      '@type': 'ContactPoint',
      'contactType': 'personal',
      'email': 'contact@jonathan-russ.com',
    },
    sameAs: [
      'https://x.com/JonathanXD12_',
      'https://github.com/JonathanXDR',
      'https://linkedin.com/in/jonathan-russ-b7442a228',
      'https://www.instagram.com/jonathan_russ_',
      'https://www.threads.net/jonathan_russ_',
      'https://www.reddit.com/user/JonathanXD12',
    ],
    worksFor: {
      '@type': 'Organization',
      'name': 'Swisscom',
      'url': 'https://www.swisscom.ch',
    },
  }),
])
</script>

<template>
  <NuxtLoadingIndicator
    :color
    :error-color="`var(--color-figure-red)`"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
