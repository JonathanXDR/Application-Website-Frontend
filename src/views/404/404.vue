<template>
  <div id="err404" class="wrapper">
    <div class="static-container">
      <h1 class="title">
        <span class="params">new</span> Error(<span class="params">404</span>)
      </h1>

      <TextBlock>
        <p>The page you requested could not be found.</p>
        <router-link to="/" title="Back home" class="bt">
          <svg class="nav-ico -prev" viewBox="0 0 16 16">
            <path d="M5,1h10v10 M5.5,10.5l0.8-0.8" />
          </svg>
          Back to home
        </router-link>
      </TextBlock>
    </div>

    <Astronaut isPlaying />
    <CoffeeMug isPlaying />
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound',
};
</script>

<style scoped></style>
