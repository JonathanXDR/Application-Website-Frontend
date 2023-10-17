<template>
  <metainfo />
  <header v-if="route.meta.header !== false">
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

  <footer id="footer-full" v-if="route.meta.footerFull !== false">
    <FooterFull />
  </footer>
  <footer id="footer-compact" v-if="route.meta.footerCompact !== false">
    <FooterCompact />
  </footer>
</template>

<script lang="ts" src="./App.ts"></script>

<style>
#footer-compact {
  text-align: center;
}

#footer-full {
  width: 90%;
  margin: 100px auto 0 auto;
  border-top: 1px solid var(--color-fill-gray-tertiary);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

@media screen and (min-width: 900px) {
  #footer-full {
    width: 82.5%;
    flex-direction: row !important;
  }
}
</style>
