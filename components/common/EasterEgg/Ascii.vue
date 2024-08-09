<template>
  <div>
    <pre>
        <code>
        {{ randomAscii() }}
        </code>
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const asciiArts = ref([]);

function randomAscii() {
  const randomIndex = Math.floor(Math.random() * asciiArts.value.length);
  return asciiArts.value[randomIndex];
}
</script>
