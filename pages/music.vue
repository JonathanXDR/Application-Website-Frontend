<template>
  <div>
    <h1>User Library Albums</h1>
    {{ status }}
    <div v-if="error">
      {{ error }}
    </div>

    <div v-else>
      <ul>
        <li
          v-for="album in view?.data"
          :key="album.id"
        >
          {{ album.attributes?.artwork.url }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  header: true,
  nav: true,
  ribbon: true,
  footerFull: true,
  footerCompact: false,
})

const {
  data: view,
  status,
  error,
} = await useFetch<MusicKit.View<MusicKit.Albums>>(
  '/api/musickit/user-library-albums',
  {
    key: 'user-library-albums',
    lazy: true,
    params: { ids: '1616728060' },
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  }
)
</script>
