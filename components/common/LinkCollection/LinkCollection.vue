<template>
  <a class="links">
    <component
      :is="
        link.url.startsWith('#') || link.url.startsWith('/')
          ? 'router-link'
          : 'a'
      "
      v-for="(link, index) in links"
      :key="index"
      :to="(link.url.startsWith('#') || link.url.startsWith('/')) && link.url"
      :href="
        !(link.url.startsWith('#') || link.url.startsWith('/')) && link.url
      "
      :target="
        link.url.startsWith('#') || link.url.startsWith('/')
          ? '_self'
          : '_blank'
      "
      class="link"
    >
      {{ link.title
      }}<Icon
        v-if="link.icon"
        :name="link.icon.name"
        :size="link.icon.size"
        :colors="link.icon.colors"
        class="icon icon-small"
      />
    </component>
  </a>
</template>

<script lang="ts" src="./LinkCollection.script.ts"></script>
<style scoped src="./LinkCollection.module.css"></style>
