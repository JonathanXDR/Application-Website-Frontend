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
// `/technologies`. Only `title` is selected, since this query runs in
// app.vue and would otherwise embed the full collection into every
// page's payload just for the skill name list.
const { data: technologies } = await useQueryCollection<{ title: string }>(
  'technologies',
)
  .select('title')
  .all()

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
// TODO: `nuxt-schema-org` (verified in 6.2.1) emits two related defects
// under @nuxtjs/i18n when locales declare distinct `code` and `language`
// values. Root cause in
// `nuxt-schema-org/dist/runtime/app/plugins/i18n/defaults.js`: the plugin
// treats `siteConfig.defaultLocale` as an i18n locale CODE, but
// nuxt-site-config's i18n integration populates it with the language TAG
// (`de-DE`, see `resolveDefaultLocale` returning `locale.language`).
// Consequences: (1) the `workTranslation` filter
// `locale.code !== siteConfig.defaultLocale` never matches, so the
// default locale lists itself as its own translation, and (2)
// `resolveIdForLocale({ code: 'de-DE' })` calls
// `localePath('index', 'de-DE')` with an unknown locale, falling back to
// the unprefixed root and producing a dangling
// `translationOfWork.@id = https://host/#website` on non-default locales.
// No app-side workaround exists: the i18n integration pushes site config
// at a higher priority than nuxt.config, and the attempted
// `defineWebSite({ inLanguage: ... })` override collapsed every locale's
// `WebSite` `@id` to the unprefixed form, which broke `@id` uniqueness.
// Leaving the auto-integration alone is the less bad state. Upstream fix
// would resolve the default locale code from `$i18n.defaultLocale`
// instead of `siteConfig.defaultLocale` (track upstream).
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
    knowsAbout: () =>
      technologies.value?.map((t: { title: string }) => t.title) ?? [],
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
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator
    :color
    :error-color="`var(--color-figure-red)`"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
