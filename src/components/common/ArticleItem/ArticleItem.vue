<template>
  <li class="row-full">
    <div class="padding-right-small">
      <component v-if="article.icon" :is="article.icon" class="icon-article" />
    </div>

    <div>
      <h2>{{ $t(article.title) }}</h2>
      <p class="article-date">{{ article.date }}</p>
      <p>
        {{ $t(article.description) }}
      </p>
      <LinkCollection :links="article.links" />
    </div>
  </li>
</template>

<script lang="ts" src="./ArticleItem.ts"></script>
<style scoped src="./ArticleItem.css"></style>
