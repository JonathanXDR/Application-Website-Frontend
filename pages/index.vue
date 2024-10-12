<template>
  <div>
    <!-- <HeroSequenceSection /> -->
    <template v-for="section in sections">
      <section
        v-for="(child, index) in section.children"
        :id="child.id"
        :key="child.id"
        v-section="(child.id, index)"
        :name="child.label"
        :class="child.class"
      >
        <component
          :is="`${child.id}Section`"
          :title="child.label"
        />
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { SectionType } from '~/types/common/section'

defineOgImageComponent('Overview')

definePageMeta({
  header: true,
  nav: true,
  ribbon: true,
  footerFull: true,
  footerCompact: false,
})

const { tm } = useI18n()
const sections = computed<SectionType[]>(() => tm('components.common.NavBar'))
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
  background: url(/img/lines.jpg);
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
  background: url(/img/vignette.png);
  z-index: 11;
  background-size: 100% 100%;
  mix-blend-mode: overlay;
  pointer-events: none;
  opacity: 0.6;
}

#about.section-separated {
  margin: 0;
  padding: 2em 0 4em 0;
}

@media screen and (min-width: 1280px) {
  #about.section-separated {
    padding: 4em 0 4em 0;
  }
}

#music {
  padding: 100px 0;
  margin: 0 auto 0 auto;
}

@media screen and (min-width: 768px) {
  #music {
    padding: 150px 0 100px 0;
  }
}

#technologies {
  padding: 100px 0;
  /* background: var(--color-fill-tertiary); */
}

@media screen and (min-width: 768px) {
  #technologies {
    padding: 150px 0 100px 0;
  }
}

#projects {
  padding-top: 100px;
  margin: 0 auto 0 auto;
}

@media screen and (min-width: 768px) {
  #projects {
    padding-top: 150px;
  }
}
</style>
