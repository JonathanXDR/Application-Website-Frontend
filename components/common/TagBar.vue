<template>
  <div class="tags filter-suggested-tags">
    <div class="scroll-wrapper">
      <ul id="suggested-tags-tags">
        <li v-for="(tag, index) in tags" :key="index" class="tag">
          <a :href="`https://github.com/topics/${tag}`">{{ tag }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    tags: string[];
  }>(),
  {
    tags: () => [],
  },
);
</script>

<style scoped>
.tag {
  display: inline-block;
  padding-right: 10px;
}

.tag a {
  color: var(--color-figure-gray);
  background-color: var(--color-fill-tertiary);
  font-size: 14px;
  line-height: 1.2857742857;
  font-weight: 400;
  /* letter-spacing: -0.016em; */
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  border-radius: 14px;
  padding: 4px 10px;
  white-space: nowrap;
  border: 1px solid transparent;
}

@media (hover: hover) {
  .tag a:hover {
    transition:
      background-color 0.2s,
      color 0.2s;
    background-color: var(--color-fill-blue);
    color: #fff;
  }
}

.tags {
  position: relative;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  transition:
    padding-right 0.8s,
    padding-bottom 0.8s,
    max-height 1s,
    opacity 1s;
  padding: 0;
}

.tags .scroll-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-color: var(--color-figure-gray-tertiary) transparent;
  scrollbar-width: thin;
}

.tags .scroll-wrapper::-webkit-scrollbar {
  height: 0;
}

.tags ul {
  margin: 0;
  padding: 0;
  display: flex;
}

.filter-suggested-tags {
  width: 100%;
  display: flex;
  z-index: 1;
  overflow: hidden;
}

.filter .filter-suggested-tags {
  height: 45px;
  border-top: 1px solid var(--color-fill-gray-tertiary);
}

.filter .filter-suggested-tags ul {
  /* padding: 12px 8px; */
  padding: 6px 4px;
}

.filter-suggested-tags ul {
  padding-block: 12px;
  border: 1px solid transparent;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
}
</style>
