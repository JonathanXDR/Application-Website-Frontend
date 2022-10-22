<template>
  <header>
    <NavBar ref="nav-bar" @updateAnimations="updateAnimations" />
    <RibbonBar ref="ribbon-bar" />
  </header>
  <Suspense>
    <template #default>
      <main>
        <p>{{ currentSection }}</p>
        <RouterView />
      </main>
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
  <FooterItem />
</template>

<script lang="ts" src="./App.ts"></script>
<style scoped></style>
