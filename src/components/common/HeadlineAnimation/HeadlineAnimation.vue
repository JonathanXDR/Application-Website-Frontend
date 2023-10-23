<template>
  <header class="section-header large-span-12">
    <h2 class="section-header-headline typography-section-headline-bold large-12 animated-headline">
      <template v-for="(item, index) in getItemsWithSpaces(title)">
        <span v-if="item !== ' '" :key="`word-${index}`" class="word">
          <span
            v-for="(char, charIndex) in item.split('')"
            :key="`char-${index}-${charIndex}`"
            :style="{
              '--letter-opacity': letterCounter <= letterIndex ? 1 : 0,
              '--cursor-opacity': 0
            }"
            class="letter"
          >
            {{ char }}<span class="cursor"></span>
          </span>
        </span>
        <span
          v-else
          :key="`space-${index}`"
          style="--letter-opacity: 1; --cursor-opacity: 0"
          class="letter"
        >
          &nbsp;
          <span class="cursor"></span>
        </span>
      </template>
    </h2>
  </header>
</template>

<script lang="ts" src="./HeadlineAnimation.ts"></script>
<style scoped src="./HeadlineAnimation.css"></style>
