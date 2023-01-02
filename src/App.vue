<template>
  <head>
    <metainfo>
      <template v-slot:title="{ content }">{{
        content ? `${content} | Jonathan Russ` : `Jonathan Russ`
      }}</template>
    </metainfo>
  </head>
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
      <LoadingSpinner />
    </template>
  </Suspense>
  <footer>
    <FooterItem />
  </footer>
</template>

<script lang="ts" src="./App.ts"></script>
<style scoped></style>
