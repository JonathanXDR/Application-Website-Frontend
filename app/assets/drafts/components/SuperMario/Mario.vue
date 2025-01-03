<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div :class="['mario', state]" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  state: string
}>()
</script>

<style scoped>
.mario {
  width: 128px;
  height: 248px;
  background: url("~~/public/mario/bg-mario.png") no-repeat -256px -384px;
}
.mario.up {
  background-position: 0 -384px;
}
.mario.down {
  background-position: -128px -384px;
}
.mario.celebrate {
  background-position: -384px -384px;
}
.preview > .mario {
  margin: 10rem auto 3rem;
}
button {
  padding: 1rem;
}
</style>
