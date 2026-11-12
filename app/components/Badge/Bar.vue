<script setup lang="ts">
defineProps<{
  badges?: BadgeItemType[]
}>()

// Built here because vue-tsc 3.3.12+ rewrites a `//` inside inline component
// props as a comment, which drops the `v-for` scope from the typecheck.
// TODO: inline the URL again once a vue-tsc release fixes this.
//       https://github.com/vuejs/language-tools/issues/6240
const getTopicUrl = (topic: string) => `https://github.com/topics/${topic}`
</script>

<template>
  <div class="badges filter-suggested-badges">
    <div class="scroll-wrapper">
      <div class="suggested-badges-badges">
        <BadgeItem
          v-for="(badge, index) in badges"
          v-bind="badge"
          :key="index"
          class="badge"
          component-size="small"
          :url="getTopicUrl(badge.title)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.badges {
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

.badges .scroll-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-color: var(--color-figure-gray-tertiary) transparent;
  scrollbar-width: thin;
}

.badges .scroll-wrapper::-webkit-scrollbar {
  height: 0;
}

.badges .suggested-badges-badges {
  margin: 0;
  padding: 0;
  display: flex;
}

.suggested-badges-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.filter-suggested-badges {
  width: 100%;
  display: flex;
  z-index: 1;
  overflow: hidden;
}

.filter .filter-suggested-badges {
  height: 45px;
  border-top: 1px solid var(--color-fill-gray-tertiary);
}

.filter .filter-suggested-badges .suggested-badges-badges {
  /* padding: 12px 8px; */
  padding: 6px 4px;
}

.filter-suggested-badges .suggested-badges-badges {
  padding-block: 8px;
  border: 1px solid transparent;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
}

@media screen and (min-width: 768px) {
  .suggested-badges-badges {
    padding-block: 12px;
    gap: 10px;
  }
}
</style>
