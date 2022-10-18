<template>
  <header>
    <NavBar ref="navBar" @my-event="updateAnimations" />
    <!-- <RibbonBar ref="ribbonBar" /> -->
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
  <!-- <FooterSection /> -->
</template>

<script lang="ts" src="./App.ts"></script>
<style scoped></style>
