<template>
  <header class="section-header large-span-12">
    <h2
      class="section-header-headline typography-section-headline-bold large-12 animated-headline"
    >
      <template
        v-for="(word, wordIndex) in title.split(' ')"
        :key="`word-${wordIndex}`"
      >
        <span class="word">
          <span
            v-for="(char, charIndex) in word.split('')"
            :key="`char-${wordIndex}-${charIndex}`"
            :style="{
              '--letter-opacity':
                charIndex + totalChars(wordIndex) <= letterIndex ? 1 : 0,
              '--cursor-opacity': 0,
            }"
            class="letter"
          >
            {{ char }}<span class="cursor"></span>
          </span>
        </span>
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

<script lang="ts" setup>
const props = defineProps<{
  title: string;
}>();

const letterIndex = ref(0);
let lastScrollY = window.scrollY;

function totalChars(upToWordIndex: number): number {
  const words = props.title.split(" ").slice(0, upToWordIndex);
  return words.reduce((total, word) => total + word.length, 0);
}

function handleScroll() {
  const totalLetters = [...props.title].filter((char) => char !== " ").length;
  if (window.scrollY > lastScrollY && letterIndex.value < totalLetters) {
    letterIndex.value += 1;
  } else if (window.scrollY < lastScrollY && letterIndex.value > 0) {
    letterIndex.value -= 1;
  }
  lastScrollY = window.scrollY;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.typography-section-headline-bold {
  font-size: 80px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.013em;
  font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
    sans-serif;
}

@media only screen and (max-width: 1068px) {
  .typography-section-headline-bold {
    font-size: 54px;
    line-height: 1.037037037;
    font-weight: 700;
    letter-spacing: -0.013em;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}

@media only screen and (max-width: 734px) {
  .typography-section-headline-bold {
    font-size: 32px;
    line-height: 1.125;
    font-weight: 700;
    letter-spacing: -0.013em;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}

/*! CSS Used from: https://www.apple.com/v/icloud/af/built/styles/overview.built.css */
@media only screen and (max-width: 734px) {
  .icloud-update .section .section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
  }
}

.section-header {
  text-align: left;
  margin-bottom: 70px;
}

@media only screen and (max-width: 1068px) {
  .section-header {
    margin-bottom: 50px;
  }
}

.section-header {
  align-items: start;
  position: relative;
  width: 980px;
  margin: 0 auto 70px;
  padding-right: 6px;
  max-width: calc(100% - var(--grid-gutter-width) * 2);
}

@media only screen and (max-width: 1068px) {
  .section-header {
    grid-column: span 12;
    margin: 0 0 50px;
    padding-left: 40px;
    padding-right: unset;
    width: 100%;
  }
}

@media only screen and (max-width: 734px) {
  .section-header {
    padding-left: 14px;
  }
}

.animated-headline {
  position: absolute;
  width: -moz-fit-content;
  width: fit-content;
  display: inline;
  margin-top: 0;
  top: 0;
}

html.overview-parallax .visuallyhidden--enhanced {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  padding: 0;
  border: 0;
  max-width: -moz-fit-content;
  max-width: fit-content;
}

.cursor {
  width: 4px;
  height: 1em;
  line-height: 1;
  background: #0071e3;
  display: inline-flex;
  position: absolute;
  bottom: 1px;
  right: -4px;
  border-radius: 18px;
}

.cursor-blink .cursor {
  animation: blink 1s ease-out 1s infinite;
}

.word {
  display: inline-flex;
}

.letter {
  opacity: var(--letter-opacity);
  position: relative;
}

.cursor {
  opacity: var(--cursor-opacity);
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
