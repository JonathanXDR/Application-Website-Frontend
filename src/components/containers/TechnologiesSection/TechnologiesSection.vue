<template>
  <h3 class="typography-magical-headline" style="padding-bottom: 50px">{{ props.title }}</h3>
  <!-- <FilterNav style="margin: 52px 0" /> -->
  <NavBarExtension>
    <FilterInput />
  </NavBarExtension>

  <LiveResultSummary />

  <ul class="card-container">
    <CardItem v-for="(card, index) in cards" :key="index" :card="card" />
    <ResultBlankState v-if="!cards" />
  </ul>
</template>

<script lang="ts" src="./TechnologiesSection.ts"></script>
<style scoped src="./TechnologiesSection.css"></style>
