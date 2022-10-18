<template>
  <li class="row-full">
    <div class="padding-right-small">
      <component v-if="article.icon" :is="article.icon" class="icon-article" />
    </div>

    <div>
      <h2>{{ article.title }}</h2>
      <p class="article-date">{{ article.date }}</p>
      <p>
        {{ article.description }}
      </p>
      <div class="links">
        <p v-for="link in article.links" :key="link">
          <a class="link" :href="link.url" target="_blank">
            {{ link.title }}
            <component v-if="link.icon" :is="link.icon" class="icon-after" />
          </a>
        </p>
      </div>
    </div>
  </li>
</template>

<script lang="ts" src="./ArticleItem.ts"></script>
<style src="./ArticleItem.css"></style>
