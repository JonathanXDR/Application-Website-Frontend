<template>
  <li
    class="row-full nr-scroll-animation nr-scroll-animation--off"
    v-animation="{
      add: ['nr-scroll-animation--on'],
      remove: ['nr-scroll-animation--off']
    }"
  >
    <div v-if="article.icon" class="padding-right padding-block-small">
      <Icon :name="article.icon.name" :colors="article.icon.colors" class="icon-article" />
    </div>

    <div>
      <h2>{{ article.title }}</h2>
      <p class="article-date">{{ article.date }}</p>
      <p>
        {{ article.description }}
      </p>
      <LinkCollection :links="article.links" />
    </div>
  </li>
</template>

<script lang="ts" src="./ArticleItem.ts"></script>
<style scoped src="./ArticleItem.css"></style>
