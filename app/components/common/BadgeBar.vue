<template>
  <div class="badges filter-suggested-badges">
    <div class="scroll-wrapper">
      <div class="suggested-badges-badges">
        <BadgeItem
          v-for="(badge, index) in badges"
          :key="index"
          class="badge"
          :loading="loading"
          :title="badge"
          component-size="small"
          :url="`https://github.com/topics/${badge}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    badges: string[]
    loading?: boolean
  }>(),
  {
    badges: () => [],
    loading: false,
  },
)
</script>

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
