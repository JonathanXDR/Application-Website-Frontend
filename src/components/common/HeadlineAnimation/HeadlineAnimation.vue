<template>
  <header class="section-header large-span-12">
    <h2 class="section-header-headline typography-section-headline-bold large-12 animated-headline">
      <template v-for="(word, wordIndex) in title.split(' ')" :key="`word-${wordIndex}`">
        <span class="word">
          <span
            v-for="(char, charIndex) in word.split('')"
            :key="`char-${wordIndex}-${charIndex}`"
            :style="{
              '--letter-opacity': letterCounter <= letterIndex ? 1 : 0,
              '--cursor-opacity': 0
            }"
            class="letter"
          >
            {{ char }}<span class="cursor"></span>
          </span>
        </span>
        <!-- Conditionally render a space span unless it's the last word -->
        <span
          v-if="wordIndex < title.split(' ').length - 1"
          style="--letter-opacity: 1; --cursor-opacity: 0"
          class="letter"
        >
          &nbsp;<span class="cursor"></span>
        </span>
      </template>
    </h2>
  </header>
</template>

<script lang="ts" src="./HeadlineAnimation.ts"></script>
<style scoped src="./HeadlineAnimation.css"></style>
