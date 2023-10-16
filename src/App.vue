<template>
  <metainfo />
  <header>
    <NavBar v-if="route.meta.nav !== false" />
    <RibbonBar v-if="route.meta.ribbon !== false" />
  </header>
  <Suspense>
    <template #default>
      <main>
        <RouterView />
      </main>
    </template>
    <template #fallback>
      <LoadingSpinner class="full-screen center" />
    </template>
  </Suspense>
  <footer v-if="route.meta.footer !== false">
    <FooterItem />
  </footer>
</template>

<script lang="ts" src="./App.ts"></script>
<style scoped></style>
