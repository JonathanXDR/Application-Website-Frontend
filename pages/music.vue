<template>
  <div>
    <h1>User Library Albums</h1>
    {{ status }}
    <div v-if="error">{{ error }}</div>

    <div v-else>
      <ul>
        <li v-for="album in albums" :key="album.id">
          {{ album.attributes?.name }}
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
});

const {
  data: albums,
  status,
  error,
} = await useFetch<MusicKit.Albums[]>("/api/musickit/user-library-albums");
</script>
