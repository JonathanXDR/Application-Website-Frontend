<template>
  <a class="links">
    <a v-for="(link, index) in links" :key="index" :href="link.url" class="link" target="_blank">
      {{ link.title
      }}<Icon
        v-if="link.icon"
        :name="link.icon.name"
        :size="link.icon.size"
        :colors="link.icon.colors"
        class="svg-icon inline-chevron-right-icon icon-inline link-icon"
      />
    </a>
  </a>
  <!-- <div class="links">
    <p v-for="(link, index) in links" :key="index">
      <a :href="link.url" class="link link-icon" target="_blank">
        {{ link.title }}
        <Icon
          v-if="link.icon"
          :name="link.icon.name"
          size="medium"
          class="svg-icon inline-chevron-right-icon icon-inline link-icon"
        />
      </a>
    </p>
  </div> -->
</template>

<script lang="ts" src="./LinkCollection.ts"></script>
<style scoped src="./LinkCollection.css"></style>
