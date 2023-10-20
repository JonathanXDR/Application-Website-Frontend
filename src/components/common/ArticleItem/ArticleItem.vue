<template>
  <li class="row-full">
    <div v-if="article.icon" class="padding-right padding-block-small">
      <Icon :name="article.icon.name" :colors="article.icon.colors" class="icon-article" />
    </div>

    <div class="padding-left-small">
      <h2>{{ article.title || article.name }}</h2>
      <p class="article-date">
        {{
          article.date ||
          new Date(article.updated_at).toLocaleDateString('de-CH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }}
      </p>
      <p>
        {{ article.description }}
      </p>
      <LinkCollection :links="article.links" />
    </div>
  </li>
</template>

<script lang="ts" src="./ArticleItem.ts"></script>
<style scoped src="./ArticleItem.css"></style>
