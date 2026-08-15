<script setup lang="ts">
await usePageSeo()

// The gallery tiles hotlink artwork from www.apple.com. Warming the
// connection up front saves the DNS, TCP, and TLS round trips for the
// page's largest visual content. The `crossorigin` attribute is left off
// on purpose: CSS background images are no-CORS fetches, and a CORS-warmed
// connection would not be reused for them.
useHead({
  link: [{ rel: 'preconnect', href: 'https://www.apple.com' }],
})

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
//   }
// )
</script>

<template>
  <AnimatingGallery
    title="Music Discovery"
    description="Where your new favorites find you."
  />
</template>
