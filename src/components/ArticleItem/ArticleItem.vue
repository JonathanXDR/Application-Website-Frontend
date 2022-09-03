<template>
  <li class="row-full">
    <div class="padding-right-small">
      <component v-if="article.icon" :is="article.icon" />
    </div>

    <div>
      <h2>{{ article.title }}</h2>
      <p class="article-date">{{ article.date }}</p>
      <p>
        {{ article.description }}
      </p>
      <p v-for="link in article.links" :key="link">
        <a class="link" :href="link.url" target="_blank"
          >{{ link.title }}<ChevronRightIcon />
        </a>
      </p>
      <!-- <p class="download-ical">
        <a :href="article.links.url" class="link"
          >article.links.title<ChevronRightIcon />
        </a>
      </p> -->
    </div>
  </li>
</template>

<script lang="ts" src="./ArticleItem.ts"></script>
<style src="./ArticleItem.css"></style>
