<template>
  <metainfo />
  <header>
    <NavBar />
    <RibbonBar />
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
  <footer>
    <FooterItem />
  </footer>
</template>

<script lang="ts" src="./App.ts"></script>
<style scoped></style>
