<script setup lang="ts">
defineProps<{
  color: ColorType
}>()
</script>

<template>
  <small
    :style="{ color: color.primary }"
    class="dev-badge"
    data-tag-name="Dev"
  />
</template>

<style scoped>
.dev-badge {
  font-size: 18px;
  font-weight: 600;
  padding-left: 10px;
  /* Line-box centering leaves the glyphs ~0.25px low because of the font's
     asymmetric leading. Trimming to cap height centers them instead. */
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
  -webkit-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  -o-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  -moz-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
}
/* Fallback for engines without `text-box-trim`: undo the leading offset */
@supports not (text-box-trim: trim-both) {
  .dev-badge {
    transform: translateY(-0.26px);
  }
}
.dev-badge:before {
  content: attr(data-tag-name);
}
</style>
