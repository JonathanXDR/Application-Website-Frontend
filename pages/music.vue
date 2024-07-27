<template>
  <div>
    <h1>User Library Albums</h1>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="album in albums" :key="album.id">
          {{ album.attributes.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const albums = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const { data } = await useFetch("/api/musickit/user-library-albums");
    albums.value = data.value;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>
