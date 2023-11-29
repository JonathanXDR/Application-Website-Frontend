<template>
  <section
    v-for="(section, index) in ($tm('components.common.NavBar') as SectionType[])"
    :name="section.name"
    :key="section.id"
    :id="section.id"
    :class="section.class"
    v-section="(section.id, index)"
  >
    <component :title="section.name" :is="`${section.id}Section`" />
  </section>

  <!-- insert Music Library here -->
  <!-- insert Galaxy Game here -->
</template>

<script setup lang="ts">
import type { SectionType } from '~/types/common/Section';
</script>

<style scoped>
#vhs {
  display: none;
}

#crt-lines {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(img/lines.jpg);
  z-index: 10;
  background-size: 7px auto;
  mix-blend-mode: overlay;
  pointer-events: none;
  opacity: 0.4;
  animation: moveDownAnimation 150s linear infinite;
}

@keyframes moveDownAnimation {
  100% {
    background-position-y: 100%;
  }
}

#darken {
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

#vignette {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(img/vignette.png);
  z-index: 11;
  background-size: 100% 100%;
  mix-blend-mode: overlay;
  pointer-events: none;
  opacity: 0.6;
}

/* ---------------------------------- about --------------------------------- */

#about.section-separated {
  padding: 0 0 4em 0;
  margin-top: -2em;
}

@media screen and (min-width: 350px) {
  #about.section-separated {
    margin: 0;
  }
}

@media screen and (min-width: 900px) {
  #about.section-separated {
    padding: 2em 0 4em 0;
  }
}

@media screen and (min-width: 1250px) {
  #about.section-separated {
    padding: 4em 0 4em 0;
  }
}

/* ------------------------------ technologies ------------------------------ */

#technologies {
  padding: 100px 0;
  background: var(--color-fill-tertiary);
}

@media screen and (min-width: 900px) {
  #technologies {
    padding: 150px 0 100px 0;
  }
}

/* -------------------------------- projects -------------------------------- */

#projects {
  padding-top: 100px;
  width: 90%;
  margin: 0 auto 0 auto;
}

@media screen and (min-width: 900px) {
  #projects {
    padding-top: 150px;
    width: 82.5%;
  }
}
</style>
