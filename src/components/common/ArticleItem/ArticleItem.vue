<template>
  <li class="row-full">
    <div class="padding-right-small">
      <Icon v-if="article.icon" :name="article.icon" size="medium" class="icon-article" />
    </div>

    <div class="padding-left-small">
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
