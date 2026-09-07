<script setup lang="ts">
import type { NavigationCollectionItem } from '@nuxt/content'
import SectionAbout from '~/components/Section/About.global.vue'
import SectionFunFacts from '~/components/Section/FunFacts.global.vue'
import SectionLanguages from '~/components/Section/Languages.global.vue'
import SectionReferences from '~/components/Section/References.global.vue'

await usePageSeo({ breadcrumb: false })

// Sections used to be resolved as `section-${child.id}` against the globally
// registered components, so a renamed id in
// `content/components/navigation/navbar.yml` rendered a blank section at
// runtime and nothing failed. Mapping the ids explicitly moves the failure
// to build time: moving or renaming any of these files is now an unresolved
// import, and an id with no entry is skipped rather than silently mounting
// nothing.
const sectionComponents = {
  'about': SectionAbout,
  'languages': SectionLanguages,
  'fun-facts': SectionFunFacts,
  'references': SectionReferences,
} satisfies Record<string, Component>

const { data: navbarData } = await useQueryCollection<NavigationCollectionItem>(
  'navigation',
)
  .stem('navbar')
  .first()

const sections = computed<SectionType[]>(() => navbarData.value?.items ?? [])
</script>

<template>
  <div>
    <h1 class="sr-only">
      {{ sections[0]?.label || "Overview" }}
    </h1>
    <template v-for="section in sections">
      <!-- `v-if` lives on an inner element rather than beside `v-for`, because
           Vue 3 evaluates `v-if` first and `child` would not be in scope. -->
      <template
        v-for="(child, index) in section.children"
        :key="child.id"
      >
        <!-- `label` is optional on `SectionType`, but every section component
             requires a `title`, so an entry without a label is skipped
             rather than mounted with an empty heading. -->
        <section
          v-if="child.label && child.id in sectionComponents"
          :id="child.id"
          v-section="(child.id, index)"
          :name="child.label"
          :class="child.class"
        >
          <component
            :is="sectionComponents[child.id as keyof typeof sectionComponents]"
            :title="child.label"
          />
        </section>
      </template>
    </template>
  </div>
</template>

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
