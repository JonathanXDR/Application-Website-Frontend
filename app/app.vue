<script setup lang="ts">
const config = useRuntimeConfig()
const { randomDevColor } = useColor()
const siteConfig = useSiteConfig()

const color
  = config.public.appEnvironment === 'development'
    ? `var(--color-figure-${randomDevColor.value?.name})`
    : 'var(--color-fill-blue)'

// Only `title` is selected: this query runs on every page and would
// otherwise embed the whole collection into each payload.
const { data: technologies } = await useQueryCollection<{ title: string }>(
  'technologies',
)
  .select('title')
  .all()

// The `Person` identity lives here rather than in `nuxt.config.ts`
// because its fields resolve at runtime, against `siteConfig` and the
// `technologies` collection.
//
// Omitting `@id` and `url` lets schema-org derive `@id = {host}#identity`,
// so this `Person` becomes the site identity, `WebSite` publisher and
// page author. `defineWebSite()` is intentionally not called: the
// schema-org i18n integration already creates per-locale `WebSite` nodes.
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
