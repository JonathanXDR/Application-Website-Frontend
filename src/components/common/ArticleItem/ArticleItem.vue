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

    <div class="padding-left-small">
      <h2>{{ article.title || article.name }}</h2>
      <p v-if="article.date" class="article-date">
        {{
          formattedDateRange ||
          new Date(article.updated_at).toLocaleDateString(`${locale.value}-CH`, {
            year: 'numeric',
            month: 'long'
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
