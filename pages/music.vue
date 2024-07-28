<template>
  <div>
    <h1>User Library Albums</h1>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>
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

const albums = ref<MusicKit.Albums[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const { data } = await useFetch("/api/musickit/user-library-albums");
    albums.value = data.value;
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
});
</script>
