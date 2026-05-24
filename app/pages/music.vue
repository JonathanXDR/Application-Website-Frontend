<script setup lang="ts">
definePageMeta({
  header: true,
  nav: true,
  ribbon: true,
  footerPre: true,
  footerCompact: false,
})

const route = useRoute()
const { currentRoute, homeLabel, homePath } = useNavbar()
const { data: siteContent } = await useQueryCollection('siteConfig')
  .stem('site')
  .first()

const pageKey = computed(
  () => (route.name as string | undefined)?.replace(/___\w+$/, '') ?? '',
)
const pageTitle = computed(() => currentRoute.value?.label ?? '')
const pageDescription = computed(
  () =>
    (pageKey.value && siteContent.value?.pages?.[pageKey.value]?.description)
    || siteContent.value?.description
    || '',
)

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
})

defineOgImage('Overview', {
  title: pageTitle.value,
  description: pageDescription.value,
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: () => [
      { name: homeLabel.value, item: homePath.value },
      { name: pageTitle.value, item: route.path },
    ],
  }),
])

// const {
//   data: view,
//   status,
//   error,
// } = await useFetch<MusicKit.View<MusicKit.Albums>>(
//   '/api/musickit/user-library-albums',
//   {
//     key: 'user-library-albums',
//     lazy: true,
//     params: { ids: '1616728060' },
//     getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
//   }
// )
</script>

<template>
  <AnimatingGallery
    title="Music Discovery"
    description="Where your new favorites find you."
  />
</template>
